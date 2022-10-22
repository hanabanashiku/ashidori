import MyAnimeListProvider from '../MyAnimeListProvider'
import axios from '../../__mocks__/axios'
import { PROVIDERS, LIST_STATUS } from '../../enums'

// mock data
import userData from '../../__mocks__/userData.json'
import malUserData from '../../__mocks__/mal/user.json'
import libraryEntry from '../../__mocks__/mal/libraryEntry.json'
import animeData from '../../__mocks__/mal/anime.json'

describe('MyAnimeList provider', () => {
    let mal
    let now = new Date('2022-06-10 13:00')

    beforeEach(() => {
        browser.storage.local.set({
            userData: {
                ...userData,
                _provider: PROVIDERS.MY_ANIME_LIST,
            },
        })

        jest.useFakeTimers().setSystemTime(now.getTime())

        mal = new MyAnimeListProvider()
    })

    afterEach(() => {
        jest.clearAllMocks()
        jest.useRealTimers()
        axios.get.mockReset()
    })

    it('providerType returns MyAnimeList', () => {
        expect(mal.providerType).toBe(PROVIDERS.MY_ANIME_LIST)
    })

    describe('getAnimeListByStatus', () => {
        beforeEach(() => {
            axios.get.mockResolvedValueOnce({
                data: {
                    data: [libraryEntry],
                    paging: {
                        previous: '',
                    },
                },
            })
        })

        it('returns an empty list for a bad status', async () => {
            const actual = await mal.getAnimeListByStatus('garbage')

            expect(axios.get).not.toHaveBeenCalled()
            expect(actual.data).toStrictEqual([])
            expect(actual.total).toBe(0)
        })

        it('returns the anime list data for current status', async () => {
            const actual = await mal.getAnimeListByStatus(LIST_STATUS.CURRENT)
            expect(axios.get).toHaveBeenCalledTimes(1)
            expect(axios.get).toHaveBeenCalledWith(
                '/users/@me/animelist?status=watching&fields=node(id,title,alternative_titles,status,start_date,end_date,synopsis,genres,media_type,num_episodes,average_episode_duration),list_status{start_date,finish_date,priority,num_times_rewatched,rewatch_value,tags,comments}&limit=20%offset=0'
            )
            expect(actual).not.toBeNull()
            expect(actual.total).toBe(1)
            expect(actual.page).toBe(0)
            expect(actual.limit).toBe(20)
            expect(actual.data.length).toBe(1)
            const entry = actual.data[0]
            expect(entry.id).toBe(21)
            expect(entry.anime.id).toBe(21)
        })

        it('returns the anime list data for completed status', async () => {
            const actual = await mal.getAnimeListByStatus(LIST_STATUS.COMPLETED)
            expect(axios.get).toHaveBeenCalledTimes(1)
            expect(axios.get).toHaveBeenCalledWith(
                '/users/@me/animelist?status=completed&fields=node(id,title,alternative_titles,status,start_date,end_date,synopsis,genres,media_type,num_episodes,average_episode_duration),list_status{start_date,finish_date,priority,num_times_rewatched,rewatch_value,tags,comments}&limit=20%offset=0'
            )

            expect(actual).not.toBeNull()
        })

        it('returns the anime list data for dropped status', async () => {
            const actual = await mal.getAnimeListByStatus(LIST_STATUS.DROPPED)
            expect(axios.get).toHaveBeenCalledTimes(1)
            expect(axios.get).toHaveBeenCalledWith(
                '/users/@me/animelist?status=dropped&fields=node(id,title,alternative_titles,status,start_date,end_date,synopsis,genres,media_type,num_episodes,average_episode_duration),list_status{start_date,finish_date,priority,num_times_rewatched,rewatch_value,tags,comments}&limit=20%offset=0'
            )

            expect(actual).not.toBeNull()
        })

        it('returns the anime list data for on hold status', async () => {
            const actual = await mal.getAnimeListByStatus(LIST_STATUS.ON_HOLD)
            expect(axios.get).toHaveBeenCalledTimes(1)
            expect(axios.get).toHaveBeenCalledWith(
                '/users/@me/animelist?status=on_hold&fields=node(id,title,alternative_titles,status,start_date,end_date,synopsis,genres,media_type,num_episodes,average_episode_duration),list_status{start_date,finish_date,priority,num_times_rewatched,rewatch_value,tags,comments}&limit=20%offset=0'
            )

            expect(actual).not.toBeNull()
        })

        it('returns the anime list data for planned status', async () => {
            const actual = await mal.getAnimeListByStatus(LIST_STATUS.PLANNED)
            expect(axios.get).toHaveBeenCalledTimes(1)
            expect(axios.get).toHaveBeenCalledWith(
                '/users/@me/animelist?status=plan_to_watch&fields=node(id,title,alternative_titles,status,start_date,end_date,synopsis,genres,media_type,num_episodes,average_episode_duration),list_status{start_date,finish_date,priority,num_times_rewatched,rewatch_value,tags,comments}&limit=20%offset=0'
            )

            expect(actual).not.toBeNull()
        })

        describe('allows for sorting', () => {
            test.each([
                ['rating', 'list_score'],
                ['lastUpdated', 'list_updated_at'],
                ['title', ['anime_title']],
                ['startDate', 'anime_start_date'],
            ])('%s', async (field, expectedMalField) => {
                const actual = await mal.getAnimeListByStatus(
                    LIST_STATUS.CURRENT,
                    0,
                    20,
                    field
                )
                expect(axios.get).toHaveBeenCalledTimes(1)
                expect(axios.get).toHaveBeenCalledWith(
                    `/users/@me/animelist?status=watching&fields=node(id,title,alternative_titles,status,start_date,end_date,synopsis,genres,media_type,num_episodes,average_episode_duration),list_status{start_date,finish_date,priority,num_times_rewatched,rewatch_value,tags,comments}&sort=${expectedMalField}&limit=20%offset=0`
                )

                expect(actual).not.toBeNull()
            })

            it('but does not sort by an invalid field', async () => {
                const actual = await mal.getAnimeListByStatus(
                    LIST_STATUS.CURRENT,
                    0,
                    20,
                    'garbage'
                )
                expect(axios.get).toHaveBeenCalledTimes(1)
                expect(axios.get).toHaveBeenCalledWith(
                    '/users/@me/animelist?status=watching&fields=node(id,title,alternative_titles,status,start_date,end_date,synopsis,genres,media_type,num_episodes,average_episode_duration),list_status{start_date,finish_date,priority,num_times_rewatched,rewatch_value,tags,comments}&limit=20%offset=0'
                )

                expect(actual).not.toBeNull()
            })
        })

        it('allows for pagination', async () => {
            const actual = await mal.getAnimeListByStatus(
                LIST_STATUS.CURRENT,
                2,
                30
            )
            expect(axios.get).toHaveBeenCalledTimes(1)
            expect(axios.get).toHaveBeenCalledWith(
                '/users/@me/animelist?status=watching&fields=node(id,title,alternative_titles,status,start_date,end_date,synopsis,genres,media_type,num_episodes,average_episode_duration),list_status{start_date,finish_date,priority,num_times_rewatched,rewatch_value,tags,comments}&limit=30%offset=60'
            )

            expect(actual).not.toBeNull()
            expect(actual.page).toBe(2)
            expect(actual.total).toBe(1)
            expect(actual.limit).toBe(30)
        })
    })

    describe('getSingleLibraryEntry', () => {
        it('grabs a library item', async () => {
            axios.get.mockResolvedValueOnce({
                data: {
                    ...libraryEntry.node,
                    my_list_status: libraryEntry.list_status,
                },
            })

            const actual = await mal.getSingleLibraryEntry(21)

            expect(actual).not.toBeNull()
            expect(actual.id).toBe(21)
            expect(actual.status).toBe(LIST_STATUS.CURRENT)
            expect(actual.rating).toBe(10)
            expect(actual.anime).not.toBeNull()
            expect(actual.anime.id).toBe(21)
        })

        it('grabs an empty library item if the user has not added the anime to their list', async () => {
            axios.get.mockResolvedValueOnce({
                data: libraryEntry.node,
            })

            const actual = await mal.getSingleLibraryEntry(21)

            expect(actual).not.toBeNull()
            expect(actual.id).toBe(21)
            expect(actual.status).toBe(LIST_STATUS.NOT_WATCHING)
            expect(actual.startDate).toBeNull()
            expect(actual.anime).not.toBeNull()
            expect(actual.anime.id).toBe(21)
        })
    })

    describe('getSingleLibraryEntryByAnime', () => {
        it('grabs a library item', async () => {
            axios.get.mockResolvedValueOnce({
                data: {
                    ...libraryEntry.node,
                    my_list_status: libraryEntry.list_status,
                },
            })

            const actual = await mal.getSingleLibraryEntryByAnime(21)

            expect(actual).not.toBeNull()
            expect(actual.id).toBe(21)
            expect(actual.status).toBe(LIST_STATUS.CURRENT)
            expect(actual.rating).toBe(10)
            expect(actual.anime).not.toBeNull()
            expect(actual.anime.id).toBe(21)
        })

        it('grabs an empty library item if the user has not added the anime to their list', async () => {
            axios.get.mockResolvedValueOnce({
                data: libraryEntry.node,
            })

            const actual = await mal.getSingleLibraryEntryByAnime(21)

            expect(actual).not.toBeNull()
            expect(actual.id).toBe(21)
            expect(actual.status).toBe(LIST_STATUS.NOT_WATCHING)
            expect(actual.startDate).toBeNull()
            expect(actual.anime).not.toBeNull()
            expect(actual.anime.id).toBe(21)
        })
    })

    it('create item creates a library item', async () => {
        axios.patch.mockResolvedValueOnce()
        const itemId = 21
        const patch = {
            status: LIST_STATUS.CURRENT,
            progress: 5,
            notes: undefined,
            startDate: new Date('Jan 20 2022'),
            completedDate: null,
            rating: 8.5,
        }
        const expectedPatch = new URLSearchParams()
        expectedPatch.append('status', 'watching')
        expectedPatch.append('score', 8.5)
        expectedPatch.append('num_watched_episodes', '5')
        expectedPatch.append('start_date', '2022-01-20')
        expectedPatch.append('finish_date', null)

        expect(
            async () => await mal.createLibraryItem(itemId, patch)
        ).not.toThrow()
        expect(axios.patch).toHaveBeenCalledTimes(1)
        expect(axios.patch).toHaveBeenCalledWith(
            `/anime/${itemId}/my_list_status`,
            expectedPatch,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
    })

    it('update item updates a library item', async () => {
        axios.patch.mockResolvedValueOnce()
        const itemId = 21
        const patch = {
            status: LIST_STATUS.CURRENT,
            progress: 5,
            notes: undefined,
            startDate: new Date('Jan 20 2022'),
            completedDate: new Date('Jan 25 2022'),
            rating: 8.5,
        }
        const expectedPatch = new URLSearchParams()
        expectedPatch.append('status', 'watching')
        expectedPatch.append('score', 8.5)
        expectedPatch.append('num_watched_episodes', '5')
        expectedPatch.append('start_date', '2022-01-20')
        expectedPatch.append('finish_date', '2022-01-25')

        expect(
            async () => await mal.updateLibraryItem(itemId, patch)
        ).not.toThrow()
        expect(axios.patch).toHaveBeenCalledTimes(1)
        expect(axios.patch).toHaveBeenCalledWith(
            `/anime/${itemId}/my_list_status`,
            expectedPatch,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
    })

    it('removeLibraryItem deletes the library item from the list', async () => {
        const itemId = 20

        expect(async () => await mal.removeLibraryItem(itemId)).not.toThrow()

        expect(axios.delete).toHaveBeenCalledTimes(1)
        expect(axios.delete).toHaveBeenCalledWith(
            `/anime/${itemId}/my_list_status`
        )
    })

    describe('getAnime', () => {
        it('returns anime data', async () => {
            axios.get.mockResolvedValueOnce({
                data: animeData,
            })

            const actual = await mal.getAnime(34572)

            expect(actual).not.toBeNull()
            expect(actual.id).toBe(34572)
            expect(actual.title).toBe('Black Clover')
        })

        it('returns null if the anime was not found', async () => {
            axios.get.mockRejectedValueOnce({
                response: {
                    data: null,
                    status: 404,
                },
            })

            const actual = await mal.getAnime(20)

            expect(actual).toBeNull()
        })
    })

    it('finds anime returns search results', async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                data: [libraryEntry],
                paging: {
                    previous: '',
                },
            },
        })

        const actual = await mal.findAnime('one')

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toHaveBeenCalledWith(
            '/anime?q=one&fields=id,title,alternative_titles,status,start_date,end_date,synopsis,genres,media_type,num_episodes,average_episode_duration&limit=30&offset=0'
        )

        expect(actual.page).toBe(0)
        expect(actual.total).toBe(1)
        expect(actual.data[0].title).toBe('One Piece')
    })

    it('authorize begins the implicit OAuth flow', async () => {
        const clientId = 'e62f583191ca06e8a96bd8fc66769c09'
        const code =
            'def5020006cf4866102fc5cfdf3d1df050a8b14fdfbbeff3e3e5d7fa8e4bfba931cd66bfbb54d8ca2758851197679811b01bebfcf01f2aa5b74ef70199f137f9da38f33947ff759a5750c591dbefbe97b1232091ed5327a636aef4f056a80ab2460254fd866b5229f680bdd1e93d7a6d0e52865d9982b4be42040faa3d6a07b8e3b13808d65e344f9533a4eacb5a3cd693665ea3d38e9a48f6fada3a9a7d41f800f71417b0923df9bbcf07b76685e883a4cd6c59c5b67c20394c5f34c21e7a4a2aef35a35178fb8d33ab1e11f18252e5d81ad68687deffe65ab9c313332484a0b7faf67dcb2848665c166dfeed5708d5fbd4c43af7a1cadb03f9cb5370ff860fdf87880ae2ab424015578439d2820a630837264647bae7fc28c8c135d59e40b724f55249e204fc4afcbdf7b010d5ae14a04fb8530ea71471175998261bc45edc039c8fc42482ebd652897b04716506d9ea553773d499b529b3468470ee09e933fa990bd0d1ea657df0ad6893988c4cfeda95cb5bae97aa98bd6c9d6a227598a62851af706a1dd0b41d510e4fdbe1053170e755092d495e411f42ea59546560979e2b841fffcc58ea3714067eb6cc30ee69835388b01d8408e61bf367a7be69d235494ff1eaaf1790f6a7442dfff1c5875c4821f4d5dbfbf9416e0fb7ce36d35940285e42bbd8661084cd9993c59a400c2204121ad5bd8b0a7eb5738cc3f48e03b4998883f129bbf7488c74df36cbbe5b015ae660b7ea7ab62ba79b009fa19342633169dbe2d28f'
        const bearerToken =
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijc1YzZkMzliMmFlNjBhNTJiY2U2NjI1YTk3ZDRkODZlYTZiOTIyOWUxZjczNzcyNTQ0ODQ4Yjg0OTE4NzVlZjZlNmZlNzE0ZmQxMzlmMjAyIn0.eyJhdWQiOiJlNjJmNTgzMTkxY2EwNmU4YTk2YmQ4ZmM2Njc2OWMwOSIsImp0aSI6Ijc1YzZkMzliMmFlNjBhNTJiY2U2NjI1YTk3ZDRkODZlYTZiOTIyOWUxZjczNzcyNTQ0ODQ4Yjg0OTE4NzVlZjZlNmZlNzE0ZmQxMzlmMjAyIiwiaWF0IjoxNjU0ODc5NjU5LCJuYmYiOjE2NTQ4Nzk2NTksImV4cCI6MTY1NzQ3MTY1OSwic3ViIjoiMzU5NjE4MyIsInNjb3BlcyI6W119.DzjwVKgQWubu1Owmk-MrziJ3GbFeB6MFPCmTHOKF3EvEA94s5PnRJ9McX7mD-f7g_XSzQ_C0kcHKtraIgQ1-ZWCbfw_hFMDEJonfcoPqHeir7I715tcqnOgJxEgPUMrywuPLOIOVarUzV62Hz45V7kCdTlV1QoQB7HgkvwxVvSUSDpp2CIxuVY5HiEnikdp83OCk6ZRwVroRGzI01P4w_79URJ3REQquYBWnCvxUdlO-5R4WB3uku8VezczON_V3Dj74LE5LQhn2-Bi5v7HAEuajb4l4TCztLSIx_zaSP-KNUgnDB0qviXZ3l8UW1ZA0dNok1tbbrA7HSwUasddJ3A'
        browser.identity.launchWebAuthFlow.mockResolvedValueOnce(
            `https://chiejjofmfnepjchjenapocjafpkipaj.chromiumapp.org/?code=${code}`
        )
        const refreshToken =
            'def50200356fc22794608cfdfe5c291f95d88466e3387a79f5f8dae9d8084ace8ba29397b82dac1bc2ee22ea530e1276916210b5912d50dbcbf11f2d62919e26d8c7297f9fc3fcaf330d12950db9ee8a800899397f70e77cff0d83cd4c37d47e004d5151a2e3c35252fa6ba5628a3f2b02f4f3994cae3ae2e8eebf0a7dc675d30fe6130db3c50c251fa4a889c2e92ba670a558889027443b57fe8d77d9d584bd20cbf6236b98884afa192b7f4699e011ed260801062700deb07ab0921b0448748dd95ff8ab496704d9662ea8a3bb46debdcdeea5747c9ab1f4370965f9e99303c6968076f84cbecd6f3e77d2c82c009c90f0e02989b6b9f15bed0b415dbfff73ab7a779a9e6b9d36c40cb5676ef369398bc4318bce769feb27b6a69d842e71a5a7c57153a8829aadf0d5b223906552e809788baddcc3a2f31abe7cf9bcabf8444e88ce7ba19f97f565884410e4b3fc120e5c76e7ae48a352efb2eca55bcd86230975a1f002344ec9bfff5bcd46eb9cfc5030f04c5e2dea38c68a6af471a9db6fb29f9cd68d51502f'
        axios.post.mockResolvedValueOnce({
            data: {
                token_type: 'Bearer',
                access_token: bearerToken,
                refresh_token: refreshToken,
                expires_in: 3600,
            },
        })
        axios.get.mockResolvedValueOnce({ data: malUserData })

        // Ask the user to put in their password and request authorization code
        await MyAnimeListProvider.authorize()
        expect(browser.identity.launchWebAuthFlow).toHaveBeenCalledTimes(1)
        const webAuthRequest =
            browser.identity.launchWebAuthFlow.mock.calls[0][0]
        const codeParams = new URLSearchParams(webAuthRequest.url.split('?')[1])
        expect(webAuthRequest.interactive).toBe(true)
        expect(webAuthRequest.url).toContain(
            'https://myanimelist.net/v1/oauth2/authorize?'
        )
        expect(codeParams.get('response_type')).toBe('code')
        expect(codeParams.get('client_id')).toBe(clientId)
        expect(codeParams.get('scope')).toBe('write:users')
        expect(codeParams.get('redirect_uri')).toBe(
            'https://chiejjofmfnepjchjenapocjafpkipaj.chromiumapp.org/'
        )
        expect(codeParams.get('code_challenge')).toHaveLength(128)
        expect(codeParams.get('code_challenge_method')).toBe('plain')

        // Exchange authorization code for bearer token
        const expectedParams = new URLSearchParams()
        expectedParams.append('client_id', clientId)
        expectedParams.append('code', code)
        expectedParams.append('code_verifier', codeParams.get('code_challenge'))
        expectedParams.append('grant_type', 'authorization_code')
        expectedParams.append('redirect_uri', codeParams.get('redirect_uri'))
        expect(axios.post).toHaveBeenCalledWith(
            'https://myanimelist.net/v1/oauth2/token',
            expectedParams
        )

        // save token to storage
        expect(await mal.getAuthToken()).toBe(bearerToken)
        expect(await mal.getRefreshToken()).toBe(refreshToken)
        expect(
            (await browser.storage.local.get({ access_token_expires_on: null }))
                .access_token_expires_on
        ).toBe(now.getTime() / 1000 + 3600)

        // populate user data
        expect(axios.get).toHaveBeenCalledWith('/users/@me')
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
                expires_in: 3600,
                refresh_token: refresh,
                token_type: 'bearer',
            },
        })
        const expected = new URLSearchParams()
        expected.append('grant_type', 'refresh_token')
        expected.append('refresh_token', oldRefresh)

        const actual = await mal.refresh()

        expect(actual).toBe(true)
        expect(await mal.getAuthToken()).toBe(bearer)
        expect(await mal.getRefreshToken()).toBe(refresh)
        expect(
            (await browser.storage.local.get({ access_token_expires_on: null }))
                .access_token_expires_on
        ).toBe(now.getTime() / 1000 + 3600)
    })

    it('fetchUserData fetches user data', async () => {
        axios.get.mockResolvedValueOnce({ data: malUserData })

        const actual = await mal.fetchUserData()

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toHaveBeenLastCalledWith('/users/@me')

        expect(actual.id).toBe(30000)
        expect(actual.username).toBe('john.doe')
        expect(actual.avatarUrl).toBe(
            'https://api-cdn.myanimelist.net/images/userimages/30000.jpg?t=1654881600'
        )
    })
})
