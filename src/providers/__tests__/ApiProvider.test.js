import ApiProvider from '../ApiProvider'
import KitsuProvider from '../KitsuProvider'
import { PROVIDERS } from '../../enums'
import UserData from '../../models/UserData'

describe('Generic api provider', () => {
    const currentTime = 1643423023
    let kitsu
    let dateSpy
    const mockDate = new Date(currentTime)

    beforeEach(() => {
        browser.storage.local.set({
            userData: {
                _id: '1',
                _username: 'john.doe',
                _url: 'https://kitsu.io/users/3000',
                _avatarUrl: 'about:blank',
                _provider: PROVIDERS.KITSU,
            },
        })

        kitsu = new KitsuProvider()
        dateSpy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate)
    })

    afterEach(() => {
        browser.storage.local.clear()
        jest.clearAllMocks()
        dateSpy.mockRestore()
    })

    it('getSelectedProvider returns the selected provider', async () => {
        browser.storage.local.set({
            selected_provider: PROVIDERS.ANILIST,
        })

        const actual = await ApiProvider.getSelectedProvider()
        expect(actual).toBe(PROVIDERS.ANILIST)
    })

    describe('shouldRefresh', () => {
        it('returns true if the token has expired', async () => {
            browser.storage.local.set({
                access_token_expires_on: currentTime / 1000 - 1,
            })

            const actual = await kitsu.shouldRefresh()
            expect(actual).toBeTruthy()
        })

        it('returns false if the token has not expired', async () => {
            browser.storage.local.set({
                access_token_expires_on: currentTime / 1000 + 700,
            })

            const actual = await kitsu.shouldRefresh()
            expect(actual).toBeFalsy()
        })

        it('returns true if the token will expire in 10 minutes', async () => {
            browser.storage.local.set({
                access_token_expires_on: currentTime / 1000 + 599,
            })

            const actual = await kitsu.shouldRefresh()
            expect(actual).toBeTruthy()
        })
    })

    describe('isAuthenticated', () => {
        it('returns true if the user is authenticated', async () => {
            browser.storage.local.set({
                access_token: 'abc123',
            })

            const actual = await kitsu.isAuthenticated()

            expect(actual).toBeTruthy()
        })

        it('returns false if the user is not authenticated', async () => {
            const actual = await kitsu.isAuthenticated()

            expect(actual).toBeFalsy()
        })
    })

    it('signOut signs the user out', async () => {
        browser.storage.local.set({
            access_token: 'abc123',
            selected_provider: PROVIDERS.KITSU,
            refresh_token: 'abc123',
            access_token_expires_on: 5,
            userData: new UserData(),
        })

        await kitsu.signOut()

        const state = await browser.storage.local.get({
            access_token: null,
            selected_provider: null,
            refresh_token: null,
            access_token_expires_on: null,
            userData: null,
        })

        expect(state.access_token).toBeFalsy()
        expect(state.selected_provider).toBeFalsy()
        expect(state.refresh_token).toBeFalsy()
        expect(state.access_token_expires_on).toBeFalsy()
        expect(state.userData).toBeFalsy()
    })
})
