import _ from "lodash";
import { PROVIDERS, ANIME_STATUS, SERVICES } from "../enums";

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
   * @returns {string} The cover image of the series.
   */
  get coverImageUrl() {
    return this._coverImage;
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
   * @returns {string} The season the show was released in.
   */
  get startSeason() {
    let year = this.startDate.getFullYear();
    const month = this.startDate.getMonth();
    let season;

    if (month > 11 || month < 4) {
      season = "Winter";
      if (month === 12) year += 1;
    } else if (month >= 4 && month < 6) {
      season = "Spring";
    } else if (month >= 6 && month < 9) {
      season = "Summer";
    } else {
      season = "Fall";
    }

    return `${season} ${year}`;
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

  /**
   * @returns {[string]} A list of genres for the anime.
   */
  get genres() {
    return this._genres;
  }

  /**
   * @returns {string} A link to open the series on the list website.
   */
  get externalLink() {
    return this._link;
  }

  #mapFromKitsu(data) {
    _.defaultsDeep(
      this,
      {
        _id: data.id,
        _title: data.attributes.canonicalTitle,
        _englishTitle: data.attributes.titles.en,
        _description: data.attributes.synopsis,
        _coverImage: data.attributes.posterImage?.tiny,
        _startDate: new Date(data.attributes.startDate),
        _endDate: data.attributes.endDate
          ? new Date(data.attributes.endDate)
          : null,
        _status: KITSU_ANIME_STATUS[data.attributes.status],
        _episodeCount: data.attributes.episodeCount,
        _episodeLength: data.attributes.episodeLength,
        _genres: data.genres,
        _streamingLinks: this.#mapStreamingLinks(data.streamingLinks),
        _link: `https://kitsu.io/anime/${data.id}`,
      },
      DEFAULT_VALUES
    );
  }

  #mapStreamingLinks(links = []) {
    const result = {};
    const regex = /([a-zA-Z-]+\.(com|net|org|io|tv))/g;

    for (const link of links) {
      const url = link.attributes.url;
      const domain = regex.exec(url)?.[1];
      if (
        !domain ||
        !Object.prototype.hasOwnProperty.call(SERVICE_DOMAINS, domain)
      ) {
        continue;
      }

      result[SERVICE_DOMAINS[domain]] = url;
    }

    return result;
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
  _seasonCount: 0,
  _genres: [],
  _streamingLinks: {},
  _link: "about:blank",
};

const KITSU_ANIME_STATUS = {
  current: ANIME_STATUS.AIRING,
  finished: ANIME_STATUS.FINISHED,
  tba: ANIME_STATUS.ANNOUNCED,
  unreleased: ANIME_STATUS.UNRELEASED,
  upcoming: ANIME_STATUS.UPCOMING,
};

const SERVICE_DOMAINS = {
  "crunchyroll.com": SERVICES.CRUNCHYROLL,
  "funimation.com": SERVICES.FUNIMATION,
  "hulu.com": SERVICES.HULU,
  "hidive.com": SERVICES.HIDIVE,
  "netflix.com": SERVICES.NETFLIX,
  "tubitv.com": SERVICES.TUBITV,
  "amazon.com": SERVICES.AMAZON_PRIME,
};
