import React from 'react';
import { render, screen, waitFor } from 'test-utils';
import userEvent from '@testing-library/user-event';
import AnimeSearch from '..';
import MockApiProvider from '../../../__mocks__/MockApiProvider';
import {
    getCachedSearchPage,
    cacheSearchPage,
    resetSearchPage,
} from '../../../helpers/storageHelpers';
import library from '../../../__mocks__/library';
import PagedData from '../../../models/PagedData';

describe('Anime search window', () => {
    const props = {
        api: new MockApiProvider(),
        toggleSearch: jest.fn(),
        showAnime: jest.fn(),
    };

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.clearAllMocks();
        resetSearchPage();
    });

    it('renders the search box', () => {
        render(<AnimeSearch {...props} />);

        expect(
            screen.getByRole('textbox', { name: /search/i })
        ).toBeInTheDocument();
        expect(
            screen.getByText(/enter a search term to continue/i)
        ).toBeInTheDocument();
    });

    it('throttles search endpoint when typing and caches search query', async () => {
        render(<AnimeSearch {...props} />);

        userEvent.type(
            screen.getByRole('textbox', { name: /search/i }),
            'full metal alchemist'
        );

        await waitFor(() => expect(props.api.findAnime).toHaveBeenCalled());
        expect(props.api.findAnime).toHaveBeenNthCalledWith(1, 'f', 0, 20);
        jest.runAllTimers();
        expect(props.api.findAnime).toHaveBeenLastCalledWith(
            'full metal alchemist',
            0,
            20
        );
        const [query, page] = getCachedSearchPage();
        expect(query).toBe('full metal alchemist');
        expect(page).toBe('0');
    });

    it('renders data from search', async () => {
        props.api.findAnime.mockResolvedValue(
            new PagedData({
                data: library.map((item) => item.anime),
                page: 0,
                limit: 20,
                total: library.length,
            })
        );

        render(<AnimeSearch {...props} />);

        userEvent.type(
            screen.getByRole('textbox', { name: /search/i }),
            'full metal alchemist'
        );

        await waitFor(() => expect(props.api.findAnime).toHaveBeenCalled());
        jest.runAllTimers();

        expect(
            screen.getByRole('row', { name: /one piece ongoing fall 1999/i })
        ).toBeInTheDocument();

        expect(
            screen.getByRole('row', {
                name: /sono bisque doll wa koi wo suru 4 winter 2022/i,
            })
        );
    });

    it('shows error alert on error', async () => {
        props.api.findAnime.mockRejectedValue('error');

        render(<AnimeSearch {...props} />);
        userEvent.type(screen.getByRole('textbox', { name: /search/i }), 'f');

        await waitFor(() => expect(props.api.findAnime).toHaveBeenCalled());

        expect(
            screen.getByText(
                /an error occurred while returning search results\./i
            )
        ).toBeInTheDocument();
    });

    it('renders data from cache', async () => {
        cacheSearchPage('full metal alchemist', 0);
        props.api.findAnime.mockResolvedValue(
            new PagedData({
                data: library.map((item) => item.anime),
                page: 0,
                limit: 20,
                total: library.length,
            })
        );

        render(<AnimeSearch {...props} />);

        await waitFor(() => expect(props.api.findAnime).toHaveBeenCalled());
        jest.runAllTimers();

        expect(screen.getByRole('textbox', { name: /search/i })).toHaveValue(
            'full metal alchemist'
        );
        expect(
            screen.getByRole('row', { name: /one piece ongoing fall 1999/i })
        ).toBeInTheDocument();

        expect(
            screen.getByRole('row', {
                name: /sono bisque doll wa koi wo suru 4 winter 2022/i,
            })
        );
    });

    it('clicking on a row shows the anime', async () => {
        props.api.findAnime.mockResolvedValue(
            new PagedData({
                data: library.map((item) => item.anime),
                page: 0,
                limit: 20,
                total: library.length,
            })
        );

        render(<AnimeSearch {...props} />);

        userEvent.type(
            screen.getByRole('textbox', { name: /search/i }),
            'one piece'
        );

        await waitFor(() => expect(props.api.findAnime).toHaveBeenCalled());
        jest.runAllTimers();

        userEvent.click(screen.getByRole('cell', { name: /one piece/i }));
        expect(props.showAnime).toHaveBeenCalledTimes(1);
        expect(props.showAnime).toHaveBeenLastCalledWith('12', false);
    });

    it('clicking the next button gets data for the next page', async () => {
        const data = library.map((item) => item.anime);
        props.api.findAnime
            .mockResolvedValueOnce(
                new PagedData({
                    data: [data[0]],
                    page: 0,
                    limit: 1,
                    total: 40,
                })
            )
            .mockResolvedValueOnce(
                new PagedData({
                    data: [data[1]],
                    page: 1,
                    limit: 1,
                    total: 40,
                })
            );

        render(<AnimeSearch {...props} />);

        userEvent.type(screen.getByRole('textbox', { name: /search/i }), 'o');

        await waitFor(() => expect(props.api.findAnime).toHaveBeenCalled());
        jest.runAllTimers();

        userEvent.click(
            screen.getByRole('button', { name: /go to next page/i })
        );

        expect(props.api.findAnime).toHaveBeenNthCalledWith(1, 'o', 0, 20);
        expect(props.api.findAnime).toHaveBeenNthCalledWith(2, 'o', 1, 20);
    });

    it('clicking the back button clears the cache and closes the search', () => {
        cacheSearchPage('full metal alchemist', 0);
        props.api.findAnime.mockResolvedValue(
            new PagedData({
                data: [],
                page: 0,
                limit: 20,
                total: 0,
            })
        );

        render(<AnimeSearch {...props} />);

        userEvent.click(screen.getByRole('button', { name: /back/i }));

        expect(props.toggleSearch).toHaveBeenCalledTimes(1);
        const [query] = getCachedSearchPage();
        expect(query).toBeFalsy();
    });
});
