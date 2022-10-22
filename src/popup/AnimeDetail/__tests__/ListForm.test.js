import React from 'react'
import { render, screen, act, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ListForm from '../ListForm'
import MockApiProvider from '../../../__mocks__/MockApiProvider'
import libraryEntry from '../../../__mocks__/libraryItem'
import { LIST_STATUS } from 'enums'
import LibraryEntry from '../../../models/LibraryEntry'

describe('Anime list form', () => {
    const props = {
        entry: libraryEntry,
        api: new MockApiProvider(),
        close: jest.fn(),
    }
    const mockDate = new Date('2022-05-21')

    function getFields() {
        const status = screen.getByLabelText('Library status').nextSibling
        const progress = screen.getByLabelText('Progress')
        const rating = document.querySelector('input[name=rating]')
        const startDate = screen.getByLabelText('Started')
        const finishedDate = screen.getByLabelText('Finished')
        const notes = screen.getByLabelText('Notes')

        return {
            status,
            progress,
            rating,
            startDate,
            finishedDate,
            notes,
        }
    }

    beforeEach(() => {
        jest.useFakeTimers().setSystemTime(mockDate)
    })

    afterEach(() => {
        jest.clearAllMocks()
        jest.useRealTimers()
    })

    it('renders fields with default values', () => {
        render(<ListForm {...props} />)

        const { status, progress, rating, startDate, finishedDate, notes } =
            getFields()

        expect(status).toHaveValue(`${LIST_STATUS.CURRENT}`)
        expect(progress).toHaveValue(1008)
        expect(rating).toHaveValue('8')
        expect(startDate).toHaveValue('01/30/2022')
        expect(finishedDate).toHaveValue('')
        expect(notes).toHaveValue('note')
    })

    it('hitting the cancel button closes the window', () => {
        render(<ListForm {...props} />)

        const button = screen.getByRole('button', { name: /cancel/i })
        act(() => userEvent.click(button))
        expect(props.close).toHaveBeenCalledTimes(1)
    })

    it('hitting save when no fields are dirty does not call the api', async () => {
        render(<ListForm {...props} />)

        const button = screen.getByRole('button', { name: /save/i })
        act(() => userEvent.click(button))
        await waitFor(() => expect(props.close).toHaveBeenCalledTimes(1))
        expect(props.api.updateLibraryItem).not.toHaveBeenCalled()
    })

    it('hitting save for new show adds to list and closes the view', async () => {
        const entry = new LibraryEntry({
            ...libraryEntry,
            _status: LIST_STATUS.NOT_WATCHING,
        })
        render(<ListForm {...props} entry={entry} />)

        const { progress, notes } = getFields()
        const button = screen.getByRole('button', { name: /save/i })

        userEvent.click(
            screen.getByRole('button', { name: /library status /i })
        )
        userEvent.click(screen.getByRole('option', { name: /Watching/ }))
        userEvent.clear(progress)
        userEvent.type(progress, '1')
        userEvent.clear(notes)
        userEvent.type(notes, 'test')

        act(() => userEvent.click(button))

        await waitFor(() =>
            expect(props.api.createLibraryItem).toHaveBeenCalledTimes(1)
        )
        expect(props.api.updateLibraryItem).not.toHaveBeenCalled()
        const call = props.api.createLibraryItem.mock.calls[0]
        expect(call[0]).toBe(props.entry.anime.id)
        expect(call[1].status).toBe(LIST_STATUS.CURRENT)
        expect(call[1].progress).toBe(1)
        expect(call[1].notes).toBe('test')
        expect(call[1].startDate - mockDate).toBeLessThan(1000)
        expect(props.close).toHaveBeenCalledTimes(1)
    })

    it('hitting save for new show adds to list and closes the view', async () => {
        const entry = new LibraryEntry({
            ...libraryEntry,
            _anime: {
                ...libraryEntry._anime,
                _episodeCount: 1020,
            },
        })
        render(<ListForm {...props} entry={entry} />)

        const button = screen.getByRole('button', { name: /save/i })

        userEvent.click(
            screen.getByRole('button', { name: /library status /i })
        )
        userEvent.click(
            screen.getByRole('option', { name: /finished watching/i })
        )

        act(() => userEvent.click(button))

        await waitFor(() =>
            expect(props.api.updateLibraryItem).toHaveBeenCalledTimes(1)
        )
        const call = props.api.updateLibraryItem.mock.calls[0]
        expect(call[0]).toBe(props.entry.id)
        expect(call[1].status).toBe(LIST_STATUS.COMPLETED)
        expect(call[1].progress).toBe(1020)
        expect(call[1].completedDate - mockDate).toBeLessThan(1000)
        expect(props.close).toHaveBeenCalledTimes(1)
    })

    it('hitting save patches the entry and closes the view', async () => {
        render(<ListForm {...props} />)

        const { status, progress, rating, startDate, finishedDate, notes } =
            getFields()
        const button = screen.getByRole('button', { name: /save/i })

        fireEvent.change(status, {
            target: { value: `${LIST_STATUS.CURRENT}` },
        })

        userEvent.clear(progress)
        userEvent.type(progress, '1005')

        fireEvent.change(rating, {
            target: {
                value: '9.5',
            },
        })

        fireEvent.change(startDate, { target: { value: '01/01/2018' } })
        fireEvent.blur(startDate)

        fireEvent.change(finishedDate, { target: { value: '01/02/2019' } })
        fireEvent.blur(finishedDate)

        userEvent.clear(notes)
        userEvent.type(notes, 'hello world')

        act(() => userEvent.click(button))

        await waitFor(() =>
            expect(props.api.updateLibraryItem).toHaveBeenCalledTimes(1)
        )
        expect(props.api.updateLibraryItem).toHaveBeenLastCalledWith(
            props.entry.id,
            {
                progress: 1005,
                rating: 9.5,
                notes: 'hello world',
            }
        )
        expect(props.close).toHaveBeenCalledTimes(1)
    })

    it('hitting save patches dirty fields only', async () => {
        render(<ListForm {...props} />)

        const { progress, notes } = getFields()

        const button = screen.getByRole('button', { name: /save/i })

        userEvent.clear(progress)
        userEvent.type(progress, '1006')

        userEvent.clear(notes)
        userEvent.type(notes, 'notes are good')

        act(() => userEvent.click(button))

        await waitFor(() =>
            expect(props.api.updateLibraryItem).toHaveBeenCalledTimes(1)
        )
        expect(props.api.updateLibraryItem).toHaveBeenLastCalledWith(
            props.entry.id,
            {
                progress: 1006,
                notes: 'notes are good',
            }
        )
        expect(props.close).toHaveBeenCalledTimes(1)
    })

    it('hides the delete button if the list status is not watching', () => {
        const entry = new LibraryEntry({
            ...libraryEntry,
            _status: LIST_STATUS.NOT_WATCHING,
        })

        render(<ListForm {...props} entry={entry} />)

        expect(
            screen.queryByRole('button', { name: /remove from list/i })
        ).toBeNull()
    })

    it('clicking the delete button shows the delete modal', () => {
        render(<ListForm {...props} />)

        const button = screen.getByRole('button', { name: /remove from list/i })
        act(() => userEvent.click(button))

        expect(
            screen.getByText('Delete this library entry?')
        ).toBeInTheDocument()
    })

    it('clicking cancel on the delete modal closes the delete modal', async () => {
        render(<ListForm {...props} />)

        const button = screen.getByRole('button', { name: /remove from list/i })
        act(() => userEvent.click(button))
        userEvent.click(screen.getByTestId('delete-modal-cancel'))

        await waitFor(() =>
            expect(screen.queryByText('Delete this library entry?')).toBeFalsy()
        )
        expect(props.api.removeLibraryItem).not.toHaveBeenCalled()
    })

    it('clicking delete on the delete modal callse the delete endpoint', async () => {
        render(<ListForm {...props} />)

        const button = screen.getByRole('button', { name: /remove from list/i })
        act(() => userEvent.click(button))
        userEvent.click(screen.getByRole('button', { name: /delete/i }))

        await waitFor(() => expect(props.close).toHaveBeenCalledTimes(1))
        expect(props.api.removeLibraryItem).toHaveBeenCalledTimes(1)
        expect(props.api.removeLibraryItem).toHaveBeenCalledWith(props.entry.id)
    })
})
