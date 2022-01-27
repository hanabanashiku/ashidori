import browser from "webextension-polyfill";
import Settings from "../options/Settings";
import MESSAGE_TYPES from "../messageTypes";
import { v4 as uuid } from "uuid";

browser.runtime.onInstalled.addListener(() => {
  browser.runtime.onMessage.addListener(onUpdateRequest);
});

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
      showUpdatePopup(message.payload);
    } else {
      await updateAnime(message.payload);
    }
  })();
}

async function canUpdate(loadTime) {
  const delayInMinutes = Settings.shouldUpdateAfterMinutes();
  const meetsDelay = new Date() - loadTime > (await delayInMinutes) * 60 * 1000;

  return meetsDelay;
}

function showUpdatePopup(payload) {
  const { userData, episodeData } = payload;

  const notificationId = uuid();
  browser.notifications.create(
    `ashidori_update_${episodeData.id}_${episodeData.number}`,
    {
      type: "basic",
      title: "Update anime list",
      message: `Looks like you've finished watching episode ${episodeData.number} of ${episodeData.series.title}. Should we update the episode number for ${userData.username}'s anime list?`,
      buttons: [
        {
          title: "Yes",
        },
        {
          title: "No",
        },
      ],
    }
  );

  const listener = (e) => {
    if (e.notificationId !== notificationId) {
      return;
    }
    browser.notifications.onButtonClicked.removeListener(listener);

    if (e.buttonIndex !== 0) {
      // Clicked no
      return;
    }

    updateAnime(payload);
  };

  browser.notifications.onButtonClicked.addListener(listener);
}

async function updateAnime() {} // todo
