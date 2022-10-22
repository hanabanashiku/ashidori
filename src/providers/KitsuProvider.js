import _ from "lodash";
import { omitBy } from "lodash/fp";
import axios from "axios";
import ApiProvider from "./ApiProvider";
import Settings from "../options/Settings";
import UserData from "../models/UserData";
import LibraryEntry from "../models/LibraryEntry";
import AnimeSeries from "../models/AnimeSeries";
import PagedData from "../models/PagedData";
import { getHttpAdapter } from "./helper";
import { PROVIDERS, LIST_STATUS } from "../enums";

const KITSU_BASE_URL = "https://kitsu.io/api/edge";
const KITSU_AUTH_URL = "https://kitsu.io/api/oauth";

export const STATUS_MAP = {
  completed: LIST_STATUS.COMPLETED,
  current: LIST_STATUS.CURRENT,
  dropped: LIST_STATUS.DROPPED,
  on_hold: LIST_STATUS.ON_HOLD,
  planned: LIST_STATUS.PLANNED,
};

function mapStatusToKitsuStatus(status) {
  return Object.keys(STATUS_MAP).find((key) => STATUS_MAP[key] === status);
}

export default class KitsuProvider extends ApiProvider {
  /**
   * @type {import("axios").AxiosInstance}
   */
  #client = null;
  #userId;

