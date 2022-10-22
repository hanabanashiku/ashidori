import browser from 'webextension-polyfill';

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
