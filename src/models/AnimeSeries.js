import _ from "lodash";
import { PROVIDERS, ANIME_STATUS, SERVICES } from "../enums";
import lang from "lang";

/**
 * An anime series.
 */
export default class AnimeSeries {
  constructor(data = {}) {
    switch (data.service) {
      case SERVICES.CRUNCHYROLL:
        this.#mapFromCrunchyroll(data);
        return;
    }

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
    if (!this.startDate) {
      return "";
    }

    let year = this.startDate.getFullYear();
    const month = this.startDate.getMonth() + 1;
    let season;

    if (month >= 1 && month < 4) {
      season = lang.winter;
    } else if (month >= 4 && month < 7) {
      season = lang.spring;
    } else if (month >= 7 && month < 10) {
      season = lang.summer;
    } else {
      season = lang.fall;
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
   * @returns {number} The number of seasons.
   */
  get seasonCount() {
    return this._seasonCount;
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

  /**
   * @returns {object} A dictionary of Providers to links.
   */
  get streamingLinks() {
    return this._streamingLinks;
  }

  #mapFromKitsu(data) {
    const streamingLinks =
      data.relationships.streamingLinks.data
        ?.map((link) =>
          data.included.find(
            (inc) => inc.type === "streamingLinks" && inc.id === link.id
          )
        )
        ?.filter((item) => !!item)
        ?.map((link) => link.attributes.url) ?? [];

    const genres =
      data.relationships.genres.data
        ?.map(
          (genre) =>
            data.included.find(
              (inc) => inc.type === "genres" && inc.id === genre.id
            )?.attributes?.name
        )
        .filter((genre) => !!genre) ?? [];

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
        _genres: genres,
        _streamingLinks: this.#mapStreamingLinks(streamingLinks),
        _link: `https://kitsu.io/anime/${data.id}`,
      },
      DEFAULT_VALUES
    );
  }

  #mapFromCrunchyroll(data) {
    _.defaultsDeep(
      this,
      {
        _id: data.id,
        _title: data.title,
        _englishTitle: data.title,
        _description: data.description,
        _coverImage: data.images.poster_tall?.[0]?.[0]?.source,
        _status: data.is_simulcast ? ANIME_STATUS.AIRING : null,
        _episodeCount: data.episode_count,
        _genres: data.keywords,
        _streamingLinks: {
          [SERVICES.CRUNCHYROLL]: `https://beta.crunchyroll.com/series/${data.id}`,
        },
        _link: `https://beta-api.crunchyroll.com${data.__href__}`,
      },
      DEFAULT_VALUES
    );
  }

  /**
   * @param {[string]} links An array of urls
   * @returns {object} A mapping of PROVIDERs to urls.
   * @see PROVIDERS
   */
  #mapStreamingLinks(links = []) {
    const result = {};
    const regex = /([a-zA-Z-]+\.(?:com|net|org|io|tv|co))/g;

    for (const link of links) {
      const domain = regex.exec(link)?.[1];
      regex.lastIndex = 0;

      if (
        !domain ||
        !Object.prototype.hasOwnProperty.call(SERVICE_DOMAINS, domain)
      ) {
        continue;
      }

      result[SERVICE_DOMAINS[domain]] = link;
    }

    return result;
  }
}

const DEFAULT_VALUES = {
  _id: 0,
  _title: "",
  _englishTitle: "",
  _description: "",
  _coverImage: "data:,",
  _startDate: null,
  _endDate: null,
  _status: null,
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
  "vrv.co": SERVICES.VRV,
};