  constructor() {
    super();

    this.#client = axios.create({
      baseURL: KITSU_BASE_URL,
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      },
      adapter: getHttpAdapter(),
    });
    this.#client.interceptors.request.use(async (config) => {
      return this._requestInterceptor(config);
    });
    this._setProvider(PROVIDERS.KITSU);

    this.getUserData().then((data) => {
      const userId = data?.id ?? null;
      this.#userId = userId;
    });
  }

  /**
   * @returns The provider type for this api client.
   */
  get providerType() {
    return PROVIDERS.KITSU;
  }

  /**
   * Gets the user's anime list for a given status.
   * @param status {number} The anime status from the LIST_STATUS enum.
   * @param page {number} Which page number to grab for, starting from 0.
   * @param limit {number} The number of items per page.
   * @param sort {string} The name of the field to sort by.
   * @param sortBy {string} Ascending or descending.
   * @returns {Promise<PagedData<LibraryEntry>>]} The list of library entries.
   */
  async getAnimeListByStatus(
    status,
    page = 0,
    limit = 20,
    sort = null,
    sortBy = "asc"
  ) {
    if (!this.#userId) {
      throw "Missing user data";
    }

    const kitsuStatus = mapStatusToKitsuStatus(status);

    const response = await this.#client.get(
      `library-entries?filter[kind]=anime&filter[userId]=${
        this.#userId
      }&filter[status]=${kitsuStatus}&include=anime,anime.streamingLinks,anime.genres&page[limit]=${limit}&page[offset]=${
        limit * page
      }${KitsuProvider.#mapSort(sort, sortBy)}`
    );

    const items = response.data.data.map((entry) =>
      KitsuProvider.#mapData(LibraryEntry, entry, response.data.included)
    );

    return new PagedData({
      data: await Promise.all(items),
      page,
      limit,
      total: response.data.meta.statusCounts[kitsuStatus],
    });
  }
  /**
   * Get a single library entry for the current user.
   * @param {string} entryId The id of the library entry.
   * @returns {Promise<LibraryEntry>} A library entry containing the user's current watch status.
   */
  async getSingleLibraryEntry(entryId) {
    if (!this.#userId) {
      throw "Missing user data";
    }

    const response = await this.#client.get(
      `library-entries/${entryId}?include=anime,anime.streamingLinks,anime.genres`
    );

    return KitsuProvider.#mapData(
      LibraryEntry,
      response.data.data,
      response.data.included
    );
  }

  /**
   * Get a single library entry for the current user.
   * @param {string} animeId The id of the anime series to search for.
   * @returns {Promise<LibraryEntry>} A library entry containing the user's current watch status.
   */
  async getSingleLibraryEntryByAnime(animeId) {
    if (!this.#userId) {
      throw "Missing user data";
    }

    const response = await this.#client.get(
      `library-entries?filter[kind]=anime&filter[userId]=${
        this.#userId
      }&filter[animeId]=${animeId}&include=anime,anime.streamingLinks,anime.genres`
    );

    if (response.data.meta.count < 1) {
      const anime = await this.getAnime(animeId);

      return anime
        ? new LibraryEntry({
            _anime: anime,
          })
        : null;
    }

    return KitsuProvider.#mapData(
      LibraryEntry,
      response.data.data[0],
      response.data.included
    );
  }

  async createLibraryItem(animeId, patch) {
    const attributes = KitsuProvider.#createPatch(patch);

    return this.#client.post(`/library-entries`, {
      data: {
        type: "libraryEntries",
        attributes,
        relationships: {
          anime: {
            data: {
              type: "anime",
              id: animeId,
            },
          },
          user: {
            data: {
              type: "users",
              id: this.#userId,
            },
          },
        },
      },
    });
  }

  async updateLibraryItem(itemId, patch) {
    const attributes = KitsuProvider.#createPatch(patch);

    return this.#client.patch(`/library-entries/${itemId}`, {
      data: {
        type: "libraryEntries",
        id: `${itemId}`,
        attributes,
      },
    });
  }

  async removeLibraryItem(itemId) {
    return this.#client.delete(`/library-entries/${itemId}`);
  }

  /**
   * Get an anime series based on anime id.
   * @param {string} animeId The id of the anime series.
   * @returns {Promise<AnimeSeries?>} The anime series, or null if not found.
   */
  async getAnime(animeId) {
    try {
      const response = await this.#client.get(
        `anime/${animeId}?include=streamingLinks,genres`
      );

      return KitsuProvider.#mapData(
        AnimeSeries,
        response.data.data,
        response.data.included
      );
    } catch (e) {
      if (e.response?.status === 404) {
        return null;
      }
      throw e;
    }
  }

  async findAnime(text, page = 0, limit = 30) {
    const response = await this.#client.get(
      `anime?filter[text]=${encodeURIComponent(
        text
      )}&include=streamingLinks,genres&page[limit]=${limit}&page[offset]=${
        limit * page
      }`
    );
    const shows = response.data.data.map((item) =>
      KitsuProvider.#mapData(AnimeSeries, item, response.data.included)
    );

    return new PagedData({
      data: await Promise.all(shows),
      page,
      limit,
      total: response.data.meta.count,
    });
  }

  async fetchUserData() {
    try {
      const response = await this.#client.get("/users?filter[self]=true");
      const userInfo = new UserData({
        ...response.data,
        provider: PROVIDERS.KITSU,
      });
      await super.fetchUserData(userInfo);
      this.#userId = userInfo.id;
      return userInfo;
    } catch (e) {
      throw new Error("Unable to get user info.");
    }
  }

  async authorize(username, password) {
    const params = new URLSearchParams();
    params.append("grant_type", "password");
    params.append("username", username);
    params.append("password", password);
    params.append("scope", "");

    try {
      const response = await axios.post(`${KITSU_AUTH_URL}/token`, params);
      await this.#setTokenResponse(response);
      await this.fetchUserData();
      return true;
    } catch (e) {
      throw "Unable to authenticate. Check username/password";
    }
  }

  async refresh() {
    const token = this.getRefreshToken();
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", await token);

    try {
      const response = await axios.post(`${KITSU_AUTH_URL}/token`, params);
      await this.#setTokenResponse(response);
      return true;
    } catch {
      throw "Unable to authenticate. Check refresh token.";
    }
  }

  static #createPatch(patch) {
    return _.flow(
      omitBy(_.isUndefined),
      omitBy(_.isNaN)
    )({
      status: mapStatusToKitsuStatus(patch.status),
      progress: patch.progress,
      notes: patch.notes,
      startedAt:
        patch.startDate === null
          ? null
          : patch.startDate?.toISOString() ?? undefined,
      finishedAt:
        patch.completedDate === null
          ? null
          : patch.completedDate?.toISOString() ?? undefined,
      ratingTwenty: patch.rating * 2,
      reconsumeCount: patch.rewatchCount,
    });
  }

  static async #mapData(type, data, included = []) {
    const titleLanguagePreference = Settings.getTitleLanguagePreference();
    return new type({
      ...data,
      included,
      provider: PROVIDERS.KITSU,
      __langPref: await titleLanguagePreference,
    });
  }

  static #mapSort(field, sortBy) {
    if (!field) {
      return "";
    }

    let kitsuField;

    switch (field) {
      case "progress":
      case "notes":
      case "status":
        kitsuField = field;
        break;
      case "startDate":
        kitsuField = "startedAt";
        break;
      case "completedDate":
        kitsuField = "finishedAt";
        break;
      case "rating":
        kitsuField = "ratingTwenty";
        break;
      case "lastUpdated":
        kitsuField = "updatedAt";
        break;
      default:
        return "";
    }

    return `&sort=${sortBy === "desc" ? "-" : ""}${kitsuField}`;
  }

  async #setTokenResponse(response) {
    this._setAuthToken(
      response.data["access_token"],
      response.data["created_at"] + response.data["expires_in"]
    );
    this._setRefreshToken(response.data["refresh_token"]);
  }
}
