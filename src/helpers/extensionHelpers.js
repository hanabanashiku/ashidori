import browser from "webextension-polyfill";
import { v4 as uuid } from "uuid";
import { BROWSER } from "../enums";

export function getRootPath() {
  return browser.runtime.getURL("");
}

/* istanbul ignore next */
export function getBrowserType() {
  const baseUrl = getRootPath();

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
 * Send a basic browser notification.
 * If a list of buttons is sent, it will not be shown on Firefox.
 * @param {string} title The title of the notification.
 * @param {string} message The message to send for the notification.
 * @param {[{title: string}]|null} buttons The list of buttons to display.
 * @param {notificationCallback|null} callback
 */
export async function sendNotification(
  title,
  message,
  buttons = null,
  callback = null
) {
  const notificationId = uuid();

  const body = buildNotificationBody(title, message);

  if ((!buttons && !callback) || getBrowserType() === BROWSER.FIREFOX) {
    return browser.notifications.create(notificationId, body);
  }

  function listener(id, buttonIndex) {
    if (id !== notificationId) {
      return;
    }
    browser.notifications.onButtonClicked.removeListener(listener);
    callback(buttonIndex);
  }
  browser.notifications.onButtonClicked.addListener(listener);

  return browser.notifications.create(notificationId, {
    ...body,
    buttons,
  });
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
  await browser.notifications.create(id, buildNotificationBody(title, message));

  function listener(notificationId) {
    if (notificationId !== id) {
      return;
    }
    browser.notifications.onClicked.removeListener(listener);
    callback();
  }
  browser.notifications.onClicked.addListener(listener);
}

export async function openLink(url) {
  return browser.tabs.create({
    url,
    active: true,
  });
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
  const result = await openLink(browser.runtime.getURL(file));
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

function buildNotificationBody(title, message) {
  return {
    type: "basic",
    iconUrl: browser.runtime.getURL("/static/icons/icon16.png"),
    title,
    message,
  };
}
