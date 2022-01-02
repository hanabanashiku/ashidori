import _ from "lodash";
import { PROVIDERS } from "../enums";

export default class UserData {
  constructor(data = {}) {
    switch (data.provider) {
      case PROVIDERS.KITSU:
        this.#populateFromKitsu(data);
        break;

      default:
        _.defaultsDeep(this, {}, defaults);
    }
    this.#populateFromKitsu(data);
  }

  get id() {
    return this.id;
  }

  get name() {
    return this.name;
  }

  get url() {
    return this.url;
  }

  get avatarUrl() {
    return this.avatarUrl;
  }

  #populateFromKitsu(data) {
    const user = data.data[0];

    _.defaultsDeep(this, {
      id: user.id,
      name: user.attributes.name,
      url: user.links.self,
      avatarUrl: `https://kitsu.io/users/${user.attributes.slug}`,
    });
  }
}

const defaults = {
  id: 0,
  name: "",
  url: "",
  avatarUrl: "",
};
