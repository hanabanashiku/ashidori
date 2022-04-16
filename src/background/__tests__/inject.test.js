import MESSAGE_TYPES from "../../messageTypes";

describe("Background script injector", () => {
  let onHistoryStateUpdated;

  beforeEach(() => {
    chrome.tabs.__proto__.executeScript = jest.fn();
    browser.webNavigation.onHistoryStateUpdated.addListener.mockImplementation(
      (fn) => {
        onHistoryStateUpdated = fn;
      }
    );
    require("../inject.js");
    expect(onHistoryStateUpdated).not.toBeNull();
    jest.resetAllMocks();
  });

  it("does not inject by default", () => {
    onHistoryStateUpdated({
      tabId: 1,
      frameId: 2,
      url: "https://google.com/test",
    });
    expect(browser.scripting.executeScript).not.toHaveBeenCalled();
  });

  it("sends message on pushState", () => {
    onHistoryStateUpdated({
      tabId: 1,
      frameId: 2,
      url: "https://google.com/test",
    });
    expect(browser.tabs.sendMessage).toHaveBeenCalledTimes(1);
    expect(browser.tabs.sendMessage).toHaveBeenLastCalledWith(
      1,
      {
        type: MESSAGE_TYPES.HISTORY_STATE_UPDATED,
        payload: {
          tabId: 1,
          frameId: 2,
          url: "https://google.com/test",
        },
      },
      { frameId: 2 }
    );
  });

  it("executes script for Crunchyroll video", () => {
    onHistoryStateUpdated({
      tabId: 1,
      frameId: 2,
      url: "https://beta.crunchyroll.com/watch/GPWUK5WJ8/backlighting-is-the-best",
    });
    expect(browser.scripting.executeScript).toHaveBeenCalledTimes(1);
    expect(browser.scripting.executeScript).toHaveBeenLastCalledWith({
      files: ["/content_scripts/crunchyroll/video.js"],
      target: { frameId: 2, tabId: 1 },
    });
  });
});
