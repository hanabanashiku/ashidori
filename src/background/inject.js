import browser from "webextension-polyfill";
import MESSAGE_TYPES from "../messageTypes";

// used to inject scripts on pages reached using history.pushState()
function injectScript(details) {
  // Crunchyroll video
  if (/^https?:\/\/beta.crunchyroll.com\/watch\//.test(details.url)) {
    browser.tabs.executeScript(details.tabId, {
      file: "/content_scripts/crunchyroll/video.js",
    });
    return;
  }

  // send a mesage when history.pushState() is used.
  // This allows content scripts to look for history state events.
  browser.tabs.sendMessage(
    details.tabId,
    {
      type: MESSAGE_TYPES.HISTORY_STATE_UPDATED,
      payload: details,
    },
    { frameId: details.frameId }
  );
}

browser.webNavigation.onHistoryStateUpdated.addListener(injectScript);
