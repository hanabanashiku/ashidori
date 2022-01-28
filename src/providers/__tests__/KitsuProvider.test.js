import KitsuProvider from "../KitsuProvider";
import axios from "../../__mocks__/axios";
import { LIST_STATUS, PROVIDERS } from "../../enums";

// mock data
import userData from "../../__mocks__/kitsu/user.json";
import libraryEntry from "../../__mocks__/kitsu/libraryEntry.json";
import animeData from "../../__mocks__/kitsu/anime.json";

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
    axios.get.mockResolvedValueOnce({
      data: userData,
    });

    const actual = await kitsu.fetchUserData();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("/users?filter[self]=true");
    expect(actual).not.toBeNull();
    expect(actual.username).toBe("TestAccount");
    expect(actual.id).toBe("30000");
  });

  describe("getAnimeListByStatus", () => {
    beforeEach(() => {
      axios.get.mockResolvedValueOnce({
        data: {
          data: [libraryEntry.data],
          included: libraryEntry.included,
          meta: {
            statusCounts: {
              current: 1,
            },
          },
        },
      });
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

  it("getSingleLibraryEntry grabs a library item", async () => {
    const entryId = "29377736";
    axios.get.mockResolvedValueOnce({
      data: {
        data: libraryEntry.data,
        included: libraryEntry.included,
      },
    });

    const actual = await kitsu.getSingleLibraryEntry(entryId);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenLastCalledWith(
      `library-entries/${entryId}?include=anime,anime.streamingLinks,anime.genres`
    );
    expect(actual).not.toBeNull();
    expect(actual.id).toBe(entryId);
    expect(actual.status).toBe(LIST_STATUS.CURRENT);
    expect(actual.anime.id).toBe(libraryEntry.included[0].id);
  });

  describe("getSingleLibraryEntryByAnime", () => {
    it("grabs a library item", async () => {
      const animeId = "12";
      axios.get.mockResolvedValueOnce({
        data: {
          data: [libraryEntry.data],
          included: libraryEntry.included,
          meta: { count: 1 },
        },
      });

      const actual = await kitsu.getSingleLibraryEntryByAnime(animeId);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenLastCalledWith(
        `library-entries?filter[kind]=anime&filter[userId]=${userId}&filter[animeId]=${animeId}&include=anime,anime.streamingLinks,anime.genres`
      );
      expect(actual).not.toBeNull();
      expect(actual.id).toBe("29377736");
      expect(actual.status).toBe(LIST_STATUS.CURRENT);
      expect(actual.anime.id).toBe(libraryEntry.included[0].id);
    });

    it("returns the anime with a blank list item if the anime was not found", async () => {
      const animeId = "12";
      axios.get.mockImplementation((url) => {
        if (url.match(/^library-entries/)) {
          return Promise.resolve({
            data: {
              data: [],
              included: {},
              meta: {
                count: 0,
              },
            },
          });
        }
        if (url.match(/^anime/)) {
          return Promise.resolve({
            data: animeData,
          });
        }
        return Promise.reject({
          response: {
            status: 404,
          },
        });
      });

      const actual = await kitsu.getSingleLibraryEntryByAnime(animeId);

      expect(axios.get).toHaveBeenCalledTimes(2);
      expect(axios.get).toHaveBeenNthCalledWith(
        1,
        `library-entries?filter[kind]=anime&filter[userId]=${userId}&filter[animeId]=${animeId}&include=anime,anime.streamingLinks,anime.genres`
      );
      expect(axios.get).toHaveBeenNthCalledWith(
        2,
        `anime/${animeId}?include=streamingLinks,genres`
      );
      expect(actual).not.toBeNull();
      expect(actual.anime).not.toBeNull();
      expect(actual.anime.id).toBe(animeId);
      expect(actual.anime.title).toBe("One Piece");
      expect(actual.status).toBe(LIST_STATUS.NOT_WATCHING);
      expect(actual.progress).toBe(0);
      expect(actual.startDate).toBeNull();
    });

    it("returns null if the anime does not exist", async () => {
      const animeId = "13";
      axios.get.mockImplementation((url) => {
        if (url.match(/^library-entries/)) {
          return Promise.resolve({
            data: {
              data: [],
              included: {},
              meta: {
                count: 0,
              },
            },
          });
        }
        return Promise.reject({
          response: {
            status: 404,
          },
        });
      });

      const actual = await kitsu.getSingleLibraryEntryByAnime(animeId);

      expect(axios.get).toHaveBeenCalledTimes(2);
      expect(actual).toBeNull();
    });
  });

  describe("getAnime", () => {
    const animeId = "12";

    it("returns anime data", async () => {
      axios.get.mockResolvedValueOnce({
        data: animeData,
      });
  
      const actual = await kitsu.getAnime(animeId);
  
      expect(actual).not.toBeNull();
      expect(actual).anim;
    });

    it("returns null if the anime was not found", async () => {
      axios.get.mockRejectedValueOnce({
        response: {
          data: null,
          status: 404,
        }
      });

      const actual = await kitsu.getAnime(animeId);

      expect(actual).toBeNull()
    });
  });
});
