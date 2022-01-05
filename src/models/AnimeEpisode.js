import _ from "lodash";
import AnimeSeason from "./AnimeSeason";
import { SERVICES } from "../enums";

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
    return this.id;
  }

  /**
   * @returns {string} The episode title.
   */
  get title() {
    return this.title;
  }

  /**
   * @returns {string} The episode description.
   */
  get description() {
    return this.description;
  }

  /**
   * @returns {number} The episode number.
   */
  get number() {
    return this.number;
  }

  /**
   * @returns {number} The duration of the episode in ms.
   */
  get duration() {
    return this.duration;
  }

  /**
   * @returns {AnimeSeason} The anime season data.
   */
  get season() {
    return this.season;
  }

  /**
   * @returns {Date} The date and time the episode aired.
   */
  get airDate() {
    return new Date(this.airDate);
  }

  #populateFromCrunchyroll(data) {
    _.defaultsDeep(
      this,
      {
        id: data.id,
        title: data.title,
        description: data.description,
        number: data.episode_metadata.episode_number,
        duration: data.episode_metadata.duration_ms,
        season: new AnimeSeason({
          id: data.episode_metadata.season_id,
          number: data.episode_metadata.season_number,
          name: data.episode_metadata.season_title,
        }),
        airDate: data.episode_metadata.episode_air_date,
      },
      DEFAULT_VALUES
    );
  }
}

const DEFAULT_VALUES = {
  id: "0",
  title: "",
  description: "",
  number: 0,
  duration: 0,
  season: {
    id: "0",
    number: 1,
    name: "",
  },
  airDate: "",
};
