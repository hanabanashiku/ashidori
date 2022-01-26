import KitsuProvider from "../KitsuProvider";
import axios from "../../__mocks__/axios";
import { LIST_STATUS, PROVIDERS } from "../../enums";

// mock data
import userData from "../../__mocks__/kitsu/user.json";
import libraryEntry from "../../__mocks__/kitsu/libraryEntry.json";

describe("Kitsu api provider", () => {
  const userId = "30000";

  let kitsu;

  beforeEach(() => {
    browser.storage.local.set({
      userData: {
        _id: userId,
        _username: "john.doe",
        _url: "https://kitsu.io/users/3000",
        _avatarUrl: "about:blank",
        _provider: PROVIDERS.KITSU,
      },
    });

    kitsu = new KitsuProvider();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetch user data gets data for the user", async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: userData,
      })
    );

    const actual = await kitsu.fetchUserData();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("/users?filter[self]=true");
    expect(actual).not.toBeNull();
    expect(actual.username).toBe("TestAccount");
    expect(actual.id).toBe("30000");
  });

  describe("getAnimeListByStatus", () => {
    beforeEach(() => {
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            data: [libraryEntry.data],
            included: libraryEntry.included,
            meta: {
              statusCounts: {
                current: 1,
              },
            },
          },
        })
      );
    });

    it("returns the anime list data for current status", async () => {
      const actual = await kitsu.getAnimeListByStatus(LIST_STATUS.CURRENT);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `library-entries?filter[kind]=anime&filter[userId]=${userId}&filter[status]=current&include=anime,anime.streamingLinks,anime.genres&page[limit]=20&page[offset]=0`
      );
      expect(actual).not.toBeNull();
      expect(actual.total).toBe(1);
      expect(actual.page).toBe(0);
      expect(actual.limit).toBe(20);
      expect(actual.data.length).toBe(1);
      const entry = actual.data[0];
      expect(entry.id).toBe("29377736");
      expect(entry.anime.id).toBe("13209");
    });

    it("returns the anime list data for completed status", async () => {
      const actual = await kitsu.getAnimeListByStatus(LIST_STATUS.COMPLETED);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `library-entries?filter[kind]=anime&filter[userId]=${userId}&filter[status]=completed&include=anime,anime.streamingLinks,anime.genres&page[limit]=20&page[offset]=0`
      );

      expect(actual).not.toBeNull();
    });

    it("returns the anime list data for dropped status", async () => {
      const actual = await kitsu.getAnimeListByStatus(LIST_STATUS.DROPPED);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `library-entries?filter[kind]=anime&filter[userId]=${userId}&filter[status]=dropped&include=anime,anime.streamingLinks,anime.genres&page[limit]=20&page[offset]=0`
      );

      expect(actual).not.toBeNull();
    });

    it("returns the anime list data for on hold status", async () => {
      const actual = await kitsu.getAnimeListByStatus(LIST_STATUS.ON_HOLD);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `library-entries?filter[kind]=anime&filter[userId]=${userId}&filter[status]=on_hold&include=anime,anime.streamingLinks,anime.genres&page[limit]=20&page[offset]=0`
      );

      expect(actual).not.toBeNull();
    });

    it("returns the anime list data for planned status", async () => {
      const actual = await kitsu.getAnimeListByStatus(LIST_STATUS.PLANNED);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `library-entries?filter[kind]=anime&filter[userId]=${userId}&filter[status]=planned&include=anime,anime.streamingLinks,anime.genres&page[limit]=20&page[offset]=0`
      );

      expect(actual).not.toBeNull();
    });

    it("allows for sorting", async () => {
      const actual = await kitsu.getAnimeListByStatus(
        LIST_STATUS.CURRENT,
        0,
        20,
        "progress",
        "desc"
      );
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `library-entries?filter[kind]=anime&filter[userId]=${userId}&filter[status]=current&include=anime,anime.streamingLinks,anime.genres&page[limit]=20&page[offset]=0&sort=-progress`
      );

      expect(actual).not.toBeNull();
    });

    it("allows for pagination", async () => {
      const actual = await kitsu.getAnimeListByStatus(
        LIST_STATUS.CURRENT,
        2,
        30
      );
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `library-entries?filter[kind]=anime&filter[userId]=${userId}&filter[status]=current&include=anime,anime.streamingLinks,anime.genres&page[limit]=30&page[offset]=60`
      );

      expect(actual).not.toBeNull();
      expect(actual.page).toBe(2);
      expect(actual.total).toBe(1);
      expect(actual.limit).toBe(30);
    });
  });
});
