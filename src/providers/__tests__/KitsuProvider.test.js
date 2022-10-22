import KitsuProvider from '../KitsuProvider'
import axios from '../../__mocks__/axios'
import { LIST_STATUS, PROVIDERS } from '../../enums'

// mock data
import userData from '../../__mocks__/userData.json'
import kitsuUserData from '../../__mocks__/kitsu/user.json'
import libraryEntry from '../../__mocks__/kitsu/libraryEntry.json'
import animeData from '../../__mocks__/kitsu/anime.json'
import resolveLibraryEntryMocks from './__mocks__/resolveLibraryEntryFromAnimeEpisode/kitsu'

describe('Kitsu api provider', () => {
    const userId = '30000'

    let kitsu

    beforeEach(() => {
        browser.storage.local.set({
            userData: {
                ...userData,
                _provider: PROVIDERS.KITSU,
            },
        })

        kitsu = new KitsuProvider()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('providerType returns Kitsu', () => {
        expect(kitsu.providerType).toBe(PROVIDERS.KITSU)
    })

    it('authorize calls to authorize the user', async () => {
        const username = 'testAccount'
        const password = 'password1'
        const bearer = 'abc12345'
        const refresh = 'abc123456'

        browser.storage.local.set({ userData: null })
        axios.post.mockResolvedValueOnce({
            data: {
                access_token: bearer,
                created_at: 1643398928,
                expires_in: 2591963,
                refresh_token: refresh,
                scope: 'public',
                token_type: 'bearer',
            },
        })
        axios.get.mockResolvedValueOnce({ data: kitsuUserData })

        const expected = new URLSearchParams()
        expected.append('grant_type', 'password')
        expected.append('username', username)
        expected.append('password', password)
        expected.append('scope', '')

        const actual = await kitsu.authorize(username, password)

        expect(actual).toBe(true)
        expect(axios.post).toHaveBeenCalledTimes(1)
        expect(axios.post).toHaveBeenCalledWith(
            'https://kitsu.io/api/oauth/token',
            expected
        )

        expect(await kitsu.getAuthToken()).toBe(bearer)
        expect(await kitsu.getRefreshToken()).toBe(refresh)
        expect(
            (await browser.storage.local.get({ access_token_expires_on: null }))
                .access_token_expires_on
        ).toBe(1645990891)
        const user = await kitsu.getUserData()
        expect(user.id).toBe('30000')
    })

    it('refresh feches a new bearer token', async () => {
        const oldRefresh = 'abc123456'
        const bearer = 'defg1576'
        const refresh = 'xyz786'
        browser.storage.local.set({
            access_token: 'abc12345',
            refresh_token: oldRefresh,
        })
        axios.post.mockResolvedValueOnce({
            data: {
                access_token: bearer,
                created_at: 1643398931,
                expires_in: 2591963,
                refresh_token: refresh,
                scope: 'public',
                token_type: 'bearer',
            },
        })
        const expected = new URLSearchParams()
        expected.append('grant_type', 'refresh_token')
        expected.append('refresh_token', oldRefresh)

        const actual = await kitsu.refresh()

        expect(actual).toBe(true)
        expect(await kitsu.getAuthToken()).toBe(bearer)
        expect(await kitsu.getRefreshToken()).toBe(refresh)
        expect(
            (await browser.storage.local.get({ access_token_expires_on: null }))
                .access_token_expires_on
        ).toBe(1645990894)
    })

    it('fetch user data gets data for the user', async () => {
        axios.get.mockResolvedValueOnce({
            data: kitsuUserData,
        })

        const actual = await kitsu.fetchUserData()

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toHaveBeenCalledWith('/users?filter[self]=true')
        expect(actual).not.toBeNull()
        expect(actual.username).toBe('TestAccount')
        expect(actual.id).toBe('30000')
    })

    describe('getAnimeListByStatus', () => {
        beforeEach(() => {
            axios.get.mockResolvedValueOnce({
                data: {
                    data: [libraryEntry.data],
                    included: libraryEntry.included,
                    meta: {
                        statusCounts: {
                            current: 1,
                        },
                    },
                },
            })
        })

        it('returns the anime list data for current status', async () => {
            const actual = await kitsu.getAnimeListByStatus(LIST_STATUS.CURRENT)
            expect(axios.get).toHaveBeenCalledTimes(1)
            expect(axios.get).toHaveBeenCalledWith(
                `library-entries?filter[kind]=anime&filter[userId]=${userId}&filter[status]=current&include=anime,anime.streamingLinks,anime.genres&page[limit]=20&page[offset]=0`
            )
            expect(actual).not.toBeNull()
            expect(actual.total).toBe(1)
            expect(actual.page).toBe(0)
            expect(actual.limit).toBe(20)
            expect(actual.data.length).toBe(1)
            const entry = actual.data[0]
            expect(entry.id).toBe('29377736')
            expect(entry.anime.id).toBe('13209')
        })

        it('returns the anime list data for completed status', async () => {
            const actual = await kitsu.getAnimeListByStatus(
                LIST_STATUS.COMPLETED
            )
            expect(axios.get).toHaveBeenCalledTimes(1)
            expect(axios.get).toHaveBeenCalledWith(
                `library-entries?filter[kind]=anime&filter[userId]=${userId}&filter[status]=completed&include=anime,anime.streamingLinks,anime.genres&page[limit]=20&page[offset]=0`
            )

            expect(actual).not.toBeNull()
        })

        it('returns the anime list data for dropped status', async () => {
            const actual = await kitsu.getAnimeListByStatus(LIST_STATUS.DROPPED)
            expect(axios.get).toHaveBeenCalledTimes(1)
            expect(axios.get).toHaveBeenCalledWith(
                `library-entries?filter[kind]=anime&filter[userId]=${userId}&filter[status]=dropped&include=anime,anime.streamingLinks,anime.genres&page[limit]=20&page[offset]=0`
            )

            expect(actual).not.toBeNull()
        })

        it('returns the anime list data for on hold status', async () => {
            const actual = await kitsu.getAnimeListByStatus(LIST_STATUS.ON_HOLD)
            expect(axios.get).toHaveBeenCalledTimes(1)
            expect(axios.get).toHaveBeenCalledWith(
                `library-entries?filter[kind]=anime&filter[userId]=${userId}&filter[status]=on_hold&include=anime,anime.streamingLinks,anime.genres&page[limit]=20&page[offset]=0`
            )

            expect(actual).not.toBeNull()
        })

        it('returns the anime list data for planned status', async () => {
            const actual = await kitsu.getAnimeListByStatus(LIST_STATUS.PLANNED)
            expect(axios.get).toHaveBeenCalledTimes(1)
            expect(axios.get).toHaveBeenCalledWith(
                `library-entries?filter[kind]=anime&filter[userId]=${userId}&filter[status]=planned&include=anime,anime.streamingLinks,anime.genres&page[limit]=20&page[offset]=0`
            )

            expect(actual).not.toBeNull()
        })

        describe('allows for sorting', () => {
            test.each([
                ['progress', 'asc', 'progress'],
                ['progress', 'desc', '-progress'],
                ['notes', 'asc', 'notes'],
                ['notes', 'desc', '-notes'],
                ['startDate', 'asc', 'startedAt'],
                ['startDate', 'desc', '-startedAt'],
                ['completedDate', 'asc', 'finishedAt'],
                ['completedDate', 'desc', '-finishedAt'],
                ['rating', 'asc', 'ratingTwenty'],
                ['rating', 'desc', '-ratingTwenty'],
                ['lastUpdated', 'asc', 'updatedAt'],
                ['lastUpdated', 'desc', '-updatedAt'],
                ['status', 'asc', 'status'],
                ['status', 'desc', '-status'],
            ])('%s by %s', async (field, orientation, expectedKitsuField) => {
                const actual = await kitsu.getAnimeListByStatus(
                    LIST_STATUS.CURRENT,
                    0,
                    20,
                    field,
                    orientation
                )
                expect(axios.get).toHaveBeenCalledTimes(1)
                expect(axios.get).toHaveBeenCalledWith(
                    `library-entries?filter[kind]=anime&filter[userId]=${userId}&filter[status]=current&include=anime,anime.streamingLinks,anime.genres&page[limit]=20&page[offset]=0&sort=${expectedKitsuField}`
                )

                expect(actual).not.toBeNull()
            })

            it('but does not sort by an invalid field', async () => {
                const actual = await kitsu.getAnimeListByStatus(
                    LIST_STATUS.CURRENT,
                    0,
                    20,
                    'garbage',
                    'asc'
                )
                expect(axios.get).toHaveBeenCalledTimes(1)
                expect(axios.get).toHaveBeenCalledWith(
                    `library-entries?filter[kind]=anime&filter[userId]=${userId}&filter[status]=current&include=anime,anime.streamingLinks,anime.genres&page[limit]=20&page[offset]=0`
                )

                expect(actual).not.toBeNull()
            })
        })

        it('allows for pagination', async () => {
            const actual = await kitsu.getAnimeListByStatus(
                LIST_STATUS.CURRENT,
                2,
                30
            )
            expect(axios.get).toHaveBeenCalledTimes(1)
            expect(axios.get).toHaveBeenCalledWith(
                `library-entries?filter[kind]=anime&filter[userId]=${userId}&filter[status]=current&include=anime,anime.streamingLinks,anime.genres&page[limit]=30&page[offset]=60`
            )

            expect(actual).not.toBeNull()
            expect(actual.page).toBe(2)
            expect(actual.total).toBe(1)
            expect(actual.limit).toBe(30)
        })
    })

    it('getSingleLibraryEntry grabs a library item', async () => {
        const entryId = '29377736'
        axios.get.mockResolvedValueOnce({
            data: {
                data: libraryEntry.data,
                included: libraryEntry.included,
            },
        })

        const actual = await kitsu.getSingleLibraryEntry(entryId)

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toHaveBeenLastCalledWith(
            `library-entries/${entryId}?include=anime,anime.streamingLinks,anime.genres`
        )
        expect(actual).not.toBeNull()
        expect(actual.id).toBe(entryId)
        expect(actual.status).toBe(LIST_STATUS.CURRENT)
        expect(actual.anime.id).toBe(libraryEntry.included[0].id)
    })

    describe('getSingleLibraryEntryByAnime', () => {
        it('grabs a library item', async () => {
            const animeId = '12'
            axios.get.mockResolvedValueOnce({
                data: {
                    data: [libraryEntry.data],
                    included: libraryEntry.included,
                    meta: { count: 1 },
                },
            })

            const actual = await kitsu.getSingleLibraryEntryByAnime(animeId)

            expect(axios.get).toHaveBeenCalledTimes(1)
            expect(axios.get).toHaveBeenLastCalledWith(
                `library-entries?filter[kind]=anime&filter[userId]=${userId}&filter[animeId]=${animeId}&include=anime,anime.streamingLinks,anime.genres`
            )
            expect(actual).not.toBeNull()
            expect(actual.id).toBe('29377736')
            expect(actual.status).toBe(LIST_STATUS.CURRENT)
            expect(actual.anime.id).toBe(libraryEntry.included[0].id)
        })

        it('returns the anime with a blank list item if the anime was not found', async () => {
            const animeId = '12'
            axios.get.mockImplementation((url) => {
                if (url.match(/^library-entries/)) {
                    return Promise.resolve({
                        data: {
                            data: [],
                            included: {},
                            meta: {
                                count: 0,
                            },
                        },
                    })
                }
                if (url.match(/^anime/)) {
                    return Promise.resolve({
                        data: animeData,
                    })
                }
                return Promise.reject({
                    response: {
                        status: 404,
                    },
                })
            })

            const actual = await kitsu.getSingleLibraryEntryByAnime(animeId)

            expect(axios.get).toHaveBeenCalledTimes(2)
            expect(axios.get).toHaveBeenNthCalledWith(
                1,
                `library-entries?filter[kind]=anime&filter[userId]=${userId}&filter[animeId]=${animeId}&include=anime,anime.streamingLinks,anime.genres`
            )
            expect(axios.get).toHaveBeenNthCalledWith(
                2,
                `anime/${animeId}?include=streamingLinks,genres`
            )
            expect(actual).not.toBeNull()
            expect(actual.anime).not.toBeNull()
            expect(actual.anime.id).toBe(animeId)
            expect(actual.anime.title).toBe('One Piece')
            expect(actual.status).toBe(LIST_STATUS.NOT_WATCHING)
            expect(actual.progress).toBe(0)
            expect(actual.startDate).toBeNull()
        })

        it('returns null if the anime does not exist', async () => {
            const animeId = '13'
            axios.get.mockImplementation((url) => {
                if (url.match(/^library-entries/)) {
                    return Promise.resolve({
                        data: {
                            data: [],
                            included: {},
                            meta: {
                                count: 0,
                            },
                        },
                    })
                }
                return Promise.reject({
                    response: {
                        status: 404,
                    },
                })
            })

            const actual = await kitsu.getSingleLibraryEntryByAnime(animeId)

            expect(axios.get).toHaveBeenCalledTimes(2)
            expect(actual).toBeNull()
        })
    })

    describe('getAnime', () => {
        const animeId = '12'

        it('returns anime data', async () => {
            axios.get.mockResolvedValueOnce({
                data: animeData,
            })

            const actual = await kitsu.getAnime(animeId)

            expect(actual).not.toBeNull()
            expect(actual.title).toBe('One Piece')
            expect(actual.id).toBe(animeId)
        })

        it('returns null if the anime was not found', async () => {
            axios.get.mockRejectedValueOnce({
                response: {
                    data: null,
                    status: 404,
                },
            })

            const actual = await kitsu.getAnime(animeId)

            expect(actual).toBeNull()
        })
    })

    it('update item updates a library item', async () => {
        axios.patch.mockResolvedValueOnce()
        const itemId = '12345'
        const patch = {
            status: LIST_STATUS.CURRENT,
            progress: 5,
            notes: undefined,
            startDate: new Date('Jan 20 2022'),
            completedDate: null,
            rating: 8.5,
        }

        expect(
            async () => await kitsu.updateLibraryItem(itemId, patch)
        ).not.toThrow()
        expect(axios.patch).toHaveBeenCalledTimes(1)
        expect(axios.patch).toHaveBeenCalledWith(`/library-entries/${itemId}`, {
            data: {
                type: 'libraryEntries',
                id: `${itemId}`,
                attributes: {
                    status: 'current',
                    progress: 5,
                    startedAt: patch.startDate.toISOString(),
                    finishedAt: null,
                    ratingTwenty: 17,
                },
            },
        })
    })

    it('removeLibraryItem deletes the library item from the list', async () => {
        const itemId = '12345'

        expect(async () => await kitsu.removeLibraryItem(itemId)).not.toThrow()

        expect(axios.delete).toHaveBeenCalledTimes(1)
        expect(axios.delete).toHaveBeenCalledWith(`/library-entries/${itemId}`)
    })

    describe('resolveLibraryEntryFromAnimeEpisode', () => {
        const cases = Object.keys(resolveLibraryEntryMocks.Scenarios).map(
            (key) => {
                const idx = resolveLibraryEntryMocks.Scenarios[key]

                return [
                    key,
                    resolveLibraryEntryMocks.ScrapedEpisodeData[idx],
                    resolveLibraryEntryMocks.SeasonResults[idx],
                    resolveLibraryEntryMocks.SeriesResults[idx],
                    resolveLibraryEntryMocks.ListResults[idx],
                    resolveLibraryEntryMocks.Expected[idx],
                ]
            }
        )

        function buildFindAnimeUrl(text) {
            return `anime?filter[text]=${encodeURIComponent(
                text
            )}&include=streamingLinks,genres&page[limit]=5&page[offset]=0`
        }

        it("returns nulls if the episode didn't resolve", async () => {
            const actual = await kitsu.resolveLibraryEntryFromAnimeEpisode(null)

            expect(actual).toBeNull()
        })

        test.each(cases)(
            '%p',
            async (
                scenario,
                episode,
                seasonResult,
                seriesResult,
                listResult,
                expected
            ) => {
                let impl = axios.get
                    .mockRejectedValue({
                        response: {
                            status: 404,
                        },
                    })
                    .mockResolvedValueOnce({
                        data: seasonResult,
                    })

                if (expected.calledTimes === 3) {
                    impl = impl.mockResolvedValueOnce({
                        data: seriesResult,
                    })
                }

                impl.mockImplementationOnce((url) => {
                    if (url.includes(`filter[animeId]=${expected.animeId}`)) {
                        return Promise.resolve({
                            data: listResult,
                        })
                    }

                    return Promise.reject({
                        response: {
                            status: 404,
                            data: 'Wrong anime id',
                            resource: url,
                        },
                    })
                })

                const actual = await kitsu.resolveLibraryEntryFromAnimeEpisode(
                    episode
                )

                expect(actual).not.toBeNull()
                expect(axios.get).toHaveBeenCalledTimes(expected.calledTimes)
                expect(axios.get).toHaveBeenNthCalledWith(
                    1,
                    buildFindAnimeUrl(episode.season.name)
                )

                if (expected.calledTimes === 4) {
                    expect(axios.get).toHaveBeenNthCalledWith(
                        2,
                        buildFindAnimeUrl(episode.series.name)
                    )
                }

                expect(axios.get).toHaveBeenLastCalledWith(
                    `library-entries?filter[kind]=anime&filter[userId]=${userId}&filter[animeId]=${expected.animeId}&include=anime,anime.streamingLinks,anime.genres`
                )
            }
        )
    })
})
