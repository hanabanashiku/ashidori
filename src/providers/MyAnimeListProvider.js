import _ from "lodash";
import { omitBy } from "lodash/fp";
import browser from "webextension-polyfill";
import axios from "axios";
import ApiProvider from "./ApiProvider";
import { createApiInstance } from "./builder";
import Settings from "../options/Settings";
import UserData from "../models/UserData";
import { PROVIDERS, LIST_STATUS } from "../enums";
import { getHttpAdapter, generateRandomString } from "./helper";
import { getPkce, setPkce } from "../helpers/storageHelpers";
import PagedData from "../models/PagedData";
import LibraryEntry from "../models/LibraryEntry";

const MAL_BASE_URL = "https://api.myanimelist.net/v2";
const MAL_AUTH_URL = "https://myanimelist.net/v1/oauth2/authorize";
const MAL_TOKEN_URL = "https://myanimelist.net/v1/oauth2/token";
const CLIENT_ID = "e62f583191ca06e8a96bd8fc66769c09";

const anime_fields =
  "id,title,alternative_titles,status,start_date,end_date,synopsis,genres,media_type,num_episodes,average_episode_duration";
const library_entry_fields =
  "start_date,finish_date,priority,num_times_rewatched,rewatch_value,tags,comments";

export const STATUS_MAP = {
  watching: LIST_STATUS.CURRENT,
  completed: LIST_STATUS.COMPLETED,
  on_hold: LIST_STATUS.ON_HOLD,
  dropped: LIST_STATUS.DROPPED,
  plan_to_watch: LIST_STATUS.PLANNED,
};

function mapStatusToMalStatus(status) {
  return Object.keys(STATUS_MAP).find((key) => STATUS_MAP[key] === status);
}

export default class MyAnimeListProvider extends ApiProvider {
  #client = null;
  #userId;

