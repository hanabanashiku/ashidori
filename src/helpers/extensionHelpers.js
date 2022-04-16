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
