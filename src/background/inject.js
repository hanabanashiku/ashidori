import browser from "webextension-polyfill";
import { SERVICES } from "../enums";
import MESSAGE_TYPES from "../messageTypes";


// used to inject scripts on pages reached using history.pushState()
async function injectScript(details) {
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
        tabId: details.tabId,
      },
      files: await getVideoScript(SERVICES.CRUNCHYROLL),
    });
    return;
  }
}

async function getVideoScript(service) {
  const manifest = await (await fetch("manifest.json")).json();

  switch (service) {
    case SERVICES.CRUNCHYROLL:
      return manifest.content_scripts.find((cs) =>
        cs.matches.includes("*://beta.crunchyroll.com/watch/**")
      ).js;
    default:
      return "";
  }
}

browser.webNavigation.onHistoryStateUpdated.addListener(injectScript);
