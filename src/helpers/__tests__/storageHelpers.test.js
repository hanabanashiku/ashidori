import {
    showCurrentWatchingAlertOnPopup,
    resetCurrentWatchingAlert,
    cacheSearchPage,
    getCachedSearchPage,
    resetSearchPage,
} from '../storageHelpers'
import LibraryEntry from '../../models/LibraryEntry'
import AnimeEpisode from '../../models/AnimeEpisode'

describe('storage helpers', () => {
    it('showCurrentWatchingAlertOnPopup sets the current anime', async () => {
        const libraryEntry = new LibraryEntry({
            _id: 12345,
            _anime: {
                _title: 'One Piece',
            },
        })

        const episodeData = new AnimeEpisode({
            _number: 1017,
        })

        await showCurrentWatchingAlertOnPopup(libraryEntry, episodeData)

        expect(browser.storage.local.set).toHaveBeenCalledWith({
            current_anime: {
                libraryEntryId: 12345,
                title: 'One Piece',
                episodeNumber: 1017,
            },
        })
    })

    it('resetCurrentWatchingAlert resets the watching alert on popup', async () => {
        await resetCurrentWatchingAlert()

        expect(browser.storage.local.set).toHaveBeenCalledWith({
            current_anime: null,
        })
    })

    it('cacheSearchPage caches the current search query', () => {
        cacheSearchPage('one piece', 0)

        expect(getCachedSearchPage()).toStrictEqual(['one piece', '0'])
    })

    it('resetSearchPage resets the search data', () => {
        cacheSearchPage('one piece', 0)
        resetSearchPage()

        expect(getCachedSearchPage()).toStrictEqual([null, null])
    })
})
