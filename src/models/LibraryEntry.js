import _ from 'lodash';
import AnimeSeries from './AnimeSeries';
import { LIST_STATUS, PROVIDERS } from '../enums';
import { STATUS_MAP as KITSU_STATUSES } from '../providers/KitsuProvider';
import { STATUS_MAP as MAL_STATUES } from '../providers/MyAnimeListProvider';

/**
 * An entry in the user's anime library.
 */
export default class LibraryEntry {
    constructor(data = {}) {
        switch (data.provider) {
            case PROVIDERS.KITSU:
                this.#mapFromKitsu(data);
                break;

            case PROVIDERS.MY_ANIME_LIST:
                this.#mapFromMal(data);
                break;

            default:
                _.defaultsDeep(
                    this,
                    {
                        ...data,
                        _anime: new AnimeSeries(data._anime ?? {}),
                        _startDate: data._startDate
                            ? new Date(data._startDate)
                            : null,
                        _completedDate: data._completedDate
                            ? new Date(data._completedDate)
                            : null,
                        _lastUpdated: data._lastUpdated
                            ? new Date(data._lastUpdated)
                            : null,
                    },
                    DEFAULT_VALUES
                );
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
        const anime = data.included.find(
            (inc) =>
                inc.type === 'anime' &&
                inc.id === data.relationships.anime.data.id
        );

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
                _anime: anime
                    ? new AnimeSeries({
                          ...anime,
                          included: data.included,
                          provider: PROVIDERS.KITSU,
                          __langPref: data.__langPref,
                      })
                    : null,
            },
            DEFAULT_VALUES
        );
    }

    #mapFromMal(data) {
        const anime = data.node;
        const list = data.list_status ?? {};

        _.defaultsDeep(
            this,
            {
                // the key for library entries in MAL is username + animeId
                _id: anime.id,
                _status: MAL_STATUES[list.status],
                _progress: list.num_episodes_watched,
                _notes: list.comments,
                _startDate: list.start_date
                    ? new Date(`${list.start_date} 0:00`)
                    : null,
                _completedDate: list.finish_date
                    ? new Date(`${list.finish_date} 0:00`)
                    : null,
                _rewatchCount: list.num_times_rewatched,
                _lastUpdated: list.updated_at
                    ? new Date(list.updated_at)
                    : null,
                _rating: list.score,
                _anime: new AnimeSeries({
                    ...anime,
                    provider: PROVIDERS.MY_ANIME_LIST,
                    __langPref: data.__langPref,
                }),
            },
            DEFAULT_VALUES
        );
    }
}

const DEFAULT_VALUES = {
    _id: 0,
    _status: LIST_STATUS.NOT_WATCHING,
    _progress: 0,
    _notes: '',
    _startDate: null,
    _completedDate: null,
    _rewatchCount: 0,
    _lastUpdated: null,
    _rating: 0,
    _anime: new AnimeSeries(),
};
