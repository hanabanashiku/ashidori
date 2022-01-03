import _ from "lodash";
import { PROVIDERS } from "../enums";

export default class UserData {
  constructor(data = {}) {
    if (Object.prototype.hasOwnProperty.call(data, "_id")) {
      this.#populateFromLocalStorage(data);
      return;
    }

    switch (data.provider) {
      case PROVIDERS.KITSU:
        this.#populateFromKitsu(data);
        break;

      default:
        _.defaultsDeep(this, {}, defaults);
    }
    this.#populateFromKitsu(data);
  }

  /**
   * @returns {number} The user id of the authenticated user.
   */
  get id() {
    return this._id;
  }

  /**
   * @returns {string} The username of the authenticated user.
   */
  get username() {
    return this._name;
  }

  /**
   * @returns {string} The url of the user's profile.
   */
  get url() {
    return this._url;
  }

  /**
   * @returns {string} The url of the user's avatar image.
   */
  get avatarUrl() {
    return this._avatarUrl;
  }

  /**
   * @returns {number} The API provider for the user data.
   * @see PROVIDERS
   */
  get apiSource() {
    return this._provider;
  }

  #populateFromLocalStorage(data) {
    _.defaultsDeep(this, data, defaults);
  }

  #populateFromKitsu(data) {
    const user = data.data[0];

    _.defaultsDeep(this, {
      _provider: PROVIDERS.KITSU,
      _id: user.id,
      _name: user.attributes.name,
      _url: user.links.self,
      _avatarUrl: `https://kitsu.io/users/${user.attributes.slug}`,
    });
  }
}

const defaults = {
  _id: 0,
  _name: "",
  _url: "",
  _avatarUrl: "",
};
