import axios from 'axios';
import AnimeEpisode from '../models/AnimeEpisode';
import { SERVICES } from '../enums';
import AnimeSeries from '../models/AnimeSeries';
import AnimeSeason from '../models/AnimeSeason';

const AUTH_URL = 'https://beta-api.crunchyroll.com/auth/v1/token';
const BASE_URL = 'https://beta-api.crunchyroll.com';

export default class CrunchyrollService {
    #cf_cookie;
    #account_id;
    #bearer;
    #bucket;
    #key_pair_id;
    #policy;
    #signature;

    async authenticate() {
        const request = new URLSearchParams();
        request.append('grant_type', 'etp_rt_cookie');

        const tokenResponse = await axios.post(AUTH_URL, request, {
            withCredentials: true,
            headers: {
                authorization: 'Basic bm9haWhkZXZtXzZpeWcwYThsMHE6',
            },
        });

        this.#bearer = tokenResponse.data['access_token'];
        this.#account_id = tokenResponse.data['account_id'];

        const keyResponse = await axios.get(`${BASE_URL}/index/v2`, {
            headers: {
                authorization: `Bearer ${this.#bearer}`,
                accept: 'application/json, text/plain, */*',
            },
        });

        this.#key_pair_id = keyResponse.data.cms.key_pair_id;
        this.#policy = keyResponse.data.cms.policy;
        this.#signature = keyResponse.data.cms.signature;
        this.#bucket = keyResponse.data.cms.bucket;
        this.#cf_cookie = keyResponse.headers['set-cookie'];
        return true;
    }

    /**
     * @param {string} episodeId The id of the episode.
     * @returns {AnimeEpisode} The anime episode data.
     */
    async getEpisodeData(episodeId) {
        const episode = await this.#getObject(episodeId, 'episodes');
        const seriesId = CrunchyrollService.#parseLink(
            episode.__links__['episode/series']?.href,
            'series'
        );

        const seasonId = CrunchyrollService.#parseLink(
            episode.__links__['episode/season']?.href,
            'seasons'
        );

        const series = await this.getSeriesData(seriesId);
        const season = await this.getSeasonData(seasonId);

        return new AnimeEpisode({
            ...episode,
            series,
            season,
            service: SERVICES.CRUNCHYROLL,
        });
    }

    /**
     * Gets series data given a series id.
     * @param {string} seriesId The id of the series.
     * @returns {Promise<AnimeSeries>} The anime series data.
     */
    async getSeriesData(seriesId) {
        if (!seriesId) {
            return null;
        }

        const series = await this.#getObject(seriesId, 'series');

        return new AnimeSeries({
            ...series,
            service: SERVICES.CRUNCHYROLL,
        });
    }

    /**
     * Gets season data for a season given a season id.
     * @param {string} seasonId The id of the series.
     * @returns {Promise<AnimeSeason>} The anime season data.
     */
    async getSeasonData(seasonId) {
        if (!seasonId) {
            return null;
        }

        const season = await this.#getObject(seasonId, 'seasons');

        return new AnimeSeason({
            ...season,
            service: SERVICES.CRUNCHYROLL,
        });
    }

    async #getObject(objectId, type) {
        const response = await axios.get(
            `${BASE_URL}/cms/v2${this.#bucket}/${type}/${objectId}`,
            {
                params: {
                    locale: 'en-US',
                    Signature: this.#signature,
                    Policy: this.#policy,
                    'Key-Pair-Id': this.#key_pair_id,
                },
            }
        );

        return response.data;
    }

    static #parseLink(link, type) {
        if (!link) {
            return null;
        }

        const regex = new RegExp(`${type}/(.+?)$`);
        return regex.exec(link)[1];
    }
}
