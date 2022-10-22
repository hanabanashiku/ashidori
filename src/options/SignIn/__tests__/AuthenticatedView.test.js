import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthenticatedView from '../AuthenticatedView';
import MockApiProvider from '../../../__mocks__/MockApiProvider';
import * as builder from '../../../providers/builder';
import UserData from '../../../models/UserData';
import { PROVIDERS } from '../../../enums';

describe('Authenticated view', () => {
    const api = new MockApiProvider();
    const reset = jest.fn();
    const userData = new UserData({
        _id: '12345',
        _name: 'testUser',
        _url: 'https://kitsu.io/testUser',
        _avatarUrl: 'https://kitsu.io/testUser.png',
        _provider: PROVIDERS.KITSU,
    });

    jest.spyOn(builder, 'getApiInstance').mockResolvedValue(api);

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the authenticated view', () => {
        render(<AuthenticatedView userData={userData} reset={reset} />);

        expect(
            screen.getByText(/you are logged in using kitsu/i)
        ).toBeInTheDocument();
        expect(
            screen.getByRole('img', { name: userData.username })
        ).toHaveAttribute('src', userData.avatarUrl);
        expect(
            screen.getByRole('link', { name: /view profile/i })
        ).toHaveAttribute('href', userData.url);
    });

    it('signs out of the services when clicking the sign out button', async () => {
        render(<AuthenticatedView userData={userData} reset={reset} />);

        userEvent.click(screen.getByRole('button', { name: /sign out/i }));
        await waitFor(() => expect(api.signOut).toHaveBeenCalledTimes(1));
        expect(reset).toHaveBeenCalledTimes(1);
    });
});
