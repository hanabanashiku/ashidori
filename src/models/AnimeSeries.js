import _ from "lodash";
import { PROVIDERS, ANIME_STATUS } from "../enums";

/**
 * An anime series.
 */
export default class AnimeSeries {
  constructor(data = {}) {
    switch (data.provider) {
      case PROVIDERS.KITSU:
        this.#mapFromKitsu(data);
        break;

      default:
        _.defaultsDeep(this, data, DEFAULT_VALUES);
    }
  }

  /**
   * @returns {number|string} The series id.
   */
  get id() {
    return this._id;
  }

  /**
   * @returns {string} The title of the series.
   */
  get title() {
    return this._title;
  }

  /**
   * @returns {string} The translated title of the series.
   */
  get englishTitle() {
    return this._englishTitle;
  }

  /**
   * @returns {string} The synopsis of the series.
   */
  get description() {
    return this._description;
  }

  /**
   * @returns {Date} The date the series started airing.
   */
  get startDate() {
    return this._startDate;
  }

  /**
   * @returns {Date?} The date the series finished airing.
   */
  get endDate() {
    return this._endDate;
  }

  /**
   * @returns {number} The airing status of the series.
   * @see ANIME_STATUS
   */
  get status() {
    return this._status;
  }

  /**
   * @returns {number} The number of episodes.
   */
  get episodeCount() {
    return this._episodeCount;
  }

  /**
   * @returns {number} The number of minutes per episode.
   */
  get episodeLength() {
    return this._episodeLength;
  }

  #mapFromKitsu(data) {
    _.defaultsDeep(
      this,
      {
        _id: data.id,
        _title: data.attributes.canonicalTitle,
        _englishTitle: data.attributes.titles.en,
        _description: data.attributes.synopsis,
        _startDate: new Date(data.attributes.startDate),
        _endDate: data.attributes.endDate
          ? new Date(data.attributes.endDate)
          : null,
        _status: KITSU_ANIME_STATUS[data.attributes.status],
        _episodeCount: data.attributes.episodeCount,
        _episodeLength: data.attributes.episodeLength,
        _streamingLinks: {}, // todo
      },
      DEFAULT_VALUES
    );
  }
}

const DEFAULT_VALUES = {
  _id: 0,
  _title: "",
  _englishTitle: "",
  _description: "",
  _startDate: null,
  _endDate: null,
  _status: ANIME_STATUS.ANNOUNCED,
  _episodeCount: 0,
  _episodeLength: 0,
  _streamingLinks: {},
};

const KITSU_ANIME_STATUS = {
  current: ANIME_STATUS.AIRING,
  finished: ANIME_STATUS.FINISHED,
  tba: ANIME_STATUS.ANNOUNCED,
  unreleased: ANIME_STATUS.UNRELEASED,
  upcoming: ANIME_STATUS.UPCOMING,
};
