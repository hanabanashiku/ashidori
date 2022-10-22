import React from 'react';
import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListDisplay from '..';
import MockApiProvider from '../../../../__mocks__/MockApiProvider';
import LibraryEntry from '../../../../models/LibraryEntry';
import AnimeSeries from '../../../../models/AnimeSeries';
import UserData from '../../../../models/UserData';
import { LIST_STATUS, PROVIDERS } from '../../../../enums';
import MESSAGE_TYPES from '../../../../messageTypes';

describe('List display component', () => {
    const api = new MockApiProvider();
    const entry = new LibraryEntry({
        _id: '12345',
        _status: LIST_STATUS.CURRENT,
        _rating: 8,
        _progress: 1010,
        _anime: new AnimeSeries({
            _title: 'One Piece',
            _episodeCount: 0,
            _link: 'https://kitsu.io/one-piece',
        }),
    });
    const userData = new UserData({
        _provider: PROVIDERS.KITSU,
    });

    it('renders the anime title', () => {
        const { getByText } = render(
            <ListDisplay libraryEntry={entry} api={api} userData={userData} />
        );
        expect(getByText('One Piece')).toBeInTheDocument();
    });

    it('renders the anime status', () => {
        const { getByText } = render(
            <ListDisplay libraryEntry={entry} api={api} userData={userData} />
        );
        expect(getByText('Currently watching')).toBeInTheDocument();
    });

    it('renders the current progress', () => {
        const { getByText } = render(
            <ListDisplay libraryEntry={entry} api={api} userData={userData} />
        );
        expect(getByText('1010')).toBeInTheDocument();
    });

    it('renders the total number of episodes', () => {
        let newEntry = new LibraryEntry({
            ...entry,
            _anime: {
                ...entry.anime,
                _episodeCount: 1011,
            },
        });
        const { getByText } = render(
            <ListDisplay
                libraryEntry={newEntry}
                api={api}
                userData={userData}
            />
        );
        expect(getByText('/ 1011')).toBeInTheDocument();
    });

    test.each([
        LIST_STATUS.COMPLETED,
        LIST_STATUS.DROPPED,
        LIST_STATUS.NOT_WATCHING,
    ])(
        `does not render the progress widget if the show is not in progress - %d`,
        (status) => {
            const newEntry = new LibraryEntry({
                _id: '12345',
                _status: status,
                _rating: 8,
                _progress: 1010,
                _anime: new AnimeSeries({
                    _title: 'One Piece',
                    _episodeCount: 0,
                }),
            });

            const { queryByText } = render(
                <ListDisplay
                    libraryEntry={newEntry}
                    api={api}
                    userData={userData}
                />
            );

            expect(queryByText('1010')).toBeFalsy();
        }
    );

    it('renders the rating widget', () => {
        const { getByTestId, getByLabelText } = render(
            <ListDisplay libraryEntry={entry} api={api} userData={userData} />
        );

        const rating = getByTestId('ashidori-anime-rating');
        expect(rating).not.toBeNull();
        expect(getByLabelText('8 Stars')).toBeChecked();
    });

    it('calls api on rating change', () => {
        const { getByLabelText } = render(
            <ListDisplay libraryEntry={entry} api={api} userData={userData} />
        );

        act(() => userEvent.click(getByLabelText('9 Stars')));
        expect(api.updateLibraryItem).toHaveBeenCalledTimes(1);
        expect(api.updateLibraryItem).toHaveBeenLastCalledWith('12345', {
            rating: 9,
        });
    });

    it('reverts the rating widget if the update fails', () => {
        api.updateLibraryItem.mockRejectedValueOnce({
            response: {
                status: 400,
            },
        });
        const { getByLabelText } = render(
            <ListDisplay libraryEntry={entry} api={api} userData={userData} />
        );

        act(() => userEvent.click(getByLabelText('9 Stars')));
        expect(api.updateLibraryItem).toHaveBeenCalled();
        expect(getByLabelText('9 Stars')).not.toBeChecked();
    });

    it('does not render the rating widget if the show is not in the list', () => {
        const newEntry = new LibraryEntry({
            _status: LIST_STATUS.NOT_WATCHING,
            _anime: new AnimeSeries({
                _title: 'One Piece',
                _episodeCount: 0,
            }),
        });
        const { queryByTestId } = render(
            <ListDisplay
                libraryEntry={newEntry}
                api={api}
                userData={userData}
            />
        );

        expect(queryByTestId('ashidori-anime-rating')).toBeFalsy();
    });

    it('Clicking the view on provider button opens the external link', () => {
        const { getByText } = render(
            <ListDisplay libraryEntry={entry} api={api} userData={userData} />
        );

        const button = getByText('View on Kitsu');
        expect(button).toBeInTheDocument();
        expect(button.getAttribute('href')).toBe('https://kitsu.io/one-piece');
    });

    it('Clicking the open in ashidori button opens the anime detail in a popup window on chrome', () => {
        const { getByText } = render(
            <ListDisplay libraryEntry={entry} api={api} userData={userData} />
        );

        const button = getByText('Open in Ashidori');
        expect(button).toBeInTheDocument();
        act(() => userEvent.click(button));

        expect(browser.runtime.sendMessage).toHaveBeenCalledTimes(1);
        expect(browser.runtime.sendMessage).toHaveBeenLastCalledWith({
            type: MESSAGE_TYPES.SHOW_ANIME_DETAIL_POPUP,
            payload: {
                libraryEntryId: '12345',
            },
        });
    });
});
