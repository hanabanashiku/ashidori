import React from 'react'
import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Popup from '../Popup'
import * as builder from '../../providers/builder'
import MockApiProvider from '../../__mocks__/MockApiProvider'
import PagedData from '../../models/PagedData'
import LibraryEntry from '../../models/LibraryEntry'
import { LIST_STATUS } from '../../enums'
import MESSAGE_TYPES from '../../messageTypes'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}))

describe('Popup window', () => {
    let apiInstanceSpy
    const api = new MockApiProvider()

    beforeEach(() => {
        apiInstanceSpy = jest
            .spyOn(builder, 'getApiInstance')
            .mockResolvedValue(api)
        api.isAuthenticated.mockResolvedValue(true)
        api.getAnimeListByStatus.mockResolvedValue(new PagedData())
    })

    afterEach(() => {
        jest.clearAllMocks()
        apiInstanceSpy.mockRestore()
        browser.storage.local.clear()
    })

    // eslint-disable-next-line react/prop-types
    function Component({ search = '' }) {
        return (
            <MemoryRouter initialEntries={[{ pathname: '/', search }]}>
                <Routes>
                    <Route path="/" element={<Popup />} />
                </Routes>
            </MemoryRouter>
        )
    }

    it('shows loading spinner on launch', () => {
        const { getByRole } = render(<Component />)

        expect(getByRole('progressbar')).toBeInTheDocument()
    })

    it('clicking the settings cog opens the options page', async () => {
        window.close = jest.fn()
        browser.runtime.getManifest.mockReturnValue({
            options_ui: {
                page: 'options.html',
            },
        })
        browser.runtime.getURL.mockReturnValue(
            'chrome-extension://options.html'
        )

        render(<Component />)

        await waitFor(() =>
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
        )

        userEvent.click(screen.getByLabelText('Settings'))
        expect(browser.tabs.create).toHaveBeenCalledTimes(1)
        expect(browser.tabs.create).toHaveBeenLastCalledWith({
            url: 'chrome-extension://options.html',
            active: true,
        })
    })

    it('shows login page when the user is not logged in', async () => {
        apiInstanceSpy.mockResolvedValueOnce(null)
        window.close = jest.fn()
        browser.runtime.getManifest.mockReturnValue({
            options_ui: {
                page: 'options.html',
            },
        })
        browser.runtime.getURL.mockReturnValue(
            'chrome-extension://options.html'
        )

        render(<Component />)

        await waitFor(() =>
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
        )

        const loginButton = screen.getByText('Log In')
        expect(loginButton).toBeInTheDocument()
        userEvent.click(loginButton)
        expect(browser.tabs.create).toHaveBeenCalledTimes(1)
    })

    it('shows error page when an error occurs', async () => {
        api.getAnimeListByStatus.mockRejectedValueOnce()

        render(<Component />)

        await waitFor(() =>
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
        )

        expect(screen.getByText(/An error has occurred\./i)).toBeInTheDocument()
    })

    describe('currently watching alert', () => {
        it('is rendered when an anime is being watched', async () => {
            browser.storage.local.set({
                current_anime: {
                    libraryEntryId: '12345',
                    title: 'My Hero Academia',
                    episodeNumber: 5,
                },
            })

            const { getByText, queryByRole } = render(<Component />)

            await waitFor(() =>
                expect(queryByRole('progressbar')).not.toBeInTheDocument()
            )

            expect(
                getByText(
                    'You are currently watching episode 5 of My Hero Academia.'
                )
            ).toBeInTheDocument()
            const link = getByText('See details.')
            expect(link).not.toBeNull()
        })

        it('is not rendered by default', async () => {
            const { queryByTestId, queryByRole } = render(<Component />)

            await waitFor(() =>
                expect(queryByRole('progressbar')).not.toBeInTheDocument()
            )

            expect(queryByTestId('current-watching-alert')).toBeNull()
        })
    })

    it('renders the list tabs', async () => {
        const { getByText, queryByRole } = render(<Component />)

        await waitFor(() =>
            expect(queryByRole('progressbar')).not.toBeInTheDocument()
        )

        expect(getByText('Watching')).toBeInTheDocument()
        expect(getByText('Completed')).toBeInTheDocument()
        expect(getByText('Planned')).toBeInTheDocument()
        expect(getByText('On hold')).toBeInTheDocument()
        expect(getByText('Dropped')).toBeInTheDocument()
    })

    it('clicking a tab selects it', async () => {
        const shouldBeSelected = (element) =>
            expect(element).toHaveAttribute('aria-selected', 'true')

        const { getByText, queryByRole } = render(<Component />)

        await waitFor(() =>
            expect(queryByRole('progressbar')).not.toBeInTheDocument()
        )

        const watching = getByText('Watching')
        const completed = getByText('Completed')
        const planned = getByText('Planned')
        const hold = getByText('On hold')
        const dropped = getByText('Dropped')

        shouldBeSelected(watching)

        act(() => userEvent.click(completed))
        shouldBeSelected(completed)

        act(() => userEvent.click(planned))
        shouldBeSelected(planned)

        act(() => userEvent.click(hold))
        shouldBeSelected(hold)

        act(() => userEvent.click(dropped))
        shouldBeSelected(dropped)

        act(() => userEvent.click(watching))
        shouldBeSelected(watching)
    })

    it('clicking an anime item reveals its detail page', async () => {
        api.getAnimeListByStatus.mockResolvedValueOnce(
            new PagedData({
                data: [
                    new LibraryEntry({
                        _id: '12345',
                        _progress: 5,
                        _status: LIST_STATUS.CURRENT,
                        _anime: {
                            _id: '12',
                            _title: 'One Piece',
                        },
                    }),
                ],
                total: 1,
                limit: 25,
                page: 0,
            })
        )
        api.getSingleLibraryEntry.mockResolvedValueOnce(
            new LibraryEntry({
                _id: '12345',
                _progress: 5,
                _status: LIST_STATUS.CURRENT,
                _anime: {
                    _id: '12',
                    _title: 'One Piece',
                },
            })
        )

        const { getByText, queryAllByRole } = render(<Component />)

        await waitFor(() => expect(queryAllByRole('tab')).not.toHaveLength(0))

        act(() => userEvent.click(getByText('One Piece')))
        expect(api.getSingleLibraryEntry).toHaveBeenCalledTimes(1)
        expect(api.getSingleLibraryEntry).toHaveBeenLastCalledWith('12345')
        await waitFor(() =>
            expect(queryAllByRole('progressbar')).toHaveLength(0)
        )
        expect(getByText('One Piece')).toBeInTheDocument()
    })

    it('recieving a show anime redirect opens the anime detail page', async () => {
        api.getAnimeListByStatus.mockResolvedValueOnce(
            new PagedData({
                data: [
                    new LibraryEntry({
                        _id: '12345',
                        _progress: 5,
                        _status: LIST_STATUS.CURRENT,
                        _anime: {
                            _id: '12',
                            _title: 'One Piece',
                        },
                    }),
                ],
                total: 1,
                limit: 25,
                page: 0,
            })
        )
        api.getSingleLibraryEntry.mockResolvedValue(
            new LibraryEntry({
                _id: '12345',
                _progress: 5,
                _status: LIST_STATUS.CURRENT,
                _anime: {
                    _id: '12',
                    _title: 'One Piece',
                },
            })
        )

        render(<Component search="?detail=12345" />)

        await waitFor(() => expect(mockNavigate).toHaveBeenCalled())
        expect(mockNavigate).toHaveBeenLastCalledWith('detail/12345')
    })

    it('recieving a show anime message opens the anime detail page', async () => {
        api.getAnimeListByStatus.mockResolvedValueOnce(
            new PagedData({
                data: [
                    new LibraryEntry({
                        _id: '12345',
                        _progress: 5,
                        _status: LIST_STATUS.CURRENT,
                        _anime: {
                            _id: '12',
                            _title: 'One Piece',
                        },
                    }),
                ],
                total: 1,
                limit: 25,
                page: 0,
            })
        )
        api.getSingleLibraryEntry.mockResolvedValue(
            new LibraryEntry({
                _id: '12345',
                _progress: 5,
                _status: LIST_STATUS.CURRENT,
                _anime: {
                    _id: '12',
                    _title: 'One Piece',
                },
            })
        )

        const { getByText, queryAllByRole } = render(<Component />)

        await waitFor(() => expect(queryAllByRole('tab')).not.toHaveLength(0))

        browser.runtime.sendMessage({
            type: MESSAGE_TYPES.SHOW_ANIME_DETAIL,
            payload: {
                libraryEntryId: '12345',
            },
        })
        expect(api.getSingleLibraryEntry).toHaveBeenCalled()
        expect(api.getSingleLibraryEntry).toHaveBeenLastCalledWith('12345')
        await waitFor(() =>
            expect(queryAllByRole('progressbar')).toHaveLength(0)
        )
        expect(getByText('One Piece')).toBeInTheDocument()
    })

    it('shows the search page when clicking on the fab button', async () => {
        render(<Component />)

        await waitFor(() =>
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
        )
        userEvent.click(screen.getByRole('button', { name: /search/i }))
        expect(
            screen.getByText(/enter a search term to continue/i)
        ).toBeInTheDocument()
    })
})
