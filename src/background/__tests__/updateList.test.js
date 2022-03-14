import { waitFor } from "@testing-library/react";
import _ from "lodash";
import Settings from "../../options/Settings";
import * as builder from "../../providers/builder";
import * as storageHelpers from "../../helpers/storageHelpers";
import MockApiProvider from "../../__mocks__/MockApiProvider";
import AnimeEpisode from "../../models/AnimeEpisode";
import MESSAGE_TYPES from "../../messageTypes";
import { LIST_STATUS } from "../../enums";
import LibraryEntry from "../../models/LibraryEntry";
import AnimeSeries from "../../models/AnimeSeries";

describe("Update list background script", () => {
  const now = new Date("2022-03-05");
  const oneMinute = 60000;

  let showCurrentWatchingAlertOnPopupSpy = jest.spyOn(
    storageHelpers,
    "showCurrentWatchingAlertOnPopup"
  );
  let apiInstanceSpy;
  let listUpdatingEnabledSpy;
  /* eslint-disable no-unused-vars */
  let shouldUpdateAfterMinutesSpy;
  let shouldShowUpdatePopupSpy;
  /* eslint-enable no-unused-vars */
  let api = new MockApiProvider();
  let onEpisodeStarted;
  let onUpdateRequest;

  const baseMessage = {
    type: MESSAGE_TYPES.UPDATE_EPISODE,
    payload: {
      loadTime: now,
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

  const sender = {
    tab: {
      id: 123,
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    jest.useFakeTimers().setSystemTime(now.getTime());
    listUpdatingEnabledSpy = jest.spyOn(Settings, "listUpdatingEnabled");
    shouldUpdateAfterMinutesSpy = jest
      .spyOn(Settings, "shouldUpdateAfterMinutes")
      .mockResolvedValue(0);
    shouldShowUpdatePopupSpy = jest
      .spyOn(Settings, "shouldShowUpdatePopup")
      .mockResolvedValue(false);

    apiInstanceSpy = jest
      .spyOn(builder, "getApiInstance")
      .mockResolvedValue(api);
    api.isAuthenticated.mockResolvedValue(true);
    api.updateLibraryItem.mockResolvedValue(true);
    browser.runtime.onMessage.addListener.mockImplementationOnce((fn) => {
      onEpisodeStarted = fn;
    });
    browser.runtime.onMessage.addListener.mockImplementationOnce((fn) => {
      onUpdateRequest = fn;
    });
    browser.tabs = {
      ...browser.tabs,
      onRemoved: {
        addListener: jest.fn(),
        removeListener: jest.fn(),
      },
    };
  });

  afterEach(async () => {
    // await browser.storage.sync.clear();
    jest.useRealTimers();
    // getListUpdatingEnabled.mockClear();
    // jest.clearAllMocks();
    jest.resetModules();
    onUpdateRequest = undefined;
  });

  afterAll(() => {
    apiInstanceSpy.mockRestore();
  });

  async function requireScript() {
    require("../updateList");
    await waitFor(() => expect(onUpdateRequest).toBeDefined());
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
    await requireScript();
    await onUpdateRequest(baseMessage, sender);
    expect(api.updateLibraryItem).not.toHaveBeenCalled();
  });

  test.each([
    ["not watching", LIST_STATUS.NOT_WATCHING],
    ["completed", LIST_STATUS.COMPLETED],
    ["dropped", LIST_STATUS.DROPPED],
  ])(
    "does not update if the library status is %s",
    async (_name, listStatus) => {
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
    }
  );

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

  it.skip("does update if all conditions have been met", async () => {
    await requireScript();
    await onUpdateRequest(
      _.merge({}, baseMessage, {
        payload: {
          loadTime: now.getTime() - 11 * oneMinute,
        },
      })
    );

    await waitFor(() => expect(api.updateLibraryItem).toHaveBeenCalledTimes(1));
  });

  it.skip("shows notification before updating if the notification setting is enabled", async () => {
    shouldShowUpdatePopupSpy.mockResolvedValueOnce(true);
    await requireScript();
    await onUpdateRequest(
      _.merge({}, baseMessage, {
        payload: {
          loadTime: now.getTime() - 11 * oneMinute,
        },
      })
    );

    expect(api.updateLibraryItem).not.toHaveBeenCalled();
    await waitFor(() =>
      expect(browser.notifications.create).toHaveBeenCalledTimes(1)
    );
  });
});
