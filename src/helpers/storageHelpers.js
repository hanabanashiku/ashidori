import browser from "webextension-polyfill";

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
