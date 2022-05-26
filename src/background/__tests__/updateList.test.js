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

jest.mock("../../options/Settings");

describe("Update list background script", () => {
  const now = new Date();
  const oneMinute = 60000;

  let showCurrentWatchingAlertOnPopupSpy = jest.spyOn(
    storageHelpers,
    "showCurrentWatchingAlertOnPopup"
  );
  let api = new MockApiProvider();

  let apiInstanceSpy;
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
    jest.useFakeTimers().setSystemTime(now.getTime());

    apiInstanceSpy = jest
      .spyOn(builder, "getApiInstance")
      .mockResolvedValue(api);
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

  it("does update if all conditions have been met", async () => {
    Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(10);
    Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValue(false);
    await waitFor(async () =>
      expect(await Settings.shouldShowUpdatePopup()).toBeFalsy()
    );
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

  it("shows notification before updating if the notification setting is enabled", async () => {
    Settings.shouldUpdateAfterMinutes = jest.fn().mockResolvedValue(10);
    Settings.shouldShowUpdatePopup = jest.fn().mockResolvedValueOnce(true);
    await requireScript();
    await onUpdateRequest(
      _.merge({}, baseMessage, {
        payload: {
          loadTime: now.getTime() - 11 * oneMinute,
        },
      }),
      sender
    );

    expect(api.updateLibraryItem).not.toHaveBeenCalled();
    await waitFor(() =>
      expect(browser.notifications.create).toHaveBeenCalledTimes(1)
    );
  });
});
