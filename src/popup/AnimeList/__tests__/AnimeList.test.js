import React from 'react';
import { render, screen, waitFor } from 'test-utils';
import userEvent from '@testing-library/user-event';
import MockApiProvider from '../../../__mocks__/MockApiProvider';
import library from '../../../__mocks__/library';
import PagedData from '../../../models/PagedData';
import { LIST_STATUS } from '../../../enums';
import AnimeList from '..';

describe('Anime list viewer', () => {
    const props = {
        hide: false,
        showAnime: jest.fn(),
        api: new MockApiProvider(),
        showError: jest.fn(),
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('hide flag hides the list', () => {
        const { container } = render(
            <AnimeList {...props} status={LIST_STATUS.CURRENT} hide={true} />
        );

        expect(container).toStrictEqual(render(null).container);
        expect(props.api.getAnimeListByStatus).not.toHaveBeenCalled();
    });

    test.each([
        [LIST_STATUS.CURRENT],
        [LIST_STATUS.COMPLETED],
        [LIST_STATUS.ON_HOLD],
        [LIST_STATUS.PLANNED],
    ])('renders anime list for status %p', async (status) => {
        props.api.getAnimeListByStatus.mockResolvedValueOnce(
            new PagedData({
                data: library,
                page: 0,
                limit: 100,
                total: library.length,
            })
        );

        render(<AnimeList {...props} status={status} />);

        expect(props.api.getAnimeListByStatus).toHaveBeenCalledTimes(1);
        await waitFor(() =>
            expect(screen.queryByTestId('loading-overlay')).toBeFalsy()
        );

        expect(screen.getByText(/title/i)).toBeInTheDocument();

        if (status === LIST_STATUS.CURRENT || status === LIST_STATUS.ON_HOLD) {
            expect(screen.getByText(/progress/i)).toBeInTheDocument();
            expect(screen.getByText(/500/)).toBeInTheDocument();
        }

        if (
            status === LIST_STATUS.CURRENT ||
            status === LIST_STATUS.COMPLETED
        ) {
            expect(screen.getByText('Rating')).toBeInTheDocument();
            expect(screen.getByText('8')).toBeInTheDocument();
        }

        expect(screen.getByText('ONE PIECE')).toBeInTheDocument();
        expect(
            screen.getByText('SONO BISQUE DOLL WA KOI WO SURU')
        ).toBeInTheDocument();
    });

    it('clicking an anime entry displays the anime detail', async () => {
        props.api.getAnimeListByStatus.mockResolvedValueOnce(
            new PagedData({
                data: library,
                page: 0,
                limit: 100,
                total: library.length,
            })
        );

        render(<AnimeList {...props} status={LIST_STATUS.CURRENT} />);

        await waitFor(() =>
            expect(screen.queryByTestId('loading-overlay')).toBeFalsy()
        );

        userEvent.click(screen.getByText('ONE PIECE'));
        expect(props.showAnime).toHaveBeenCalledWith('1');
    });

    it('sets error on error', async () => {
        props.api.getAnimeListByStatus.mockRejectedValueOnce();

        const { queryByTestId } = render(
            <AnimeList {...props} status={LIST_STATUS.CURRENT} />
        );

        await waitFor(() =>
            expect(queryByTestId('loading-overlay')).toBeFalsy()
        );

        expect(props.showError).toHaveBeenCalledTimes(1);
    });
});
