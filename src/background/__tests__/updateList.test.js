import { waitFor } from "@testing-library/react";
import _ from "lodash";
import Settings from "../../options/Settings";
import * as builder from "../../providers/builder";
import * as storageHelpers from "../../helpers/storageHelpers";
import * as extensionHelpers from "../../helpers/extensionHelpers";
import MockApiProvider from "../../__mocks__/MockApiProvider";
import AnimeEpisode from "../../models/AnimeEpisode";
import MESSAGE_TYPES from "../../messageTypes";
import { BROWSER, LIST_STATUS } from "../../enums";
import LibraryEntry from "../../models/LibraryEntry";
import AnimeSeries from "../../models/AnimeSeries";
import {
  updatedPopupTestCases,
  updatePopupTestCases,
} from "./updateListTestCases";

jest.mock("../../options/Settings");

/*/////// TODO ////////
  - error popup on update fail chrome/firefox
*/
describe("Update list background script", () => {
  const now = new Date();
  const oneMinute = 60000;
  let api = new MockApiProvider();

  let showCurrentWatchingAlertOnPopupSpy = jest.spyOn(
    storageHelpers,
    "showCurrentWatchingAlertOnPopup"
  );
  let sendNotificationSpy = jest
    .spyOn(extensionHelpers, "sendNotification")
    .mockResolvedValue({});
  let sendNotificationWithClickSpy = jest
    .spyOn(extensionHelpers, "sendNotificationWithClick")
    .mockResolvedValue({});
  let getBrowserTypeSpy = jest
    .spyOn(extensionHelpers, "getBrowserType")
    .mockReturnValue(BROWSER.CHROMIUM);

  let onEpisodeStarted;
  let onUpdateRequest;
  let onTabClose;

  const baseMessage = {
    type: MESSAGE_TYPES.UPDATE_EPISODE,
    payload: {
      loadTime: now + 10,
      userData: {
        _id: "12345",
        _name: "john.doe",
        _url: "https://kitsu.io/john.doe",
        _provider: 0,
      },
      episodeData: {
        _id: "GX9UQK711",
        _title: "The High, Deep Blue Sky",
        _number: 113,
      },
      listEntry: {
        _id: "81684",
        _status: LIST_STATUS.CURRENT,
        _progress: 112,
        _anime: {
          _id: "45621",
          _title: "My Hero Academia",
        },
      },
    },
  };

  const tabId = 123;
  const sender = {
    tab: {
      id: tabId,
    },
  };

  beforeEach(async () => {
    jest.useFakeTimers().setSystemTime(now.getTime());

    jest.spyOn(builder, "getApiInstance").mockResolvedValue(api);
    api.isAuthenticated.mockResolvedValue(true);
    api.updateLibraryItem.mockResolvedValue(true);
    Settings.listUpdatingEnabled = jest.fn().mockResolvedValue(true);

    browser.runtime.onMessage.addListener.mockImplementation(function (fn) {
      switch (fn.name) {
        case "onEpisodeStarted":
          onEpisodeStarted = fn;
          return;

        case "onUpdateRequest":
          onUpdateRequest = fn;
          return;
      }
    });
    browser.tabs.onRemoved.addListener.mockImplementation(function (fn) {
      onTabClose = fn;
    });
  });

  browser.tabs = {
    ...browser.tabs,
    onRemoved: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
  };

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  async function requireScript() {
    require("../updateList");
    await waitFor(() => expect(onUpdateRequest).toBeDefined());
    await waitFor(() => expect(onEpisodeStarted).toBeDefined());
  }

  it("adds message listeners", async () => {
    await requireScript();
    expect(browser.runtime.onMessage.addListener).toHaveBeenCalledTimes(2);
  });

  it("shows current watching alert on start", async () => {
    await requireScript();
    onEpisodeStarted(
      {
        type: MESSAGE_TYPES.ANIME_EPISODE_STARTED,
        payload: {
          episodeData: new AnimeEpisode({
            _number: 5,
            _series: {
              _title: "Test series",
            },
          }),
          listEntry: new LibraryEntry({
            _progress: 4,
            _anime: new AnimeSeries({
              _title: "Test series",
            }),
          }),
        },
      },
      sender
    );

    expect(showCurrentWatchingAlertOnPopupSpy).toHaveBeenCalledTimes(1);
  });

  it("does not update if the load time has not been met", async () => {
    await Settings.setShouldUpdateAfterMinutes(10);
    await requireScript();
    await onUpdateRequest(baseMessage, sender);
    expect(api.updateLibraryItem).not.toHaveBeenCalled();
  });

  test.each([
    ["completed", LIST_STATUS.COMPLETED],
    ["dropped", LIST_STATUS.DROPPED],
  ])(
    "does not update if the library status is %s",
    async (_name, listStatus) => {
      Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(0);
      Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValue(false);

      await requireScript();
      await onUpdateRequest(
        _.merge({}, baseMessage, {
          payload: {
            listEntry: {
              _status: listStatus,
            },
          },
        }),
        sender
      );

      expect(api.updateLibraryItem).not.toHaveBeenCalled();
      expect(api.createLibraryItem).not.toHaveBeenCalled();
      expect(browser.notifications.create).not.toHaveBeenCalled();
    }
  );

  it("does update if the library status is current", async () => {
    Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(0);
    Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValue(false);

    await requireScript();
    await onUpdateRequest(
      _.merge({}, baseMessage, {
        payload: {
          episodeData: {
            _number: 114,
          },
          listEntry: {
            _progress: 113,
            _status: LIST_STATUS.CURRENT,
          },
        },
      }),
      sender
    );

    await waitFor(() => expect(api.updateLibraryItem).toHaveBeenCalledTimes(1));
    expect(api.updateLibraryItem).toHaveBeenLastCalledWith(
      baseMessage.payload.listEntry._id,
      {
        progress: 114,
      }
    );
  });

  it("does update if the library status is planned", async () => {
    Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(0);
    Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValue(false);

    await requireScript();
    await onUpdateRequest(
      _.merge({}, baseMessage, {
        payload: {
          episodeData: {
            _number: 1,
          },
          listEntry: {
            _progress: 0,
            _status: LIST_STATUS.PLANNED,
          },
        },
      }),
      sender
    );

    await waitFor(() => expect(api.updateLibraryItem).toHaveBeenCalledTimes(1));
    expect(api.updateLibraryItem).toHaveBeenLastCalledWith(
      baseMessage.payload.listEntry._id,
      expect.objectContaining({
        progress: 1,
        status: LIST_STATUS.CURRENT,
        startedAt: expect.any(Date),
      })
    );
    expect(api.updateLibraryItem.mock.calls[0][1].startedAt - now).toBeLessThan(
      1000
    );
  });

  it("does create library entry if the library status is not watching", async () => {
    Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(0);
    Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValue(false);

    await requireScript();
    await onUpdateRequest(
      _.merge({}, baseMessage, {
        payload: {
          episodeData: {
            _number: 1,
          },
          listEntry: {
            _id: undefined,
            _progress: 0,
            _status: LIST_STATUS.NOT_WATCHING,
          },
        },
      }),
      sender
    );

    await waitFor(() => expect(api.createLibraryItem).toHaveBeenCalledTimes(1));
    expect(api.createLibraryItem).toHaveBeenLastCalledWith(
      baseMessage.payload.listEntry._anime._id,
      expect.objectContaining({
        progress: 1,
        status: LIST_STATUS.CURRENT,
        startedAt: expect.any(Date),
      })
    );
    expect(api.createLibraryItem.mock.calls[0][1].startedAt - now).toBeLessThan(
      1000
    );
  });

  it("does change to current if the library status is on hold", async () => {
    Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(0);
    Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValue(false);

    await requireScript();
    await onUpdateRequest(
      _.merge({}, baseMessage, {
        payload: {
          episodeData: {
            _number: 114,
          },
          listEntry: {
            _progress: 113,
            _status: LIST_STATUS.ON_HOLD,
          },
        },
      }),
      sender
    );

    await waitFor(() => expect(api.updateLibraryItem).toHaveBeenCalledTimes(1));
    expect(api.updateLibraryItem).toHaveBeenLastCalledWith(
      baseMessage.payload.listEntry._id,
      {
        progress: 114,
        status: LIST_STATUS.CURRENT,
      }
    );
  });

  it("does complete the series when the status is current and the user is on the last episode", async () => {
    Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(0);
    Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValue(false);

    await requireScript();
    await onUpdateRequest(
      _.merge({}, baseMessage, {
        payload: {
          episodeData: {
            _number: 115,
          },
          listEntry: {
            _progress: 114,
            _status: LIST_STATUS.CURRENT,
            _anime: {
              _episodeCount: 115,
            },
          },
        },
      }),
      sender
    );

    await waitFor(() => expect(api.updateLibraryItem).toHaveBeenCalledTimes(1));
    expect(api.updateLibraryItem).toHaveBeenLastCalledWith(
      baseMessage.payload.listEntry._id,
      expect.objectContaining({
        progress: 115,
        status: LIST_STATUS.COMPLETED,
        finishedAt: expect.any(Date),
      })
    );
    expect(
      api.updateLibraryItem.mock.calls[0][1].finishedAt - now
    ).toBeLessThan(1000);
  });

  it("does increment the rewatch count on series finish if the user has watched before", async () => {
    Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(0);
    Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValue(false);

    await requireScript();
    await onUpdateRequest(
      _.merge({}, baseMessage, {
        payload: {
          episodeData: {
            _number: 115,
          },
          listEntry: {
            _progress: 114,
            _status: LIST_STATUS.CURRENT,
            _rewatchCount: 0,
            _completedDate: new Date("2020-05-25"),
            _anime: {
              _episodeCount: 115,
            },
          },
        },
      }),
      sender
    );

    await waitFor(() => expect(api.updateLibraryItem).toHaveBeenCalledTimes(1));
    expect(api.updateLibraryItem).toHaveBeenLastCalledWith(
      baseMessage.payload.listEntry._id,
      {
        progress: 115,
        status: LIST_STATUS.COMPLETED,
        rewatchCount: 1,
      }
    );
  });

  it("does increment the rewatch count on series finish if the user has rewatched before", async () => {
    Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(0);
    Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValue(false);

    await requireScript();
    await onUpdateRequest(
      _.merge({}, baseMessage, {
        payload: {
          episodeData: {
            _number: 115,
          },
          listEntry: {
            _progress: 114,
            _status: LIST_STATUS.CURRENT,
            _rewatchCount: 1,
            _anime: {
              _episodeCount: 115,
            },
          },
        },
      }),
      sender
    );

    await waitFor(() => expect(api.updateLibraryItem).toHaveBeenCalledTimes(1));
    expect(api.updateLibraryItem).toHaveBeenLastCalledWith(
      baseMessage.payload.listEntry._id,
      {
        progress: 115,
        status: LIST_STATUS.COMPLETED,
        rewatchCount: 2,
      }
    );
  });

  it("does not update if the episode number is less than the current progress", async () => {
    await requireScript();
    await onUpdateRequest(
      _.merge({}, baseMessage, {
        payload: {
          episodeData: {
            _number: 113,
          },
          listEntry: {
            _progress: 114,
          },
        },
      }),
      sender
    );

    expect(api.updateLibraryItem).not.toHaveBeenCalled();
  });

  it("does not update if the episode number is equal to the current progress", async () => {
    Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(0);
    Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValue(false);

    await requireScript();
    await onUpdateRequest(
      _.merge({}, baseMessage, {
        payload: {
          episodeData: {
            _number: 113,
          },
          listEntry: {
            _progress: 113,
          },
        },
      }),
      sender
    );

    expect(api.updateLibraryItem).not.toHaveBeenCalled();
  });

  it("does not update if list updating is disabled", async () => {
    Settings.listUpdatingEnabled = jest.fn().mockResolvedValue(false);

    await requireScript();
    expect(
      await onUpdateRequest(
        _.merge({}, baseMessage, {
          payload: {
            loadTime: now.getTime() - 11 * oneMinute,
          },
        }),
        sender
      )
    ).toBeFalsy();

    expect(api.updateLibraryItem).not.toBeCalled();
  });

  it("does update on message if the episode number is greater than the current progress", async () => {
    Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(10);
    Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValue(false);

    await requireScript();
    await onUpdateRequest(
      _.merge({}, baseMessage, {
        payload: {
          loadTime: now.getTime() - 11 * oneMinute,
        },
      }),
      sender
    );

    await waitFor(() => expect(api.updateLibraryItem).toHaveBeenCalledTimes(1));
  });

  it("does update on tab close", async () => {
    Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(10);
    Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValue(false);

    await requireScript();
    await onEpisodeStarted(
      _.merge({}, baseMessage, {
        type: MESSAGE_TYPES.ANIME_EPISODE_STARTED,
        payload: {
          loadTime: now.getTime() - 11 * oneMinute,
        },
      }),
      sender
    );
    await onTabClose(tabId);

    await waitFor(() => expect(api.updateLibraryItem).toHaveBeenCalledTimes(1));
    expect(browser.tabs.onRemoved.removeListener).toHaveBeenCalledWith(
      onTabClose
    );
  });

  test.each(updatePopupTestCases)(
    "shows notification before %p if the notification setting is enabled on %p",
    async function (action, browserName, browser, expectedMessage) {
      getBrowserTypeSpy.mockReturnValue(browser);
      Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(10);
      Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValueOnce(true);
      Settings.shouldShowAddPopup = jest.fn().mockResolvedValueOnce(true);
      await requireScript();

      let payload;
      if (action === "updating") {
        payload = {
          loadTime: now.getTime() - 11 * oneMinute,
        };
      } else {
        payload = {
          loadTime: now.getTime() - 11 * oneMinute,
          episodeData: {
            _number: 1,
          },
          listEntry: {
            _progress: 0,
            _status: LIST_STATUS.NOT_WATCHING,
            _anime: {
              _episodeCount: 115,
            },
          },
        };
      }

      await onUpdateRequest(
        _.merge({}, baseMessage, {
          payload,
        }),
        sender
      );

      if (browser === BROWSER.CHROMIUM) {
        await waitFor(() =>
          expect(sendNotificationSpy).toHaveBeenCalledTimes(1)
        );
        expect(sendNotificationSpy).toHaveBeenLastCalledWith(
          "Finished watching an episode",
          expectedMessage,
          [
            {
              title: "Update",
            },
            {
              title: "No thanks",
            },
          ],
          expect.any(Function)
        );
      } else if (browser === BROWSER.FIREFOX) {
        await waitFor(() =>
          expect(sendNotificationWithClickSpy).toHaveBeenCalledTimes(1)
        );
        expect(sendNotificationWithClickSpy).toHaveBeenLastCalledWith(
          "Finished watching an episode",
          expectedMessage,
          expect.any(Function)
        );
      }

      expect(api.updateLibraryItem).not.toHaveBeenCalled();
    }
  );

  it("updates the anime when pressing the update button on the update popup", async () => {
    getBrowserTypeSpy.mockReturnValue(BROWSER.CHROMIUM);
    Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(0);
    Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValue(true);

    await requireScript();
    await onUpdateRequest(
      _.merge({}, baseMessage, {
        payload: {
          episodeData: {
            _number: 114,
          },
          listEntry: {
            _progress: 113,
            _status: LIST_STATUS.CURRENT,
          },
        },
      }),
      sender
    );

    await waitFor(() => expect(sendNotificationSpy).toHaveBeenCalledTimes(1));
    const buttonListener = sendNotificationSpy.mock.calls[0][3];
    expect(buttonListener).toBeDefined();

    buttonListener(0);

    await waitFor(() => expect(api.updateLibraryItem).toHaveBeenCalledTimes(1));
    expect(api.updateLibraryItem).toHaveBeenLastCalledWith(
      baseMessage.payload.listEntry._id,
      {
        progress: 114,
      }
    );
  });

  it("updates the anime when clicking the update popup on firefox", async () => {
    getBrowserTypeSpy.mockReturnValue(BROWSER.FIREFOX);
    Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(0);
    Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValue(true);

    await requireScript();
    await onUpdateRequest(
      _.merge({}, baseMessage, {
        payload: {
          episodeData: {
            _number: 114,
          },
          listEntry: {
            _progress: 113,
            _status: LIST_STATUS.CURRENT,
          },
        },
      }),
      sender
    );

    await waitFor(() =>
      expect(sendNotificationWithClickSpy).toHaveBeenCalledTimes(1)
    );
    const buttonListener = sendNotificationWithClickSpy.mock.calls[0][2];
    expect(buttonListener).toBeDefined();

    buttonListener();

    await waitFor(() => expect(api.updateLibraryItem).toHaveBeenCalledTimes(1));
    expect(api.updateLibraryItem).toHaveBeenLastCalledWith(
      baseMessage.payload.listEntry._id,
      {
        progress: 114,
      }
    );
  });

  it("does not update the anime when pressing the cancel button on the update popup", async () => {
    getBrowserTypeSpy.mockReturnValue(BROWSER.CHROMIUM);
    Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(0);
    Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValue(true);

    await requireScript();
    await onUpdateRequest(
      _.merge({}, baseMessage, {
        payload: {
          episodeData: {
            _number: 114,
          },
          listEntry: {
            _progress: 113,
            _status: LIST_STATUS.CURRENT,
          },
        },
      }),
      sender
    );

    await waitFor(() => expect(sendNotificationSpy).toHaveBeenCalledTimes(1));
    const buttonListener = sendNotificationSpy.mock.calls[0][3];
    expect(buttonListener).toBeDefined();

    buttonListener(1);

    expect(api.updateLibraryItem).not.toHaveBeenCalled();
  });

  it("adds the anime when pressing the update button on the add popup", async () => {
    getBrowserTypeSpy.mockReturnValue(BROWSER.CHROMIUM);
    Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(0);
    Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValue(true);

    await requireScript();
    await onUpdateRequest(
      _.merge({}, baseMessage, {
        payload: {
          episodeData: {
            _number: 1,
          },
          listEntry: {
            _progress: 0,
            _status: LIST_STATUS.NOT_WATCHING,
          },
        },
      }),
      sender
    );

    await waitFor(() => expect(sendNotificationSpy).toHaveBeenCalledTimes(1));
    const buttonListener = sendNotificationSpy.mock.calls[0][3];
    expect(buttonListener).toBeDefined();

    buttonListener(0);

    await waitFor(() => expect(api.createLibraryItem).toHaveBeenCalledTimes(1));
    expect(api.createLibraryItem).toHaveBeenLastCalledWith(
      baseMessage.payload.listEntry._anime._id,
      {
        progress: 1,
        status: LIST_STATUS.CURRENT,
        startedAt: expect.any(Date),
      }
    );
  });

  it("adds the anime when clicking the add popup on firefox", async () => {
    getBrowserTypeSpy.mockReturnValue(BROWSER.FIREFOX);
    Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(0);
    Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValue(true);

    await requireScript();
    await onUpdateRequest(
      _.merge({}, baseMessage, {
        payload: {
          episodeData: {
            _number: 1,
          },
          listEntry: {
            _progress: 0,
            _status: LIST_STATUS.NOT_WATCHING,
          },
        },
      }),
      sender
    );

    await waitFor(() =>
      expect(sendNotificationWithClickSpy).toHaveBeenCalledTimes(1)
    );
    const buttonListener = sendNotificationWithClickSpy.mock.calls[0][2];
    expect(buttonListener).toBeDefined();

    buttonListener();

    await waitFor(() => expect(api.createLibraryItem).toHaveBeenCalledTimes(1));
    expect(api.createLibraryItem).toHaveBeenLastCalledWith(
      baseMessage.payload.listEntry._anime._id,
      {
        progress: 1,
        status: LIST_STATUS.CURRENT,
        startedAt: expect.any(Date),
      }
    );
  });

  test.each(updatedPopupTestCases)(
    "shows updated popup for new library status %p on %p",
    async function (statusText, browser, payload, expectedText) {
      switch (browser) {
        case "chrome":
          getBrowserTypeSpy.mockReturnValue(BROWSER.CHROMIUM);
          break;
        case "firefox":
          getBrowserTypeSpy.mockReturnValue(BROWSER.FIREFOX);
          break;
      }

      Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(0);
      Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValue(false);

      await requireScript();
      await onUpdateRequest(
        _.merge({}, baseMessage, {
          payload,
        }),
        sender
      );

      await waitFor(() =>
        expect(api.updateLibraryItem).toHaveBeenCalledTimes(1)
      );

      if (browser === "chrome") {
        expect(sendNotificationSpy).toHaveBeenCalledTimes(1);
        expect(sendNotificationSpy).toHaveBeenLastCalledWith(
          "List updated",
          expectedText,
          [
            {
              title: "See anime on My Anime List",
            },
            {
              title: "Undo",
            },
          ],
          expect.any(Function)
        );
      } else if (browser === "firefox") {
        expect(sendNotificationWithClickSpy).toHaveBeenCalledTimes(1);
        expect(sendNotificationWithClickSpy).toHaveBeenLastCalledWith(
          "List updated",
          expectedText,
          expect.any(Function)
        );
      }

      expect.hasAssertions();
    }
  );

  it("opens the anime in a new tab when clicking the open anime button on the updated popup", async () => {
    getBrowserTypeSpy.mockReturnValue(BROWSER.CHROMIUM);

    Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(0);
    Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValue(false);

    await requireScript();
    await onUpdateRequest(
      _.merge({}, baseMessage, {
        payload: {
          episodeData: {
            _number: 114,
          },
          listEntry: {
            _progress: 113,
            _status: LIST_STATUS.CURRENT,
            _anime: {
              _link:
                "https://myanimelist.net/anime/31964/Boku_no_Hero_Academia",
            },
          },
        },
      }),
      sender
    );

    await waitFor(() => expect(sendNotificationSpy).toHaveBeenCalledTimes(1));
    const buttonListener = sendNotificationSpy.mock.calls[0][3];
    expect(buttonListener).toBeDefined();
    buttonListener(0);

    expect(browser.tabs.create).toHaveBeenCalledTimes(1);
    expect(browser.tabs.create).toHaveBeenLastCalledWith({
      active: true,
      url: "https://myanimelist.net/anime/31964/Boku_no_Hero_Academia",
    });
  });

  it("opens the anime in a new tab when clicking updated popup on firefox", async () => {
    getBrowserTypeSpy.mockReturnValue(BROWSER.FIREFOX);

    Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(0);
    Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValue(false);

    await requireScript();
    await onUpdateRequest(
      _.merge({}, baseMessage, {
        payload: {
          episodeData: {
            _number: 114,
          },
          listEntry: {
            _progress: 113,
            _status: LIST_STATUS.CURRENT,
            _anime: {
              _link:
                "https://myanimelist.net/anime/31964/Boku_no_Hero_Academia",
            },
          },
        },
      }),
      sender
    );

    await waitFor(() =>
      expect(sendNotificationWithClickSpy).toHaveBeenCalledTimes(1)
    );
    const buttonListener = sendNotificationWithClickSpy.mock.calls[0][2];
    expect(buttonListener).toBeDefined();
    buttonListener();

    expect(browser.tabs.create).toHaveBeenCalledTimes(1);
    expect(browser.tabs.create).toHaveBeenLastCalledWith({
      active: true,
      url: "https://myanimelist.net/anime/31964/Boku_no_Hero_Academia",
    });
  });

  it("reverts the anime and shows the reverted popup when clicking the undo button on the updated popup", async () => {
    getBrowserTypeSpy.mockReturnValue(BROWSER.CHROMIUM);

    Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(0);
    Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValue(false);

    await requireScript();
    await onUpdateRequest(
      _.merge({}, baseMessage, {
        payload: {
          episodeData: {
            _number: 114,
          },
          listEntry: {
            _progress: 113,
            _status: LIST_STATUS.CURRENT,
            _anime: {
              _link:
                "https://myanimelist.net/anime/31964/Boku_no_Hero_Academia",
            },
          },
        },
      }),
      sender
    );

    await waitFor(() => expect(sendNotificationSpy).toHaveBeenCalledTimes(1));
    const buttonListener = sendNotificationSpy.mock.calls[0][3];
    expect(buttonListener).toBeDefined();
    buttonListener(1);

    await waitFor(() => expect(api.updateLibraryItem).toHaveBeenCalledTimes(2));
    expect(api.updateLibraryItem).toHaveBeenLastCalledWith(
      baseMessage.payload.listEntry._id,
      {
        finishedAt: null,
        progress: 113,
        rewatchCount: 0,
        status: LIST_STATUS.CURRENT,
      }
    );
    expect(sendNotificationSpy).toHaveBeenCalledTimes(2);
    expect(sendNotificationSpy).toHaveBeenLastCalledWith(
      "List updated",
      "The change to My Hero Academia has been reverted."
    );
  });

  it("reverts the anime and shows the reverted popup when clicking the undo button on the added popup", async () => {
    getBrowserTypeSpy.mockReturnValue(BROWSER.CHROMIUM);

    Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(0);
    Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValue(false);

    await requireScript();
    await onUpdateRequest(
      _.merge({}, baseMessage, {
        payload: {
          episodeData: {
            _number: 1,
          },
          listEntry: {
            _progress: 0,
            _status: LIST_STATUS.NOT_WATCHING,
            _anime: {
              _link:
                "https://myanimelist.net/anime/31964/Boku_no_Hero_Academia",
            },
          },
        },
      }),
      sender
    );

    await waitFor(() => expect(sendNotificationSpy).toHaveBeenCalledTimes(1));
    const buttonListener = sendNotificationSpy.mock.calls[0][3];
    expect(buttonListener).toBeDefined();
    buttonListener(1);

    await waitFor(() => expect(api.removeLibraryItem).toHaveBeenCalledTimes(1));
    expect(api.removeLibraryItem).toHaveBeenLastCalledWith(
      baseMessage.payload.listEntry._id
    );
    expect(sendNotificationSpy).toHaveBeenCalledTimes(2);
    expect(sendNotificationSpy).toHaveBeenLastCalledWith(
      "List updated",
      "The change to My Hero Academia has been reverted."
    );
  });

  it("shows error message when reverting fails", async () => {
    getBrowserTypeSpy.mockReturnValue(BROWSER.CHROMIUM);

    Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(0);
    Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValue(false);
    api.removeLibraryItem.mockRejectedValueOnce("error");

    await requireScript();
    await onUpdateRequest(
      _.merge({}, baseMessage, {
        payload: {
          episodeData: {
            _number: 1,
          },
          listEntry: {
            _progress: 0,
            _status: LIST_STATUS.NOT_WATCHING,
            _anime: {
              _link:
                "https://myanimelist.net/anime/31964/Boku_no_Hero_Academia",
            },
          },
        },
      }),
      sender
    );

    await waitFor(() => expect(sendNotificationSpy).toHaveBeenCalledTimes(1));
    const buttonListener = sendNotificationSpy.mock.calls[0][3];
    expect(buttonListener).toBeDefined();
    buttonListener(1);

    await waitFor(() => expect(api.removeLibraryItem).toHaveBeenCalledTimes(1));
    expect(api.removeLibraryItem).toHaveBeenLastCalledWith(
      baseMessage.payload.listEntry._id
    );
    expect(sendNotificationSpy).toHaveBeenCalledTimes(2);
    expect(sendNotificationSpy).toHaveBeenLastCalledWith(
      "An error has occurred.",
      "The series progress was unable to be updated automatically.",
      [
        {
          title: "See anime on My Anime List",
        },
      ],
      expect.any(Function)
    );
  });

  test.each([
    ["chrome", BROWSER.CHROMIUM],
    ["firefox", BROWSER.FIREFOX],
  ])(
    "shows error popup on update error for %p",
    async function (browser, browserType) {
      getBrowserTypeSpy.mockReturnValue(browserType);
      api.updateLibraryItem.mockRejectedValueOnce("error");
      Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(10);
      Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValue(false);

      await requireScript();
      await onUpdateRequest(
        _.merge({}, baseMessage, {
          payload: {
            loadTime: now.getTime() - 11 * oneMinute,
          },
        }),
        sender
      );

      await waitFor(() =>
        expect(api.updateLibraryItem).toHaveBeenCalledTimes(1)
      );

      if (browser === "chrome") {
        expect(sendNotificationSpy).toHaveBeenCalledTimes(1);
        expect(sendNotificationSpy).toHaveBeenLastCalledWith(
          "An error has occurred.",
          "The series progress was unable to be updated automatically.",
          [
            {
              title: "See anime on My Anime List",
            },
          ],
          expect.any(Function)
        );
      } else if (browser === "firefox") {
        expect(sendNotificationWithClickSpy).toHaveBeenCalledTimes(1);
        expect(sendNotificationWithClickSpy).toHaveBeenLastCalledWith(
          "An error has occurred.",
          "The series progress was unable to be updated automatically.",
          expect.any(Function)
        );
      }
    }
  );

  it("clicking the see anime button on error popup opens the anime in a new tab", async () => {
    getBrowserTypeSpy.mockReturnValue(BROWSER.CHROMIUM);
    api.updateLibraryItem.mockRejectedValueOnce("error");
    Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(10);
    Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValue(false);

    await requireScript();
    await onUpdateRequest(
      _.merge({}, baseMessage, {
        payload: {
          loadTime: now.getTime() - 11 * oneMinute,
          listEntry: {
            _anime: {
              _link:
                "https://myanimelist.net/anime/31964/Boku_no_Hero_Academia",
            },
          },
        },
      }),
      sender
    );

    await waitFor(() => expect(api.updateLibraryItem).toHaveBeenCalledTimes(1));

    expect(sendNotificationSpy).toHaveBeenCalledTimes(1);
    const buttonListener = sendNotificationSpy.mock.calls[0][3];
    expect(buttonListener).toBeDefined();

    buttonListener(0);

    expect(browser.tabs.create).toHaveBeenCalledTimes(1);
    expect(browser.tabs.create).toHaveBeenLastCalledWith({
      active: true,
      url: "https://myanimelist.net/anime/31964/Boku_no_Hero_Academia",
    });
  });

  it("clicking the error popup opens the anime in a new tab on Firefox", async () => {
    getBrowserTypeSpy.mockReturnValue(BROWSER.FIREFOX);
    api.updateLibraryItem.mockRejectedValueOnce("error");
    Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(10);
    Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValue(false);

    await requireScript();
    await onUpdateRequest(
      _.merge({}, baseMessage, {
        payload: {
          loadTime: now.getTime() - 11 * oneMinute,
          listEntry: {
            _anime: {
              _link:
                "https://myanimelist.net/anime/31964/Boku_no_Hero_Academia",
            },
          },
        },
      }),
      sender
    );

    await waitFor(() => expect(api.updateLibraryItem).toHaveBeenCalledTimes(1));

    expect(sendNotificationWithClickSpy).toHaveBeenCalledTimes(1);
    const buttonListener = sendNotificationWithClickSpy.mock.calls[0][2];
    expect(buttonListener).toBeDefined();

    buttonListener();

    expect(browser.tabs.create).toHaveBeenCalledTimes(1);
    expect(browser.tabs.create).toHaveBeenLastCalledWith({
      active: true,
      url: "https://myanimelist.net/anime/31964/Boku_no_Hero_Academia",
    });
  });
});
