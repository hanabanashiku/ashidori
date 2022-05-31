import {
  sendNotification,
  sendNotificationWithClick,
  openLink,
  openOptions,
  executeScript,
} from "../extensionHelpers";

describe("Extension helpers", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe("send notification", () => {
    function getNotificationArguments() {
      if (!browser.notifications.create.mock.calls.length) {
        return null;
      }
      return browser.notifications.create.mock.calls[0];
    }

    function getButtonListener() {
      if (
        !browser.notifications.onButtonClicked.addListener.mock.calls.length
      ) {
        return null;
      }
      return browser.notifications.onButtonClicked.addListener.mock.calls[0][0];
    }

    function getClickListener() {
      if (!browser.notifications.onClicked.addListener.mock.calls.length) {
        return null;
      }
      return browser.notifications.onClicked.addListener.mock.calls[0][0];
    }

    it("sends a notification with buttons", async () => {
      const expectedTitle = "Title";
      const expectedMessage = "Message";
      const callback = jest.fn();

      await sendNotification(
        expectedTitle,
        expectedMessage,
        [{ title: "Ok" }],
        callback
      );

      expect(browser.notifications.create).toHaveBeenCalledTimes(1);
      expect(
        browser.notifications.onButtonClicked.addListener
      ).toHaveBeenCalledTimes(1);

      const call = getNotificationArguments();
      expect(call[0]).toBeDefined();

      const { title, message, buttons } = call[1];
      expect(title).toBe(expectedTitle);
      expect(message).toBe(expectedMessage);
      expect(buttons).toHaveLength(1);
      expect(buttons[0].title).toBe("Ok");
    });

    it("button notification calls the callback when the listener is called", async () => {
      const expectedTitle = "Title";
      const expectedMessage = "Message";
      const callback = jest.fn();

      await sendNotification(
        expectedTitle,
        expectedMessage,
        [{ title: "Ok" }],
        callback
      );

      expect(
        browser.notifications.onButtonClicked.addListener
      ).toHaveBeenCalledTimes(1);

      const id = getNotificationArguments()[0];
      const listener = getButtonListener();

      listener(id, 0);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(0);
      expect(
        browser.notifications.onButtonClicked.removeListener
      ).toHaveBeenCalledTimes(1);
    });

    it("button notification does not call the callback for other notifications", async () => {
      const expectedTitle = "Title";
      const expectedMessage = "Message";
      const callback = jest.fn();

      await sendNotification(
        expectedTitle,
        expectedMessage,
        [{ title: "Ok" }],
        callback
      );

      expect(
        browser.notifications.onButtonClicked.addListener
      ).toHaveBeenCalledTimes(1);

      const listener = getButtonListener();

      listener("abc1234", 0);

      expect(callback).not.toHaveBeenCalled();
      expect(
        browser.notifications.onButtonClicked.removeListener
      ).not.toHaveBeenCalled();
    });

    it("sends a notification", async () => {
      const expectedTitle = "Title";
      const expectedMessage = "Message";

      await sendNotification(expectedTitle, expectedMessage);

      expect(browser.notifications.create).toHaveBeenCalledTimes(1);
      expect(
        browser.notifications.onButtonClicked.addListener
      ).not.toHaveBeenCalled();

      const call = getNotificationArguments();
      expect(call[0]).toBeDefined();

      const { title, message } = call[1];
      expect(title).toBe(expectedTitle);
      expect(message).toBe(expectedMessage);
      expect(call[1].buttons).not.toBeDefined();
    });

    it("send notification with click sends a clickable notification", async () => {
      const expectedTitle = "Title";
      const expectedMessage = "Message";
      const callback = jest.fn();

      await sendNotificationWithClick(expectedTitle, expectedMessage, callback);

      const call = getNotificationArguments();
      expect(call[0]).toBeDefined();

      const { title, message } = call[1];
      expect(title).toBe(expectedTitle);
      expect(message).toBe(expectedMessage);
      expect(call[1].buttons).not.toBeDefined();
      expect(
        browser.notifications.onButtonClicked.addListener
      ).not.toHaveBeenCalled();
      expect(browser.notifications.onClicked.addListener).toHaveBeenCalledTimes(
        1
      );
    });

    it("notification with click calls the callback when the notification is clicked", async () => {
      const expectedTitle = "Title";
      const expectedMessage = "Message";
      const callback = jest.fn();

      await sendNotificationWithClick(expectedTitle, expectedMessage, callback);

      expect(browser.notifications.onClicked.addListener).toHaveBeenCalledTimes(
        1
      );

      const id = getNotificationArguments()[0];
      const listener = getClickListener();

      listener(id);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(
        browser.notifications.onClicked.removeListener
      ).toHaveBeenCalledTimes(1);
    });

    it("notification with click does not call the callback for other notifications", async () => {
      const expectedTitle = "Title";
      const expectedMessage = "Message";
      const callback = jest.fn();

      await sendNotificationWithClick(expectedTitle, expectedMessage, callback);

      expect(browser.notifications.onClicked.addListener).toHaveBeenCalledTimes(
        1
      );

      const listener = getClickListener();

      listener("abc1234");

      expect(callback).not.toHaveBeenCalled();
      expect(
        browser.notifications.onClicked.removeListener
      ).not.toHaveBeenCalled();
    });
  });

  it("openLink opens link in new tab", async () => {
    const url = "https://google.com";
    await openLink(url);

    expect(browser.tabs.create).toHaveBeenCalledTimes(1);
    expect(browser.tabs.create).toHaveBeenLastCalledWith({
      url,
      active: true,
    });
  });

  it("openOptions opens the options page in a new tab", async () => {
    browser.runtime.getManifest.mockReturnValue({
      options_ui: {
        page: "options.html",
      },
    });
    browser.runtime.getURL.mockReturnValue("chrome-extension://options.html");
    const popupWindow = {
      close: jest.fn(),
    };

    await openOptions(popupWindow);

    expect(browser.tabs.create).toHaveBeenLastCalledWith({
      url: "chrome-extension://options.html",
      active: true,
    });
    expect(popupWindow.close).toHaveBeenCalledTimes(1);
  });

  describe("executeScript", () => {
    it("executes scripts for manifest v3", async () => {
      const scripts = ["a.js", "b.js"];
      const tabId = 12345;

      await executeScript(tabId, scripts);

      expect(browser.scripting.executeScript).toHaveBeenCalledTimes(1);
      expect(browser.scripting.executeScript).toHaveBeenLastCalledWith({
        target: {
          tabId,
        },
        files: scripts,
      });
    });

    it("executes scripts for manifest v2", async () => {
      const scripting = browser.scripting;
      browser.scripting = null;
      const scripts = ["a.js", "b.js"];
      const tabId = 12345;

      await executeScript(tabId, scripts);
      browser.scripting = scripting;

      expect(browser.tabs.executeScript).toHaveBeenCalledTimes(scripts.length);

      for (var script of scripts) {
        expect(browser.tabs.executeScript).toHaveBeenCalledWith(tabId, {
          file: script,
        });
      }
    });
  });
});
