import _ from "lodash";
import AnimeSeries from "./AnimeSeries";
import { LIST_STATUS, PROVIDERS } from "../enums";
import { STATUS_MAP as KITSU_STATUSES } from "../providers/KitsuProvider";

/**
 * An entry in the user's anime library.
 */
export default class LibraryEntry {
  constructor(data = {}) {
    switch (data.provider) {
      case PROVIDERS.KITSU:
        this.#mapFromKitsu(data);
        break;

      default:
        _.defaultsDeep(this, data, DEFAULT_VALUES);
        break;
    }
  }

  /**
   * @returns {string|number} The library entry id.
   */
  get id() {
    return this._id;
  }

  /**
   * @returns {number} The user's watch status.
   * @see LIST_STATUS
   */
  get status() {
    return this._status;
  }

  /**
   * @returns {number} The latest watched episode number.
   */
  get progress() {
    return this._progress;
  }

  /**
   * @returns {string} The user's watch notes.
   */
  get notes() {
    return this._notes;
  }

  /**
   * @returns {Date?} The date the user started the series.
   */
  get startDate() {
    return this._startDate;
  }

  /**
   * @returns {Date?} The date the user completed the series.
   */
  get completedDate() {
    return this._completedDate;
  }

  get rewatchCount() {
    return this._rewatchCount;
  }

  /**
   * @returns {Date?} The last time the user updated the library entry.
   */
  get lastUpdated() {
    return this._lastUpdated;
  }

  /**
   * @returns {number} The user's rating, from 1-10.
   */
  get rating() {
    return this._rating;
  }

  /**
   * @returns {AnimeSeries} The series this entry relates to.
   */
  get anime() {
    return this._anime;
  }

  #mapFromKitsu(data) {
    _.defaultsDeep(
      this,
      {
        _id: data.id,
        _status: KITSU_STATUSES[data.attributes.status],
        _progress: data.attributes.progress,
        _notes: data.attributes.notes,
        _startDate: data.attributes.startedAt
          ? new Date(data.attributes.startedAt)
          : null,
        _completedDate: data.attributes.finishedAt
          ? new Date(data.attributes.finishedAt)
          : null,
        _rewatchCount: data.attributes.reconsumeCount,
        _lastUpdated: data.attributes.progressedAt
          ? new Date(data.attributes.progressedAt)
          : null,
        _rating: data.attributes.ratingTwenty / 2,
        _anime: Object.prototype.hasOwnProperty.call(data, "anime")
          ? new AnimeSeries({
              ...data.anime,
              provider: PROVIDERS.KITSU,
            })
          : null,
      },
      DEFAULT_VALUES
    );
  }
}

const DEFAULT_VALUES = {
  _id: 0,
  _status: LIST_STATUS.NOT_WATCHING,
  _progress: 0,
  _notes: "",
  _startDate: null,
  _completionDate: null,
  _rewatchCount: 0,
  _lastUpdated: null,
  _rating: 0,
  _anime: new AnimeSeries(),
};
