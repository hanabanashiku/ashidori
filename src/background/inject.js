import browser from "webextension-polyfill";
import MESSAGE_TYPES from "../messageTypes";

// used to inject scripts on pages reached using history.pushState()
function injectScript(details) {
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

  // Crunchyroll video
  if (/^https?:\/\/beta.crunchyroll.com\/watch\/.*/.test(details.url)) {
    browser.scripting.executeScript({
      target: {
        frameId: details.frameId,
        tabId: details.tabId,
      },
      files: ["/content_scripts/crunchyroll/video.js"],
    });
    return;
  }
}

browser.webNavigation.onHistoryStateUpdated.addListener(injectScript);
