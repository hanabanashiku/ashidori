import { waitFor } from "@testing-library/react";
import MESSAGE_TYPES from "../../messageTypes";

describe("Popup background script", () => {
  let onStartupFunction;

  beforeEach(() => {
    global.fetch = jest.fn();
    global.fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          action: {
            default_popup: "popup.html",
          },
        }),
    });
    chrome.runtime = {
      ...chrome.runtime,
      onStartup: {
        addListener: jest
          .fn()
          .mockImplementation((fn) => (onStartupFunction = fn)),
      },
    };

    chrome.windows = {
      create: jest.fn(),
    };

    require("../showPopup.js");
    expect(onStartupFunction).toBeDefined();
  });

  it("creates a new popup when recieving the show anime detail popup message", async () => {
    browser.runtime.sendMessage({
      type: MESSAGE_TYPES.SHOW_ANIME_DETAIL_POPUP,
      payload: {
        libraryEntryId: "12345",
      },
    });

    await waitFor(() =>
      expect(browser.windows.create).toHaveBeenCalledTimes(1)
    );
  });

  it("does not create a new popup for other messages", async () => {
    browser.runtime.sendMessage({
      type: "test",
    });

    expect(browser.windows.create).not.toHaveBeenCalled();
  });

  it("resets the current watching message on the popup window", async () => {
    await onStartupFunction();

    expect(browser.storage.local.set).toHaveBeenCalledTimes(1);
    expect(browser.storage.local.set).toHaveBeenLastCalledWith({
      current_anime: null,
    });
  });
});
