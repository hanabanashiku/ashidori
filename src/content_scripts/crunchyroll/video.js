import browser from "webextension-polyfill";
import $ from "jquery";
import Settings from "../../options/Settings";
import { SERVICES } from "../../enums";
import CrunchyrollService from "../../services/Crunchyroll";
import { getApiInstance } from "../../providers/builder";
import MESSAGE_TYPES from "../../messageTypes";

let episodeData;
let loadTime;
let userData;

Settings.getEnabledServices().then((enabledServices) => {
  if (!enabledServices.includes(SERVICES.CRUNCHYROLL)) {
    return;
  }

  init();
});

function init() {
  loadTime = new Date();

  getEpisodeData().then((data) => {
    episodeData = data;
  });

  getApiInstance().then((instance) => {
    instance.getUserData().then((data) => {
      userData = data;
    });
  });

  browser.runtime.onMessage.addListener((message) => {
    if (message.type === MESSAGE_TYPES.HISTORY_STATE_UPDATED) {
      onUnload();
      return true;
    }
    return false;
  });
}

function onUnload() {
  if (!episodeData || !userData) {
    console.error("Missing episode or user data");
    return;
  }

  // Tell the service worker to update the episode.
  browser.runtime.sendMessage({
    type: MESSAGE_TYPES.UPDATE_EPISODE,
    payload: {
      episodeData,
      loadTime,
      userData,
    },
  });
}

async function getEpisodeData() {
  const episodeId = /watch\/(.+?)\/.+/g.exec(window.location.href)[1];
  var client = new CrunchyrollService();
  await client.authenticate();
  return client.getEpisodeData(episodeId);
}