  constructor() {
    super();

    this.#client = axios.create({
      baseURL: MAL_BASE_URL,
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      },
      adapter: getHttpAdapter(),
    });
    this.#client.interceptors.request.use(async (config) => {
      return this._requestInterceptor(config);
    });
    this._setProvider(PROVIDERS.MY_ANIME_LIST);

    this.getUserData().then((data) => {
      const userId = data?.id ?? null;
      this.#userId = userId;
    });
  }

  /**
   * Gets the user's anime list for a given status.
   * @param status {number} The anime status from the LIST_STATUS enum.
   * @param page {number} Which page number to grab for, starting from 0.
   * @param limit {number} The number of items per page.
   * @param sort {string} The name of the field to sort by.
   * @param sortBy {string} Not implemented by the MyAnimeList API at this time. Left here for contractual reasons.
   * @returns {Promise<PagedData<LibraryEntry>>]} The list of library entries.
   */
  async getAnimeListByStatus(
    status,
    page = 0,
    limit = 20,
    sort = null,
    // eslint-disable-next-line no-unused-vars
    sortBy = "asc"
  ) {
    if (!Object.values(STATUS_MAP).includes(status)) {
      return new PagedData({
        data: [],
      });
    }

    const fields = `fields=node(${anime_fields}),list_status{${library_entry_fields}}`;
    const sortString = MyAnimeListProvider.#mapSort(sort);

    const response = await this.#client.get(
      `/users/@me/animelist?status=${mapStatusToMalStatus(status)}&${fields}${
        (sortString && `&sort=${sortString}`) || ""
      }&limit=${limit}%offset=${limit * page}`
    );

    const items = response.data.data.map((entry) =>
      MyAnimeListProvider.#mapData(LibraryEntry, entry)
    );

    return new PagedData({
      data: await Promise.all(items),
      page,
      limit,
      // a cheap guess to keep pagination working - MAL doesn't send a total...
      total: items.length + (response.data.paging.next ? limit : 0),
    });
  }

  /**
   * Get a single library entry for the current user.
   * @param {string} entryId The id of the anime.
   * @returns {Promise<LibraryEntry>} A library entry containing the user's current watch status.
   */
  async getSingleLibraryEntry(entryId) {
    const response = await this.#client.get(
      `/anime/${entryId}?fields=${anime_fields},my_list_status{${library_entry_fields}}`
    );

    return MyAnimeListProvider.#mapData(LibraryEntry, {
      node: response.data,
      list_status: response.data.my_list_status,
    });
  }

  /**
   * Get a single library entry for the current user.
   * @param {string} animeId The id of the anime series to search for.
   * @returns {Promise<LibraryEntry>} A library entry containing the user's current watch status.
   */
  async getSingleLibraryEntryByAnime(animeId) {
    // The library entry id key is the username + the anime id,
    // so these calls are synonymous for MAL.
    return this.getSingleLibraryEntry(animeId);
  }

  /**
   * Resolves a library entry from an anime episode object retrieved from a streaming service.
   * @param {AnimeEpisode} animeEpisode The anime episode to resolve from
   * @returns {LibraryEntry} The library entry and series information corresponding to the anime episode.
   */
  async resolveLibraryEntryFromAnimeEpisode(animeEpisode) {
    super.resolveLibraryEntryFromAnimeEpisode(animeEpisode);
  }

  async createLibraryItem(animeId, patch) {
    // In the MAL API, PATCH functions as an upsert.
    // Additionally, the key is simply the username + anime id
    // so we can pass in the animeId as the itemId directly.
    return this.updateLibraryItem(animeId, patch);
  }

  async updateLibraryItem(itemId, patch) {
    const data = MyAnimeListProvider.#createPatch(patch);
    const params = new URLSearchParams();

    for (const key in data) {
      params.append(key, data[key]);
    }

    return this.#client.patch(`/anime/${itemId}/my_list_status`, params);
  }

  async removeLibraryItem(itemId) {
    return this.#client.delete(`/anime/${itemId}/my_list_status`);
  }

  static async authorize() {
    const pkce = generateRandomString(128);
    await setPkce(pkce);
    let url = MAL_AUTH_URL;
    url += "?response_type=code";
    url += `&client_id=${CLIENT_ID}`;
    url += "&scope=write:users";
    url += `&redirect_uri=${browser.identity.getRedirectURL()}`;
    url += `&code_challenge=${pkce}`;
    url += "&code_challenge_method=plain";

    const href = await browser.identity.launchWebAuthFlow({
      interactive: true,
      url,
    });

    const api = createApiInstance(PROVIDERS.MY_ANIME_LIST);

    return api.authorizeCallback(href);
  }

  async authorizeCallback(href) {
    const recievedParams = new URLSearchParams(href.split("?")[1]);

    const params = new URLSearchParams();
    params.append("client_id", CLIENT_ID);
    params.append("code", recievedParams.get("code"));
    params.append("code_verifier", await getPkce());
    params.append("grant_type", "authorization_code");
    params.append("redirect_uri", browser.identity.getRedirectURL());

    let response;
    try {
      response = await axios.post(MAL_TOKEN_URL, params);
    } catch (e) {
      return Promise.reject();
    }

    await this.#setTokenResponse(response);
    return this.fetchUserData();
  }

  async refresh() {
    const token = this.getRefreshToken();
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", await token);

    try {
      const response = await axios.post(MAL_TOKEN_URL, params);
      await this.#setTokenResponse(response);
      return true;
    } catch {
      throw "Unalve to authenticate. Check refresh token.";
    }
  }

  async fetchUserData() {
    try {
      const response = await this.#client.get("/users/@me");
      const userData = new UserData({
        ...response.data,
        provider: PROVIDERS.MY_ANIME_LIST,
      });
      await super.fetchUserData(userData);
      this.#userId = response.data.id;
      return userData;
    } catch (e) {
      throw new Error("Unable to get user info.");
    }
  }

  static #createPatch(patch) {
    // For MAL, start date and end date are automatic.
    return _.flow(
      omitBy(_.isUndefined),
      omitBy(_.isNaN)
    )({
      status: mapStatusToMalStatus(patch.status),
      score: patch.rating,
      num_watched_episodes: patch.progress,
      num_times_rewatched: patch.rewatchCount,
      comments: patch.notes,
    });
  }

  async #setTokenResponse(response) {
    const token = response.data.access_token;
    const refresh = response.data.refresh_token;
    const expiresAt =
      ((new Date().getTime() / 1000) | 0) + Number(response.data.expires_in);

    return Promise.all([
      this._setAuthToken(token, expiresAt),
      this._setRefreshToken(refresh),
    ]);
  }

  static async #mapData(type, data) {
    const titleLanguagePreference = Settings.getTitleLanguagePreference();
    return new type({
      ...data,
      provider: PROVIDERS.MY_ANIME_LIST,
      __langPref: await titleLanguagePreference,
    });
  }

  static #mapSort(field) {
    if (!field) {
      return null;
    }

    switch (field) {
      case "rating":
        return "list_score";
      case "lastUpdated":
        return "list_updated_at";
      case "title":
        return "anime_title";
      case "startDate":
        return "anime_start_date";
      default:
        return null;
    }
  }
}
