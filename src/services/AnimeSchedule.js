import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';
import { cacheAnimeIdMap, getCachedAnimeIdMappings } from '../helpers/storageHelpers';
import {PROVIDERS} from "../enums";
import AnimeEpisodeSchedule from "../models/AnimeEpisodeSchedule";

const BASE_URL = "https://graphql.anilist.co";

// todo add caching for ids and schedule
export default class AnimeSchedule {
    /** @type {import("axios").AxiosInstance} */
    #client;

    constructor() {
        this.#client = axios.create({
            baseURL: BASE_URL,
            headers: {
                "Content-Type": "application/json",
            },
        })
    }

    /**
     Gets the airing schedule for a particular library entry.
     @param libraryEntries {LibraryEntry[]} The library entry
     @returns {[id]: AnimeEpisodeSchedule[]} A dictionary mapping the provider anime id to the list of scheduled episodes.
     **/
    async getSchedulesForLibraryItems(libraryEntries) {
        if(libraryEntries.length == 0) {
            return {};
        }
        
        const mediaIdDictionary = await this.#getMediaIds(libraryEntries.map(entry => entry.anime), libraryEntries[0].provider);
        const mediaIds = Object.values(mediaIdDictionary);
        const earliestEpisode = Math.min(...libraryEntries.map(entry => entry.progress));
        const latestEpisode = Math.max(...libraryEntries.map(entry => entry.progress + 3));

        let results = {};
        let hasNextPage = true;

        const query = `
            query Schedule($mediaIds: [Int], $earliestEpisode: Int, $latestEpisode: Int, $page: Int) {
              Page(page: $page, perPage: 25) {
                airingSchedules(mediaId_in: $mediaIds, episode_greater: $earliestEpisode, episode_lesser: $latestEpisode, sort: EPISODE_DESC) {
                  mediaId
                  episode
                  airingAt
                }
                pageInfo {
                    hasNextPage
                }
              }
            }
        `;

        async function fetchPage(page) {
            const result = await this.#post(query, {
                mediaIds,
                earliestEpisode,
                latestEpisode,
                page,
            });

            hasNextPage = result.data.data.Page.pageInfo.hasNextPage;

            return result.data.Page.airingSchedules.reduce((prev, current) => {
                const id = Object.keys(mediaIdDictionary).find(key => mediaIdDictionary[key] == current.mediaId);
                const anime = libraryEntries.find(entry => entry.anime.id === id).anime;
                const item = new AnimeEpisodeSchedule({...current, mediaId: id, anime, });

                return {
                    ...prev,
                    [id]: [...(prev[id] || []), item]
                };
            }, results);
        }

        for(let page = 1; page++; hasNextPage) {
            results = await fetchPage(page);
        }

        return results;
    }

    /**
        Returns a dictionary mapping the list provider id to the AniList id.
        @param anime {AnimeSeries[]} The list of entries to get ids for.
    */
    async #getMediaIds(animes, listProvider) {
        let anilistIds;
        let mediaIds;
        let toFetch;

        // Check the cache
        if(listProvider !== PROVIDERS.ANILIST) {
            mediaIds = getCachedAnimeIdMappings(animes.map(anime => anime.id), listProvider);
            const cacheMisses = mediaIds.filter(map => map[PROVIDERS.ANILIST] === -1);
            toFetch = cacheMisses
                .map(map => animes.find(anime => anime.id === map[listProvider]));

            mediaIds = _.differenceWith(mediaIds, cacheMisses, (a, b) => a[listProvider] === b[listProvider])
                .reduce((prev, current) => ({
                    ...prev,
                    [current[listProvider]]: current[PROVIDERS.ANILIST],
                }), {});
        }
        

        switch(listProvider) {
            case PROVIDERS.MY_ANIME_LIST:
                mediaIds = {
                    ...mediaIds,
                    ...(await this.#getMediaIdsForMal(toFetch))
                };
                break;

                case PROVIDERS.ANILIST:
                    mediaIds = animes.reduce((prev, current) => ({...prev, [current.id]: current.id}), {});
                    break;

                    default:
                        anilistIds = await Promise.all(toFetch.map(async anime => await this.#getMediaIdForKitsu(anime)));

                        mediaIds = animes.reduce((prev, current, i) => ({
                            ...prev,
                            [current.id]: anilistIds[i],
                        }), mediaIds);
                        break;
                    }

        return mediaIds;
    }

    async #getMediaIdsForMal(animes) {
        const ids = animes.map(anime => anime.id);

        let hasNextPage = true;
        let page = 1;
        let results = {};

        const query = `
            query IDs($ids: [Int!]!, $page: Int!) {
              Page(page: $page, perPage: 25) {
                media(idMal_in: $ids, type: ANIME) {
                  id
                  idMal
                }
                pageInfo{
                  hasNextPage
                }
              }
            }
        `;

        async function fetchPage() {
            const result = await this.#post(query, { ids, page });

            page++;
            hasNextPage = result.data.data.Page.pageInfo.hasNextPage;

            return result.data.data.Page.media.reduce((prev, current) => ({
                ...prev,
                [current.idMal]: current.id,
            }), results);
        }

        while(hasNextPage) {
            results = await fetchPage();
        }

        for(const malId in results) {
            await cacheAnimeIdMap(malId, PROVIDERS.MY_ANIME_LIST, results[malId]);
        }

        return results;
    }

    /**
        @param anime {AnimeSeries} The library entry
    */
    async #getMediaIdForKitsu(anime) {
        const variables = {
            search: anime.title,
            episodes: anime.episodeCount,
            isAiring: anime.isAiring,
            startDate: parseInt(moment(anime.startDate).format('YYYYMMDD')),
        };

        const query = `
        query KitsuID($search:String!, ${variables.episodes > 0 && '$episodes:Int!,'} $startDate:FuzzyDateInt){
            Media(search: $search, ${variables.episodes > 0 && `episodes: $episodes,`} ${variables.isAiring && 'status: RELEASING,'} startDate: $startDate, type: ANIME) {
                id
            }
        }
        `;

        const result = await this.#post(query, variables);
        const anilistId = result.data.data.Media?.id;

        if(anilistId) {
            await cacheAnimeIdMap(anime.id, PROVIDERS.KITSU, anilistId, PROVIDERS.ANILIST);
        }

        return anilistId ?? -1;
    }

    async #post(query, variables) {
        return this.#client.post("/", {
            query,
            variables,
        });
    }
}