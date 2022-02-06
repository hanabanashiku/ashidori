import browser from "webextension-polyfill";
import Settings from "../options/Settings";
import MESSAGE_TYPES from "../messageTypes";
import { v4 as uuid } from "uuid";
import UserData from "../models/UserData";
import AnimeEpisode from "../models/AnimeEpisode";

browser.runtime.onMessage.addListener(onUpdateRequest);

function onUpdateRequest(message) {
  if (message.type !== MESSAGE_TYPES.UPDATE_EPISODE) {
    return false;
  }

  return (async () => {
    const shouldUpdate = await canUpdate(message.payload.loadTime);
    if (!shouldUpdate) {
      return;
    }

    if (await Settings.shouldShowUpdatePopup()) {
      await showUpdatePopup(message.payload);
    } else {
      await updateAnime(message.payload);
    }
  })();
}

async function canUpdate(loadTime) {
  const delayInMinutes = await Settings.shouldUpdateAfterMinutes();
  const meetsDelay =
    new Date() - new Date(loadTime) > delayInMinutes * 60 * 1000;

  return meetsDelay;
}

async function showUpdatePopup(payload) {
  const userData = new UserData(payload.userData);
  const episodeData = new AnimeEpisode(payload.episodeData);

  const notificationId = uuid();
  await browser.notifications.create(notificationId, {
    type: "basic",
    iconUrl: browser.runtime.getURL("/static/icons/icon16.png"),
    title: "Finished watching an episode",
    message: `Looks like you've finished watching episode ${episodeData.number} of ${episodeData.series.title}. Should we update your progress on ${userData.username}'s anime list?`,
    buttons: [
      {
        title: "Update",
      },
      {
        title: "No thanks",
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

    updateAnime(payload);
  }

  browser.notifications.onButtonClicked.addListener(listener);
}

// todo update success popup
async function updateAnime() {} // todo
