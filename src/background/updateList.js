import browser from "webextension-polyfill";
import util from "util";
import Settings from "../options/Settings";
import MESSAGE_TYPES from "../messageTypes";
import { getApiInstance } from "../providers/builder";
import { sendNotification } from "../helpers/extensionHelpers";
import {
  showCurrentWatchingAlertOnPopup,
  resetCurrentWatchingAlert,
} from "../helpers/storageHelpers";
import UserData from "../models/UserData";
import AnimeEpisode from "../models/AnimeEpisode";
import LibraryEntry from "../models/LibraryEntry";
import lang from "../lang";
import { LIST_STATUS, PROVIDER_NAMES } from "../enums";

/**
 * A list of episode tabs containing corresponding registered onRemove listeners.
 */
const currentTabs = {};

browser.runtime.onMessage.addListener(onEpisodeStarted);
browser.runtime.onMessage.addListener(onUpdateRequest);

/**
 * Event handler when the user first opens an anime episode.
 * @param {object} message The message payload.
 * @param {browser.runtime.MessageSender} sender The message sender.
 */
function onEpisodeStarted(message, sender) {
  if (message.type !== MESSAGE_TYPES.ANIME_EPISODE_STARTED) {
    return;
  }

  const episodeTab = sender.tab.id;
  const loadTime = message.payload.loadTime;
  const userData = new UserData(message.payload.userData);
  const episodeData = new AnimeEpisode(message.payload.episodeData);
  const listEntry = new LibraryEntry(message.payload.listEntry);

  showCurrentWatchingAlertOnPopup(listEntry, episodeData);

  // register event to update the list when the close the tab
  function onTabClose(tabId) {
    if (tabId !== episodeTab) {
      return;
    }

    removeTabOnRemovedHook(tabId);
    startUpdate(loadTime, userData, episodeData, listEntry);
  }
  browser.tabs.onRemoved.addListener(onTabClose);

  currentTabs[sender.tab.id] = {
    episodeData,
    listener: onTabClose,
  };
}

/**
 * Event handler when the the content script sends a request to update (e.g. from a SPA page)
 * @param {object} message The message payload.
 * @param {browser.runtime.MessageSender} sender The message sender.
 */
function onUpdateRequest(message, sender) {
  if (message.type !== MESSAGE_TYPES.UPDATE_EPISODE) {
    return false;
  }

  const loadTime = message.payload.loadTime;
  const userData = new UserData(message.payload.userData);
  const episodeData = new AnimeEpisode(message.payload.episodeData);
  const listEntry = new LibraryEntry(message.payload.listEntry);

  removeTabOnRemovedHook(sender.tab.id);
  startUpdate(loadTime, userData, episodeData, listEntry);
}

/**
 * Begin updating the anime episode.
 * @param {Date} loadTime The time at which the user began watching.
 * @param {UserData} userData Data about the user.
 * @param {EpisodeData} episodeData Episode data extracted from the video page.
 * @param {LibraryEntry} listEntry The current library entry record to update.
 * @returns {Promise<void>}
 */
async function startUpdate(loadTime, userData, episodeData, listEntry) {
  resetCurrentWatchingAlert();
  const shouldUpdate = await canUpdateAsync(loadTime, listEntry, episodeData);
  if (!shouldUpdate) {
    return;
  }

  if (await Settings.shouldShowUpdatePopup()) {
    await showUpdatePopupAsync(episodeData, listEntry, userData);
  } else {
    await updateAnimeAsync(episodeData, listEntry, userData);
  }
}

/**
 * Check if the current episode can be updated
 * @param {Date} loadTime The time at which the user began watching.
 * @param {LibraryEntry} listEntry The current library entry record to update.
 * @param {EpisodeData} episodeData Episode data extracted from the video page.
 * @returns {Promise<boolean>} True if the list can be updated.
 */
async function canUpdateAsync(loadTime, listEntry, episodeData) {
  if (!(await Settings.listUpdatingEnabled())) {
    return false;
  }

  const delayInMinutes = await Settings.shouldUpdateAfterMinutes();
  const meetsDelay =
    new Date() - new Date(loadTime) > delayInMinutes * 60 * 1000;

  const isValidStatus = [
    LIST_STATUS.NOT_WATCHING,
    LIST_STATUS.CURRENT,
    LIST_STATUS.ON_HOLD,
    LIST_STATUS.PLANNED,
  ].includes(listEntry.status);
  const isValidEpisodeNumber = episodeData.number > listEntry.progress;

  return meetsDelay && isValidStatus && isValidEpisodeNumber;
}

/**
 * Shows a push notification requesting the user to confirm the update.
 * @param {EpisodeData} episodeData Episode data extracted from the video page.
 * @param {LibraryEntry} listEntry The current library entry record to update.
 * @param {UserData} userData Data about the user.
 * @returns {Promise<void>}
 */
async function showUpdatePopupAsync(episodeData, listEntry, userData) {
  function listener(buttonIndex) {
    if (buttonIndex !== 0) {
      // Clicked no
      return;
    }

    updateAnimeAsync(episodeData, listEntry, userData);
  }

  await sendNotification(
    lang.episodeCompletedPopupTitle,
    util.format(
      lang.episodeCompletedPopupBody,
      episodeData.number,
      listEntry.anime.title,
      userData.username
    ),
    [
      {
        title: lang.update,
      },
      {
        title: lang.noThanks,
      },
    ],
    listener
  );
}

/**
 * Shows a push notification to tell the user that the anime was updated successfully.
 * @param {LibraryEntry} listEntry The current library entry record to update.
 * @param {EpisodeData} episodeData Episode data extracted from the video page.
 * @param {UserData} userData Data about the user.
 * @param {boolean} isCompleted Whether the user finished watching the series.
 * @returns {Promise<void>}
 */
async function showUpdatedPopupAsync(
  listEntry,
  episodeData,
  userData,
  isComplete
) {
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

  function listener() {
    browser.tabs.create({
      url: listEntry.anime.externalLink,
      selected: true,
    });
  }

  await sendNotification(
    lang.episodeUpdatedPopupTitle,
    message,
    [
      {
        title: util.format(lang.seeAnime, PROVIDER_NAMES[userData.apiSource]),
      },
    ],
    listener
  );
}

/**
 * Updates the list entry to the current episode.
 * @param {EpisodeData} episodeData Episode data extracted from the video page.
 * @param {LibraryEntry} listEntry The current library entry record to update.
 * @param {UserData} userData Data about the user.
 * @returns {Promise<void>}
 */
async function updateAnimeAsync(episodeData, listEntry, userData) {
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

  if (
    [LIST_STATUS.NOT_WATCHING, LIST_STATUS.PLANNED].includes(listEntry.status)
  ) {
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
  showUpdatedPopupAsync(listEntry, episodeData, userData, isComplete);
}

/**
 * Removes the onRemoved tab listener for a closed anime episode.
 * @param {number} tabId The id of the current tab
 */
function removeTabOnRemovedHook(tabId) {
  const data = currentTabs[tabId];

  if (!data) {
    return;
  }

  browser.tabs.onRemoved.removeListener(data.listener);
  delete currentTabs[tabId];
}
