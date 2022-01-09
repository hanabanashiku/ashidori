import _ from "lodash";

export default class AnimeSeason {
  constructor(data = {}) {
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
}

const DEFAULT_VALUES = {
  _id: 0,
  _name: "",
  _number: 0,
};
