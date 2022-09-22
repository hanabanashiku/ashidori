import browser from "webextension-polyfill";
import { executeScript } from "../helpers/extensionHelpers";
import { SERVICES } from "../enums";
import MESSAGE_TYPES from "../messageTypes";

// used to inject scripts on pages reached using history.pushState()
async function injectScript(details) {
  // probably a browser popup
  if (details.tabId < 0) {
    return;
  }

  // send a mesage when history.pushState() is used.
  // This allows content scripts to look for history state events.∂
  browser.tabs.sendMessage(
    details.tabId,
    {
      type: MESSAGE_TYPES.HISTORY_STATE_UPDATED,
      payload: details,
    },
    { frameId: details.frameId }
  );

  // Crunchyroll video
  if (/^https?:\/\/beta\.crunchyroll\.com\/watch\/.*/.test(details.url)) {
    executeScript(details.tabId, await getVideoScript(SERVICES.CRUNCHYROLL));
    return;
  }
  else if(/https?:\/\/www\.netflix.com\/watch\/.*/i.test(details.url)) {
    executeScript(details.tabId, await getVideoScript(SERVICES.NETFLIX));
  }
}

async function getVideoScript(service) {
  const manifest = browser.runtime.getManifest();

  switch (service) {
    case SERVICES.CRUNCHYROLL:
      return manifest.content_scripts.find((cs) =>
        cs.matches.includes("*://beta.crunchyroll.com/watch/**")
      ).js;
    case SERVICES.NETFLIX:
      return manifest.content_scripts.find((cs) => cs.matches.includes("*://*.netflix.com/watch/*")).js;
    default:
      return "";
  }
}

browser.webNavigation.onHistoryStateUpdated.addListener(injectScript);
