import { waitFor } from '@testing-library/react'
import MESSAGE_TYPES from '../../messageTypes'
import * as extensionHelpers from '../../helpers/extensionHelpers'

describe('Background script injector', () => {
    let onHistoryStateUpdated

    const executeScriptSpy = jest
        .spyOn(extensionHelpers, 'executeScript')
        .mockImplementation(() => Promise.resolve())

    beforeEach(() => {
        browser.webNavigation.onHistoryStateUpdated.addListener.mockImplementation(
            (fn) => {
                onHistoryStateUpdated = fn
            }
        )
        require('../inject.js')
        expect(onHistoryStateUpdated).not.toBeNull()
        jest.resetAllMocks()
        browser.runtime.getManifest.mockReturnValue({
            content_scripts: [
                {
                    matches: ['*://beta.crunchyroll.com/watch/**'],
                    js: ['video.js'],
                },
                {
                    matches: ['*://*.netflix.com/watch/*'],
                    js: ['video_netflix.js'],
                },
            ],
        })
    })

    it('does not inject by default', () => {
        onHistoryStateUpdated({
            tabId: 1,
            frameId: 2,
            url: 'https://google.com/test',
        })
        expect(browser.scripting.executeScript).not.toHaveBeenCalled()
    })

    it('sends message on pushState', () => {
        onHistoryStateUpdated({
            tabId: 1,
            frameId: 2,
            url: 'https://google.com/test',
        })
        expect(browser.tabs.sendMessage).toHaveBeenCalledTimes(1)
        expect(browser.tabs.sendMessage).toHaveBeenLastCalledWith(
            1,
            {
                type: MESSAGE_TYPES.HISTORY_STATE_UPDATED,
                payload: {
                    tabId: 1,
                    frameId: 2,
                    url: 'https://google.com/test',
                },
            },
            { frameId: 2 }
        )
    })

    it('executes script for Crunchyroll video', async () => {
        onHistoryStateUpdated({
            tabId: 1,
            frameId: 2,
            url: 'https://beta.crunchyroll.com/watch/GPWUK5WJ8/backlighting-is-the-best',
        })
        await waitFor(() => expect(executeScriptSpy).toHaveBeenCalledTimes(1))
        expect(executeScriptSpy).toHaveBeenLastCalledWith(1, ['video.js'])
    })

    it('executes script for Netflix video', async () => {
        onHistoryStateUpdated({
            tabId: 1,
            frameId: 2,
            url: 'https://www.netflix.com/watch/81056831?trackId=14170286',
        })
        await waitFor(() => expect(executeScriptSpy).toHaveBeenCalledTimes(1))
        expect(executeScriptSpy).toHaveBeenLastCalledWith(1, [
            'video_netflix.js',
        ])
    })
})
