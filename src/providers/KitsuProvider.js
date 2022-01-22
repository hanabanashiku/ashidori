import _ from "lodash";
import { omitBy } from "lodash/fp";
import axios from "axios";
import ApiProvider from "./ApiProvider";
import { PROVIDERS } from "../enums";
import UserData from "../models/UserData";
import LibraryEntry from "../models/LibraryEntry";
import Library from "../models/Library";
import AnimeSeries from "../models/AnimeSeries";
import PagedData from "../models/PagedData";
import { LIST_STATUS } from "../enums";

const KITSU_BASE_URL = "https://kitsu.io/api/edge";
const KITSU_AUTH_URL = "https://kitsu.io/api/oauth";

export const STATUS_MAP = {
  completed: LIST_STATUS.COMPLETED,
  current: LIST_STATUS.CURRENT,
  dropped: LIST_STATUS.DROPPED,
  on_hold: LIST_STATUS.ON_HOLD,
  planned: LIST_STATUS.PLANNED,
};

function mapStatus(status) {
  if (status === undefined) {
    return undefined;
  }
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
    });
    this.#client.interceptors.request.use(async (config) => {
      return this._requestInterceptor(config);
    });
    this._setProvider(PROVIDERS.KITSU);

    this.getUserData().then((data) => (this.#userId = data?.id ?? null));
  }

  /**
   * Get the user's anime list.
   * @returns {Promise<Library>} The user's library.
   */
  async getAnimeList() {
    if (!this.#userId) {
      throw "Missing user data";
    }

    const response = await this.#client.get(
      `library-entries?filter[kind]=anime&filter[userId]=${
        this.#userId
      }&include=anime,anime.streamingLinks,anime.genres`
    );

    const items = response.data.data.map((entry) =>
      KitsuProvider.#mapLibraryItem(entry, response.data.included)
    );

    return new Library(items);
  }

  /**
   * Gets the user's anime list for a given status.
   * @param status {number} The anime status from the LIST_STATUS enum.
   * @param page {number} Which page number to grab for, starting from 0.
   * @param limit {number} The number of items per page.
   * @returns {Promise<PagedData<LibraryEntry>>]} The list of library entries.
   */
  async getAnimeListByStatus(status, page, limit = 20) {
    if (!this.#userId) {
      throw "Missing user data";
    }

    const kitsuStatus = mapStatus(status);

    const response = await this.#client.get(
      `library-entries?filter[kind]=anime&filter[userId]=${
        this.#userId
      }&filter[status]=${kitsuStatus}&include=anime,anime.streamingLinks,anime.genres&page[limit]=${limit}&page[offset]=${
        limit * page
      }`
    );

    const items = response.data.data.map((entry) =>
      KitsuProvider.#mapLibraryItem(entry, response.data.included)
    );

    return new PagedData({
      data: items,
      page,
      limit,
      total: response.data.meta.statusCounts[kitsuStatus],
    });
  }
  /**
   * Get a single library entry for the current user.
   * @param {string} animeId The id of the anime series to search for.
   * @returns {Promise<LibraryEntry>} A library entry containing the user's current watch status.
   */
  async getSingleLibraryEntry(animeId) {
    if (!this.#userId) {
      throw "Missing user data";
    }

    const response = await this.#client.get(
      `library-entries/${animeId}?include=anime,anime.streamingLinks,anime.genres`
    );

    return KitsuProvider.#mapLibraryItem(
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

      return new LibraryEntry({
        anime,
      });
    }

    return KitsuProvider.#mapLibraryItem(
      response.data.data[0],
      response.data.included
    );
  }

  async updateLibraryItem(itemId, patch) {
    const attributes = _.flow(
      omitBy(_.isUndefined),
      omitBy(_.isNaN)
    )({
      status: mapStatus(patch.status),
      progress: patch.progress,
      notes: patch.notes,
      startedAt: patch.startDate?.toISOString() ?? undefined,
      finishedAt: patch.completedDate?.toISOString() ?? undefined,
      ratingTwenty: patch.rating * 2,
    });

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
    const response = await this.#client.get(
      `anime?filter[id]=${animeId}&include=streamingLinks,genres`
    );

    if (response.data.meta.count < 1) {
      return null;
    }

    const anime = response.data.data[0];
    return new AnimeSeries({
      ...anime,
      streamingLinks: KitsuProvider.#getStreamingLinks(
        anime,
        response.data.included
      ),
      provider: PROVIDERS.KITSU,
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

  async #setTokenResponse(response) {
    this._setAuthToken(
      response.data["access_token"],
      response.data["created_at"] + response.data["expires_in"]
    );
    this._setRefreshToken(response.data["refresh_token"]);
  }

  static #mapLibraryItem(entry, included = []) {
    let anime = included.find(
      (inc) =>
        inc.type === "anime" && inc.id === entry.relationships.anime.data.id
    );

    anime = {
      ...anime,
      streamingLinks: KitsuProvider.#getStreamingLinks(anime, included),
      genres: KitsuProvider.#getGenres(anime, included),
    };

    return new LibraryEntry({
      ...entry,
      provider: PROVIDERS.KITSU,
      anime,
    });
  }

  static #getStreamingLinks(anime, included = []) {
    return anime
      ? anime.relationships.streamingLinks.data
          ?.map((link) =>
            included.find(
              (inc) => inc.type === "streamingLinks" && inc.id === link.id
            )
          )
          ?.filter((item) => !!item)
          ?.map((link) => link.attributes.url) ?? []
      : [];
  }

  static #getGenres(anime, included = []) {
    return anime.relationships.genres.data
      .map(
        (genre) =>
          included.find((inc) => inc.type === "genres" && inc.id === genre.id)
            ?.attributes?.name
      )
      .filter((genre) => !!genre);
  }
}
