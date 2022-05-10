import browser from "webextension-polyfill";
import { resetCurrentWatchingAlert } from "../helpers/storageHelpers";
import MESSAGE_TYPES from "../messageTypes";

async function onMessage(message) {
  if (message.type !== MESSAGE_TYPES.SHOW_ANIME_DETAIL_POPUP) {
    return;
  }

  const id = message.payload.libraryEntryId;

  if (browser.browserAction?.openPopup) {
    await browser.browserAction.openPopup();
    browser.runtime.sendMessage({
      type: MESSAGE_TYPES.SHOW_ANIME_DETAIL,
      payload: message.payload,
    });
    return;
  }

  const url = `${browser.runtime.getURL(await getPopup())}?detail=${id}`;

  await browser.windows.create({
    type: "popup",
    url,
    focused: true,
    height: 500,
    width: 500,
  });
}

async function getPopup() {
  const manifest = await (await fetch("manifest.json")).json();
  if (manifest.action) {
    return manifest.action.default_popup;
  }
  return manifest.browser_action.default_popup;
}

browser.runtime.onMessage.addListener(onMessage);
browser.runtime.onStartup.addListener(() => resetCurrentWatchingAlert());
