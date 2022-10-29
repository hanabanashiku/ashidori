import browser from 'webextension-polyfill';
import _ from 'lodash';

/**
 * Sets state in local storage so that the popup shows a currently watching alert for the given anime.
 * @param {LibraryEntry} libraryEntry The library entry data.
 * @param {AnimeEpisode} episodeData  The scraped anime episode data.
 * @returns {Promise<void>}
 */
export async function showCurrentWatchingAlertOnPopup(
    libraryEntry,
    episodeData
) {
    return browser.storage.local.set({
        current_anime: {
            libraryEntryId: libraryEntry.id,
            animeId: libraryEntry.anime.id,
            title: libraryEntry.anime.title,
            episodeNumber: episodeData.number,
        },
    });
}

/**
 * Reset the current watching alert in popup to default state.
 * @returns {Promise<void>}
 */
export async function resetCurrentWatchingAlert() {
    return browser.storage.local.set({
        current_anime: null,
    });
}

export function cacheSearchPage(query, page) {
    window.sessionStorage.setItem('search_query', query);
    window.sessionStorage.setItem('search_page', page);
}

export function getCachedSearchPage() {
    return [
        window.sessionStorage.getItem('search_query'),
        window.sessionStorage.getItem('search_page'),
    ];
}

export function resetSearchPage() {
    window.sessionStorage.removeItem('search_query');
    window.sessionStorage.removeItem('search_page');
}

export async function setPkce(pkce) {
    return browser.storage.local.set({
        pkce,
    });
}

export async function getPkce() {
    const result = await browser.storage.local.get({ pkce: null });
    return result.pkce;
}

/**
 * Cache a resolved anime mapping
 * @param {number} from The original id
 * @param {number} fromProvider The provider for the original id
 * @param {number} to The new id
 * @param {number} toProvider The provider of the new id
 */
export async function cacheAnimeIdMap(from, fromProvider, to, toProvider) {
    const result = await browser.storage.local.get({ animeIds: []});
    const current = result.animeIds.find(map => map[fromProvider] === from || map[toProvider] === to) ?? {};
    
    await browser.storage.local.set({animeIds: [
        ..._.difference(result.animeIds, current),
        {
            ...current,
            [fromProvider]: from,
            [toProvider]: to
        }
    ]});
}

/**
 * Gets cached mapping for an anime id
 * @param {number|[number]} ids The list of ids to get
 * @param {number} provider The known anime list provider
 * @param {number} targetProvider The target anime list provider
 * @returns 
 */
export async function getCachedAnimeIdMappings(ids, provider, targetProvider) {
    const cache = (await browser.storage.local.get({ animeIds: []})).animeIds;

    let returnOne = false;
    if(!Array.isArray(ids)) {
        ids = [ids];
        returnOne = true;
    }

    const result = ids.map(id => {
        const hit = cache.find(map => map[provider] === id);
        if(!hit) {
            return {
                [provider]: id,
                [targetProvider]: -1
            };
        }

        return hit;
    });

    if(returnOne) {
        return result[0];
    }

    return result;
}

