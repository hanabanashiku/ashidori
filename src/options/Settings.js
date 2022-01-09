import browser from "webextension-polyfill";
import { SERVICES, NOTIFY_EPSIODE_ANSWERS } from "../enums";

const DEFAULT_SERVICES = Object.values(SERVICES);

/**
 * A manager for handling setting stored in local storage.
 */
export default class Settings {
  /**
   * Get a list of enabled anime service integrations.
   * @returns {Promise<[number]>} A promise that returns a list of enabled services.
   * @see SERVICES
   */
  static async getEnabledServices() {
    return this.#getStoredKey("enabled_services", DEFAULT_SERVICES);
  }

  /**
   * Set the list of enabled anime service integrations.
   * @param {[number]} services The list of services.
   * @returns {Promise<void>}
   * @see SERVICES
   */
  static async setEnabledServices(services) {
    return this.#setStoredKey("enabled_services", services);
  }

  /**
   * Check if a particular anime service integration is enabled.
   * @param {number} service The service to check.
   * @returns {Promise<boolean>} True if the integration is enabled.
   * @see SERVICES
   */
  static async isServiceEnabled(service) {
    const providers = await this.getEnabledServices();
    return providers.includes(service);
  }

  /**
   * Get the number of minutes that should be waited before triggering an update.
   * @returns {Promise<number>} A number of minutes.
   */
  static async shouldUpdateAfterMinutes() {
    return this.#getStoredKey("update_delay", 10);
  }

  /**
   * Set the number of minutes that should be waited before triggering an update.
   * @param {string|number} value
   * @returns {Promise<void>}
   */
  static async setShouldUpdateAfterMinutes(value) {
    return this.#setStoredKey("update_delay", parseFloat(value));
  }

  /**
   * Check if it is safe to automatically update an anime episode count after watching.
   * @returns {Promise<boolean>} A promise that returns true if the popup should be shown.
   */
  static async shouldShowUpdatePopup() {
    return this.#getStoredKey("enable_update_popup", true);
  }

  /**
   * Enable or disable the popup to prompt the user to update the current episode count after watching an episode.
   * @param {boolean} value Whether to show the confirmation popup.
   * @returns {Promise<void>}
   */
  static async setShouldShowUpdatePopup(value) {
    return this.#setStoredKey("enable_update_popup", value);
  }

  /**
   * Check whether or not to send a notification when a new episode is released.
   * @returns {Promise<number>} The answer to the setting.
   * @see NOTIFY_EPISODE_ANSWERS
   */
  static async shouldNotifiyForNewEpisodes() {
    return this.#getStoredKey(
      "should_notify_for_new_episodes",
      NOTIFY_EPSIODE_ANSWERS.LATEST
    );
  }

  /**
   * Enable or disable notifications for new episodes on watch list.
   * @param {number} value The setting answer.
   * @returns {Promise<void>}
   * @see NOTIFY_EPISODE_ANSWERS
   */
  static async setNotifiyForNewEpisodes(value) {
    return this.#setStoredKey("should_notify_for_new_episodes", value);
  }

  static async #getStoredKey(key, defaultValue) {
    const request = {};
    request[key] = defaultValue;
    const result = await browser.storage.sync.get(request);
    return result[key];
  }

  static async #setStoredKey(key, value) {
    const request = {};
    request[key] = value;
    return browser.storage.sync.set(request);
  }
}
