import _ from "lodash";

export default class AnimeSeason {
  constructor(data = {}) {
    _.defaultsDeep(this, data, DEFAULT_VALUES);
  }

  /**
   * @returns {string} The season id.
   */
  get id() {
    return this.id;
  }

  /**
   * @returns {string} The name of the season;
   */
  get name() {
    return this.name;
  }

  /**
   * @returns {number} The season number.
   */
  get number() {
    return this.number;
  }
}

const DEFAULT_VALUES = {
  id: 0,
  name: "",
  number: 0,
};
