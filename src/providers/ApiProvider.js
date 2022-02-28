import browser from "webextension-polyfill";
import UserData from "../models/UserData";
import { PROVIDERS } from "../enums";

/* istanbul ignore next */
export default class ApiProvider {
  /**
   * @returns {Promise<number>} The selected provider.
   * @see providers enum
   */
  static async getSelectedProvider() {
    const result = await browser.storage.local.get({
      selected_provider: PROVIDERS.UNSELECTED,
    });
    return result["selected_provider"];
  }

  /**
   * Get the user's anime list.
   * @returns {Promise<Library>} The user's library.
   */
  async getAnimeList() {
    return ApiProvider.#defaultImplAsync();
  }

  /**
   * Gets the user's anime list for a given status.
   * @param status {number} The anime status from the LIST_STATUS enum.
   * @param page {number} Which page number to grab for, starting from 0.
   * @param sort {string} The field to sort by.
   * @param sortBy {string} asc or desc (Ascending or descending sort).
   * @returns {Promise<[LibraryEntry]>} The list of library entries.
   */
  async getAnimeListByStatus() {
    return ApiProvider.#defaultImplAsync();
  }

  /**
   * Get a single library entry for the current user.
   * @param {string} animeId The id of the anime series to search for.
   * @returns {Promise<LibraryEntry>} A library entry containing the user's current watch status.
   */
  async getSingleLibraryEntry() {
    return ApiProvider.#defaultImplAsync();
  }

  /**
   * Updates an anime library entry with a given patch document.
   * @param {string|number} itemId The library entry id.
   * @param {object} patch The patch data.
   * @returns {Promise<*>} The update promise.
   * @see LibraryEntry for valid parameters.
   */
  async updateLibraryItem() {
    return ApiProvider.#defaultImplAsync();
  }

  /**
   * @returns Removes an item from the user's anime list.
   * @param {string|number} itemId The library entry id.
   * @returns {Promise<*>} The delete promise.
   */
  async removeLibraryItem() {
    return ApiProvider.#defaultImplAsync();
  }

  /**
   * Find an anime from the api.
   * @param {string} text The search text.
   * @param {number} page The page to load.
   * @param {number} limit The number per page.
   * @returns {[AnimeSeries]} The list of found series.
   */
  async findAnime() {
    return ApiProvider.#defaultImplAsync();
  }

  /**
   * Resolves a library entry from an anime episode object retrieved from a streaming service.
   * @param {AnimeEpisode} animeEpisode The anime episode to resolve from
   * @returns {LibraryEntry} The library entry and series information corresponding to the anime episode.
   */
  async resolveLibraryEntryFromAnimeEpisode() {
    return ApiProvider.#defaultImplAsync();
  }

  /**
   * Gets data about the currently authenticated user.
   * @returns {Promise<UserData>} A promise containing data about the current user.
   */
  async getUserData() {
    const data = await browser.storage.local.get({ userData: null });
    return new UserData(data.userData);
  }

  async fetchUserData(info) {
    return browser.storage.local.set({
      userData: info,
    });
  }

  /**
   * Authorize with the API.
   * @param username {string} The username to use.
   * @param password {string} The password to use.
   * @returns {Promise<boolean>} True on success.
   */
  authorize() {
    return ApiProvider.#defaultImplAsync();
  }

  /**
   * Refreshes the bearer token using the token saved in storage.
   * @returns {Promise<boolean>} True on success.
   * @throws
   */
  refresh() {
    return ApiProvider.#defaultImplAsync();
  }

  /**
   * Check if the access token is about to expire.
   * @returns {Promise<boolean>} Returns true if the token should be refreshed.
   */
  async shouldRefresh() {
    const data = await browser.storage.local.get({
      access_token_expires_on: null,
    });
    const expirationDate = data["access_token_expires_on"];
    return (
      expirationDate != null &&
      new Date().getTime() / 1000 > data["access_token_expires_on"] - 600
    );
  }

  /**
   * Check whether the user is authenticated.
   * @returns {Promise<boolean>} True if the user is signed in.
   */
  async isAuthenticated() {
    return !!(await this.getAuthToken());
  }

  /**
   * Signs the user out of the api provider.
   * @returns {Promise<void>}
   */
  async signOut() {
    await browser.storage.local.remove([
      "selected_provider",
      "access_token",
      "refresh_token",
      "access_token_expires_on",
      "userData",
    ]);
  }

  /**
   * @returns {Promise<string>} The bearer token used to authenticate.
   */
  async getAuthToken() {
    const result = await browser.storage.local.get({ access_token: null });
    return result["access_token"];
  }

  /**
   * @returns {Promise<string>} The current refresh token.
   */
  async getRefreshToken() {
    const result = await browser.storage.local.get({ refresh_token: null });
    return result["refresh_token"];
  }

  /**
   * Sets the api provider to use.
   * @param {number} provider The provider from the providers enum.
   * @see providers enum.
   */
  async _setProvider(provider) {
    await browser.storage.local.set({ selected_provider: provider });
  }

  /**
   * Sets the auth token data to local storage.
   * @param {string} token The auth token to set.
   * @param {number} expirationTick The time, in ticks, when the token will expire and need to be refreshed.
   */
  async _setAuthToken(token, expirationTick) {
    await browser.storage.local.set({
      access_token: token,
      access_token_expires_on: expirationTick,
    });
  }

  /**
   * Sets the refresh token to local storage.
   * @param {string} token The refresh token to set.
   */
  async _setRefreshToken(token) {
    await browser.storage.local.set({ refresh_token: token });
  }

  /**
   *
   * @param {import("axios").AxiosRequestConfig} config
   * @returns {Promise<import("axios").AxiosRequestConfig>}
   */
  async _requestInterceptor(config) {
    if (await this.shouldRefresh()) {
      await this.refresh();
    }

    const token = await this.getAuthToken();
    if (!token) {
      throw Error("Call authorize before making a request.");
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }

  static #defaultImplAsync() {
    return Promise.reject("Not implemented");
  }
}
