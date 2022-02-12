import _ from "lodash";
import AnimeSeason from "./AnimeSeason";
import { SERVICES } from "../enums";
import AnimeSeries from "./AnimeSeries";

/**
 * A model representing a single episode of an anime series.
 */
export default class AnimeEpisode {
  constructor(data = {}) {
    switch (data.service) {
      case SERVICES.CRUNCHYROLL:
        this.#populateFromCrunchyroll(data);
        break;
      default:
        _.defaultsDeep(this, data, DEFAULT_VALUES);
    }
  }

  /**
   * @returns {string} The episode id.
   */
  get id() {
    return this._id;
  }

  /**
   * @returns {string} The episode title.
   */
  get title() {
    return this._title;
  }

  /**
   * @returns {string} The episode description.
   */
  get description() {
    return this._description;
  }

  /**
   * @returns {number} The episode number.
   */
  get number() {
    return this._number;
  }

  /**
   * @returns {number} The duration of the episode in ms.
   */
  get duration() {
    return this._duration;
  }

  /**
   * @returns {AnimeSeason} The anime season data.
   */
  get season() {
    return this._season;
  }

  /**
   * @returns {AnimeSeries} The anime series data.
   */
  get series() {
    return this._series;
  }

  /**
   * @returns {Date} The date and time the episode aired.
   */
  get airDate() {
    return this._airDate;
  }

  #populateFromCrunchyroll(episode) {
    const { episode_metadata } = episode;

    _.defaultsDeep(
      this,
      {
        _id: episode.id,
        _title: episode.title,
        _description: episode.description,
        _number: episode_metadata.episode_number,
        _duration: episode_metadata.duration_ms,
        _airDate: new Date(episode_metadata.episode_air_date),
        _season: episode.season,
        _series: episode.series,
      },
      DEFAULT_VALUES
    );
  }
}

const DEFAULT_VALUES = {
  _id: "0",
  _title: "",
  _description: "",
  _number: 0,
  _duration: 0,
  _season: new AnimeSeason(),
  _series: new AnimeSeries(),
  _airDate: null,
};
