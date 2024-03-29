import browser from 'webextension-polyfill';
import _ from 'lodash';
import {
    PROVIDERS,
    ANIME_STATUS,
    SERVICES,
    TITLE_LANGUAGE_PREFERENCES,
} from '../enums';
import lang from 'lang';

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
                return;

            case PROVIDERS.MY_ANIME_LIST:
                this.#mapFromMal(data);
                return;

            default:
                _.defaultsDeep(this, data, DEFAULT_VALUES);
                return this;
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
            return '';
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
     * @returns {true} if the series is airing.
     */
    get isAiring() {
        return this._status === ANIME_STATUS.AIRING;
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
        const title = this.#mapTitle(
            {
                ...data.attributes.titles,
                canonicalTitle: data.attributes.canonicalTitle,
            },
            data.__langPref
        );

        const streamingLinks =
            data.relationships.streamingLinks.data
                ?.map((link) =>
                    data.included.find(
                        (inc) =>
                            inc.type === 'streamingLinks' && inc.id === link.id
                    )
                )
                ?.filter((item) => !!item)
                ?.map((link) => link.attributes.url) ?? [];

        const genres =
            data.relationships.genres.data
                ?.map(
                    (genre) =>
                        data.included.find(
                            (inc) =>
                                inc.type === 'genres' && inc.id === genre.id
                        )?.attributes?.name
                )
                .filter((genre) => !!genre) ?? [];

        _.defaultsDeep(
            this,
            {
                _id: data.id,
                _title: title,
                _englishTitle: data.attributes.titles.en,
                _description: data.attributes.synopsis,
                _coverImage:
                    data.attributes.posterImage?.tiny ??
                    data.attributes.posterImage.original,
                _startDate: data.attributes.startDate
                    ? new Date(`${data.attributes.startDate} 0:00`)
                    : null,
                _endDate: data.attributes.endDate
                    ? new Date(`${data.attributes.endDate} 0:00`)
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

    #mapFromMal(data) {
        const title = this.#mapTitle(
            {
                ...data.alternative_titles,
                canonicalTitle: data.title,
            },
            data.__langPref
        );

        const genres = data.genres.map((genre) => genre.name);

        _.defaultsDeep(
            this,
            {
                _id: data.id,
                _title: title,
                _englishTitle: data.alternative_titles.en,
                _description: data.synopsis,
                _coverImage: Object.values(data.main_picture)[0],
                _startDate: data.start_date
                    ? new Date(`${data.start_date} 0:00`)
                    : null,
                _endDate: data.end_date
                    ? new Date(`${data.end_date} 0:00`)
                    : null,
                _status: MAL_ANIME_STATUS[data.status],
                _episodeCount: data.num_episodes,
                _episodeLength: Math.round(data.average_episode_duration / 60),
                _genres: genres,
                // currently not available through the MAL API - coming soon?
                _streamingLinks: {},
                _link: `https://myanimelist.net/anime/${data.id}`,
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
                    [SERVICES.CRUNCHYROLL]: `https://www.crunchyroll.com/series/${data.id}`,
                },
                _link: `https://beta-api.crunchyroll.com${data.__href__}`,
            },
            DEFAULT_VALUES
        );
    }

    #mapTitle(titles, preference) {
        const language = browser.i18n.getUILanguage().replace('-', '_');

        if (preference === TITLE_LANGUAGE_PREFERENCES.ROMAJI) {
            return titles.canonicalTitle;
        }

        const exactMatch = Object.keys(titles).find(
            (key) => key.toLowerCase == language.toLowerCase()
        );
        if (exactMatch) {
            return titles[exactMatch];
        }

        function normalize(lang) {
            return lang.split(/[-_]/)[0].toLowerCase();
        }

        const normalizedLanguage = normalize(language);
        const resultKey = Object.keys(titles)
            .filter((key) => key !== 'en_jp')
            .find((key) => normalize(key) === normalizedLanguage);
        return (resultKey && titles[resultKey]) || titles.canonicalTitle;
    }

    /**
     * @param {[string]} links An array of urls
     * @returns {object} A mapping of PROVIDERs to urls.
     * @see PROVIDERS
     */
    #mapStreamingLinks(links = []) {
        const result = {};
        const regex = /(?:www\.)?([a-zA-Z-]+\.(?:com|net|org|io|tv|co))/g;

        for (const link of links) {
            const domain = regex.exec(link)?.[1];
            regex.lastIndex = 0;

            /* istanbul ignore if */
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
    _title: '',
    _englishTitle: '',
    _description: '',
    _coverImage: 'data:,',
    _startDate: null,
    _endDate: null,
    _status: null,
    _episodeCount: 0,
    _episodeLength: 0,
    _seasonCount: 0,
    _genres: [],
    _streamingLinks: {},
    _link: 'about:blank',
};

const KITSU_ANIME_STATUS = {
    current: ANIME_STATUS.AIRING,
    finished: ANIME_STATUS.FINISHED,
    tba: ANIME_STATUS.ANNOUNCED,
    unreleased: ANIME_STATUS.UNRELEASED,
    upcoming: ANIME_STATUS.UPCOMING,
};

const MAL_ANIME_STATUS = {
    finished_airing: ANIME_STATUS.FINISHED,
    currently_airing: ANIME_STATUS.AIRING,
    not_yet_aired: ANIME_STATUS.UPCOMING,
};

const SERVICE_DOMAINS = {
    'crunchyroll.com': SERVICES.CRUNCHYROLL,
    'funimation.com': SERVICES.FUNIMATION,
    'hulu.com': SERVICES.HULU,
    'hidive.com': SERVICES.HIDIVE,
    'netflix.com': SERVICES.NETFLIX,
    'tubitv.com': SERVICES.TUBITV,
    'amazon.com': SERVICES.AMAZON_PRIME,
    'vrv.co': SERVICES.VRV,
    'disneyplus.com': SERVICES.DISNEY_PLUS,
};
