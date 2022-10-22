import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrentAnimeDisplay from '../CurrentAnimeDisplay';
import { showCurrentWatchingAlertOnPopup } from '../../helpers/storageHelpers';
import LibraryEntry from '../../models/LibraryEntry';
import AnimeEpisode from '../../models/AnimeEpisode';

describe('Current anime display', () => {
    const showAnime = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('does not render if there is no anime playing', () => {
        render(<CurrentAnimeDisplay showAnime={showAnime} />);

        expect(screen.queryByRole('alert')).toBeNull();
    });

    it('does render if an anime is playing', async () => {
        const libraryEntry = new LibraryEntry({
            _id: 12345,
            _anime: {
                _title: 'One Piece',
            },
        });
        const episodeData = new AnimeEpisode({
            _number: 1017,
        });
        showCurrentWatchingAlertOnPopup(libraryEntry, episodeData);

        render(<CurrentAnimeDisplay showAnime={showAnime} />);

        await waitFor(() =>
            expect(
                screen.getByText(
                    /you are currently watching episode 1017 of one piece\./i
                )
            ).toBeInTheDocument()
        );
    });

    it('shows anime when clicking see details', async () => {
        const libraryEntry = new LibraryEntry({
            _id: 12345,
            _anime: {
                _title: 'One Piece',
            },
        });
        const episodeData = new AnimeEpisode({
            _number: 1017,
        });
        showCurrentWatchingAlertOnPopup(libraryEntry, episodeData);

        render(<CurrentAnimeDisplay showAnime={showAnime} />);

        await waitFor(() =>
            expect(
                screen.getByText(
                    /you are currently watching episode 1017 of one piece\./i
                )
            ).toBeInTheDocument()
        );

        userEvent.click(screen.getByText(/see details\./i));
        expect(showAnime).toHaveBeenCalledTimes(1);
        expect(showAnime).toHaveBeenLastCalledWith(12345);
    });
});
