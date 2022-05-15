import browser from "webextension-polyfill";
import { v4 as uuid } from "uuid";
import { BROWSER } from "../enums";

export function getBrowserType() {
  const baseUrl = browser.runtime.getURL("");

  if (process.env.NODE_ENV === "test") {
    return BROWSER.CHROMIUM;
  }

  if (baseUrl.startsWith("moz-extension")) {
    return BROWSER.FIREFOX;
  }

  if (baseUrl.startsWith("chrome-extension")) {
    return BROWSER.CHROMIUM;
  }

  return null;
}

/**
 * Send a browser notification. This method uses buttons, which is incompatible with Firefox.
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
 * Send a browser notification that activates an action on click. Compatible with Firefox.
 * @param {string} title The title of the notification.
 * @param {string} message The message to send for the notification.
 * @param {notificationClickedCallback} callback
 */
export async function sendNotificationWithClick(title, message, callback) {
  const id = uuid();
  await browser.notifications.create(id, {
    type: "basic",
    iconUrl: browser.runtime.getURL("/static/icons/icon16.png"),
    title,
    message,
  });

  function listener(notificationId) {
    if (notificationId !== id) {
      return;
    }
    browser.notifications.onClicked.removeListener(listener);
    callback();
  }
  browser.notifications.onClicked.addListener(listener);
}

/**
 * A callback that is ran when the user clicks on a notification.
 * @callback notificationClickedCallback
 */

/**
 * Opens the options pane in a new tab
 * @param {Window|null} The window to close, if any.
 * @returns {Promise<browser.tabs.Tab>} The opened tab.
 */
export async function openOptions(popupWindow = null) {
  const manifest = browser.runtime.getManifest();
  const file = manifest.options_ui.page;
  const result = await browser.tabs.create({
    url: browser.runtime.getURL(file),
    active: true,
  });
  popupWindow?.close();
  return result;
}

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
