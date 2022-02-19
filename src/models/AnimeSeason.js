import _ from "lodash";
import { SERVICES } from "../enums";

export default class AnimeSeason {
  constructor(data = {}) {
    switch (data.service) {
      case SERVICES.CRUNCHYROLL:
        this.#mapFromCrunchyroll(data);
        return;
    }

    _.defaultsDeep(this, data, DEFAULT_VALUES);
  }

  /**
   * @returns {string} The season id.
   */
  get id() {
    return this._id;
  }

  /**
   * @returns {string} The name of the season;
   */
  get name() {
    return this._name;
  }

  /**
   * @returns {number} The season number.
   */
  get number() {
    return this._number;
  }

  /**
   * @returns {boolean} True if the season is currently being simulcast.
   * */
  get isAiring() {
    return this._isAiring;
  }

  #mapFromCrunchyroll(data) {
    _.defaultsDeep(
      this,
      {
        _id: data.id,
        _name: data.title,
        _number: data.season_number,
        _isAiring: data.is_simulcast,
      },
      DEFAULT_VALUES
    );
  }
}

const DEFAULT_VALUES = {
  _id: 0,
  _name: "",
  _number: 0,
  _isAiring: false,
};
