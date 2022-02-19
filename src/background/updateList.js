import browser from "webextension-polyfill";
import util from "util";
import Settings from "../options/Settings";
import MESSAGE_TYPES from "../messageTypes";
import { v4 as uuid } from "uuid";
import { getApiInstance } from "../providers/builder";
import UserData from "../models/UserData";
import AnimeEpisode from "../models/AnimeEpisode";
import LibraryEntry from "../models/LibraryEntry";
import lang from "../lang";
import { LIST_STATUS, PROVIDER_NAMES } from "../enums";

Settings.listUpdatingEnabled().then((value) => {
  if (!value) {
    return;
  }
  browser.runtime.onMessage.addListener(onUpdateRequest);
});

function onUpdateRequest(message) {
  if (message.type !== MESSAGE_TYPES.UPDATE_EPISODE) {
    return false;
  }

  message.payload.userData = new UserData(message.payload.userData);
  message.payload.episodeData = new AnimeEpisode(message.payload.episodeData);
  message.payload.listEntry = new LibraryEntry(message.payload.listEntry);

  return (async () => {
    const shouldUpdate = await canUpdateAsync(
      message.payload.loadTime,
      message.payload
    );
    if (!shouldUpdate) {
      return;
    }

    if (await Settings.shouldShowUpdatePopup()) {
      await showUpdatePopupAsync(message.payload);
    } else {
      await updateAnimeAsync(message.payload);
    }
  })();
}

async function canUpdateAsync(loadTime, payload) {
  const { listEntry, episodeData } = payload;
  const delayInMinutes = await Settings.shouldUpdateAfterMinutes();
  const meetsDelay =
    new Date() - new Date(loadTime) > delayInMinutes * 60 * 1000;

  const isValidStatus = [
    LIST_STATUS.NOT_WATCHING,
    LIST_STATUS.CURRENT,
    LIST_STATUS.ON_HOLD,
  ].includes(listEntry.status);
  const isValidEpisodeNumber = episodeData.number < listEntry.progress;

  return meetsDelay && isValidStatus && isValidEpisodeNumber;
}

async function showUpdatePopupAsync(payload) {
  const { episodeData, listEntry, userData } = payload;

  const notificationId = uuid();
  await browser.notifications.create(notificationId, {
    type: "basic",
    iconUrl: browser.runtime.getURL("/static/icons/icon16.png"),
    title: lang.episodeCompletedPopupBody,
    message: util.format(
      lang.episodeCompletedPopupBody,
      episodeData.number,
      listEntry.anime.title,
      userData.username
    ),
    buttons: [
      {
        title: lang.update,
      },
      {
        title: lang.noThanks,
      },
    ],
  });

  function listener(e) {
    if (e.notificationId !== notificationId) {
      return;
    }
    browser.notifications.onButtonClicked.removeListener(listener);

    if (e.buttonIndex !== 0) {
      // Clicked no
      return;
    }

    updateAnimeAsync(payload);
  }

  browser.notifications.onButtonClicked.addListener(listener);
}

async function showUpdatedPopupAsync(payload, isComplete) {
  const { listEntry, episodeData, userData } = payload;
  let message;

  if (isComplete) {
    message = util.format(
      lang.episodeUpdatedCompleteBody,
      listEntry.anime.title
    );
  } else if (
    listEntry.status === LIST_STATUS.NOT_WATCHING ||
    listEntry.status === LIST_STATUS.ON_HOLD
  ) {
    message = util.format(
      lang.episodeUpdatedCurrentBody,
      listEntry.anime.title
    );
  } else {
    message = util.format(
      lang.episodeUpdatedPopupBody,
      listEntry.anime.title,
      episodeData.number
    );
  }

  const notificationId = uuid();
  await browser.notifications.create(notificationId, {
    type: "basic",
    iconUrl: browser.runtime.getURL("/static/icons/icon16.png"),
    title: lang.episodeUpdated,
    message,
    buttons: [
      {
        title: util.format(lang.seeAnime, PROVIDER_NAMES[userData.apiSource]),
      },
    ],
  });

  function listener(e) {
    if (e.notificationId !== notificationId) {
      return;
    }

    browser.tabs.create({
      url: listEntry.anime.externalLink,
      selected: true,
    });

    browser.notifications.onButtonClicked.removeListener(listener);
  }
  browser.notifications.onButtonClicked.addListener(listener);
}

async function updateAnimeAsync(payload) {
  const { episodeData, listEntry } = payload;
  const api = await getApiInstance();
  if (!api) {
    return;
  }

  let episode = episodeData.number;
  let lastEpisode = listEntry.anime.episodeCount;
  let isComplete = episode === lastEpisode;

  let patch = {
    progress: episode,
  };

  if (listEntry.status === LIST_STATUS.NOT_WATCHING) {
    patch = {
      ...patch,
      status: LIST_STATUS.CURRENT,
      startedAt: new Date(),
    };
  } else if (listEntry.status === LIST_STATUS.ON_HOLD) {
    patch = {
      ...patch,
      status: LIST_STATUS.CURRENT,
    };
  }

  if (isComplete) {
    patch = {
      ...patch,
      status: LIST_STATUS.COMPLETED,
      finishedAt: new Date(),
    };
  }

  await api.updateLibraryItem(listEntry.id, patch);
  showUpdatedPopupAsync(payload, isComplete);
}
