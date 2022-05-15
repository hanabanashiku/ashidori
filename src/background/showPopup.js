import browser from "webextension-polyfill";
import { resetCurrentWatchingAlert } from "../helpers/storageHelpers";
import MESSAGE_TYPES from "../messageTypes";

async function onMessage(message) {
  if (message.type !== MESSAGE_TYPES.SHOW_ANIME_DETAIL_POPUP) {
    return;
  }

  const id = message.payload.libraryEntryId;
  const url = `${await browser.browserAction.getPopup({})}?detail=${id}`;

  await browser.windows.create({
    type: "popup",
    url,
    focused: true,
    height: 500,
    width: 500,
  });
}

browser.runtime.onMessage.addListener(onMessage);
browser.runtime.onStartup.addListener(() => resetCurrentWatchingAlert());
