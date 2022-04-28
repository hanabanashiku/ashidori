import browser from "webextension-polyfill";
import { v4 as uuid } from "uuid";

/**
 * Send a browser notification.
 * @param {string} title The title of the notification.
 * @param {string} message The message to send for the notification.
 * @param {[{title: string}]|null} buttons The list of options to choose from.
 * @param {notificationCallback} callback
 */
export async function sendNotification(title, message, buttons = [], callback) {
  const notificationId = uuid();
  await browser.notifications.create(notificationId, {
    type: "basic",
    iconUrl: browser.runtime.getURL("/static/icons/icon16.png"),
    title,
    message,
    buttons,
  });

  function listener(id, buttonIndex) {
    if (id !== notificationId) {
      return;
    }
    browser.notifications.onButtonClicked.removeListener(listener);
    callback(buttonIndex);
  }
  browser.notifications.onButtonClicked.addListener(listener);
}

/**
 * A callback that is ran when the user selects an button from the notification.
 * @callback notificationCallback
 * @param {number} buttonIndex The 0-based index of the button that was pressed.
 */

/**
 * Execute a script in a given tab.
 * @param {number} tabId The id of the tab to inject.
 * @param {[string]} files The list of scripts to inject.
 * @returns {Promise<*>}
 */
export async function executeScript(tabId, files) {
  if (browser.scripting?.executeScript) {
    browser.scripting.executeScript({
      target: {
        tabId,
      },
      files,
    });
    return Promise.resolve();
  }

  return Promise.all(
    files.map((file) =>
      browser.tabs.executeScript(tabId, {
        file,
      })
    )
  );
}
