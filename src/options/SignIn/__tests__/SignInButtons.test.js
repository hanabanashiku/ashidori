import React from 'react';
import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import SignInButtons from '../SignInButtons';
import MyAnimeListProvider from '../../../providers/MyAnimeListProvider';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Sign in buttons', () => {
    const originalWindow = window.location;
    const malAuthorizeSpy = jest.spyOn(MyAnimeListProvider, 'authorize');

    beforeAll(() => {
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: {
                ...originalWindow,
                reload: jest.fn(),
            },
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: originalWindow,
        });
    });

    function Component() {
        return (
            <MemoryRouter>
                <SignInButtons />
            </MemoryRouter>
        );
    }

    it('renders buttons for services', () => {
        render(<Component />);

        expect(screen.getByRole('img', { name: /kitsu/i })).toBeInTheDocument();
        expect(
            screen.getByRole('img', { name: /my anime list/i })
        ).toBeInTheDocument();
        // expect(screen.getByRole("img", { name: "AniList" })).toBeInTheDocument();
    });

    it('clicking the Kitsu sign in button navigates to the sign in page', () => {
        render(<Component />);

        userEvent.click(
            within(
                screen.getByRole('img', { name: /kitsu/i }).parentElement
            ).getByRole('button', /sign in/i)
        );

        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith('signin/kitsu');
    });

    it('clicking the MyAnimeList sign in button starts the MAL OAuth2 redirect', async () => {
        malAuthorizeSpy.mockResolvedValue();

        render(<Component />);

        userEvent.click(
            within(
                screen.getByRole('img', { name: /my anime list/i })
                    .parentElement
            ).getByRole('button', /sign in/i)
        );

        expect(malAuthorizeSpy).toHaveBeenCalledTimes(1);
        await waitFor(() =>
            expect(window.location.reload).toHaveBeenCalledTimes(1)
        );
    });
});
