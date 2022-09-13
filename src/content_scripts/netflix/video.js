import Settings from "../../options/Settings";
import { SERVICES } from "../../enums";
import MESSAGE_TYPES from "../../messageTypes";

let episodeData;
let loadTime;
let userData;
let listEntry;

Settings.getEnabledServices().then((enabledServices) => {
  if (!enabledServices.includes(SERVICES.NETFLIX)) {
    return;
  }

  init();

  // unload if the user clicks a link in the Crunchyroll SPA
  browser.runtime.onMessage.addListener((message) => {
    if (message.type !== MESSAGE_TYPES.HISTORY_STATE_UPDATED) {
      return false;
    }

    onUnload();
    resetPage();

    if (message.payload.url.includes("https://netflix.com/watch/")) {
      init();
    }
    return true;
  });
});

function init() {
  loadTime = new Date();
}

function onUnload() {}

function resetPage() {}
