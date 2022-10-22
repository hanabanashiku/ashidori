import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import KitsuSignIn from '..';
import { MemoryRouter } from 'react-router-dom';
import MockApiProvider from '../../../../__mocks__/MockApiProvider';
import * as builder from '../../../../providers/builder';
import { PROVIDERS } from '../../../../enums';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Kitsu sign in view', () => {
    const api = new MockApiProvider();
    const getApiInstanceSpy = jest
        .spyOn(builder, 'getApiInstance')
        .mockResolvedValue(null);
    const resetApiInstanceSpy = jest.spyOn(builder, 'resetApiInstance');
    jest.spyOn(builder, 'createApiInstance').mockImplementation((provider) => {
        if (provider === PROVIDERS.KITSU) {
            return api;
        }
        return null;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    function Component() {
        return (
            <MemoryRouter>
                <KitsuSignIn />
            </MemoryRouter>
        );
    }

    it('renders the login form', () => {
        render(<Component />);

        expect(
            screen.getByRole('textbox', { name: /email/i })
        ).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it('redirects to options page if the user is already authenticated', async () => {
        getApiInstanceSpy.mockResolvedValueOnce(api);
        api.isAuthenticated.mockResolvedValue(true);

        render(<Component />);

        await waitFor(() => expect(mockNavigate).toBeCalled());
        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('requires the email field', () => {
        render(<Component />);

        userEvent.type(screen.getByLabelText(/password/i), 'password123');
        userEvent.click(screen.getByRole('button', { name: /log in/i }));

        expect(api.authorize).not.toHaveBeenCalled();
    });

    it('requires the password field', () => {
        render(<Component />);

        userEvent.type(
            screen.getByRole('textbox', { name: /email/i }),
            'john.doe@example.com'
        );
        userEvent.click(screen.getByRole('button', { name: /log in/i }));

        expect(api.authorize).not.toHaveBeenCalled();
    });

    it('returns to options page on success', async () => {
        api.authorize.mockResolvedValue();
        render(<Component />);

        userEvent.type(
            screen.getByRole('textbox', { name: /email/i }),
            'john.doe@example.com'
        );
        userEvent.type(screen.getByLabelText(/password/i), 'password123');
        userEvent.click(screen.getByRole('button', { name: /log in/i }));

        await waitFor(() => expect(api.authorize).toHaveBeenCalled());
        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('shows error on bad password', async () => {
        api.authorize.mockRejectedValue();
        render(<Component />);

        userEvent.type(
            screen.getByRole('textbox', { name: /email/i }),
            'john.doe@example.com'
        );
        userEvent.type(screen.getByLabelText(/password/i), 'password123');
        userEvent.click(screen.getByRole('button', { name: /log in/i }));

        await waitFor(() => expect(api.authorize).toHaveBeenCalled());
        expect(
            screen.getByText(/Invalid username or password\./i)
        ).toBeInTheDocument();
        expect(resetApiInstanceSpy).toHaveBeenCalledTimes(1);
    });

    it('returns to options page on cancel', () => {
        render(<Component />);

        userEvent.click(screen.getByRole('button', { name: /cancel/i }));

        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('has no aXe violations', async () => {
        const { container } = render(<Component />);

        expect(await axe(container)).toHaveNoViolations();
    });
});
