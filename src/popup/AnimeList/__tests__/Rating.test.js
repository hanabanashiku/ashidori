import React from 'react';
import { render, screen, fireEvent, waitFor } from 'test-utils';
import userEvent from '@testing-library/user-event';
import Rating from '../Rating';
import MockApiProvider from '../../../__mocks__/MockApiProvider';

describe('Rating cell', () => {
    const value = {
        id: '12345',
        rating: 8,
        api: new MockApiProvider(),
        refresh: jest.fn(),
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('dispalys the rating', () => {
        render(<Rating value={value} />);

        expect(screen.getByText('8')).toBeInTheDocument();
    });

    it('does not display an empty rating', () => {
        render(
            <Rating
                value={{
                    ...value,
                    rating: null,
                }}
            />
        );

        expect(screen.getByText('Rate')).toBeInTheDocument();
    });

    it('clicking switches to edit mode', () => {
        const { container } = render(<Rating value={value} />);

        userEvent.click(container.firstChild);

        expect(screen.getByLabelText('Series rating')).toBeInTheDocument();
    });

    it('typing the escape button cancels the operation', () => {
        const { container } = render(<Rating value={value} />);

        userEvent.click(container.firstChild);
        const textBox = screen
            .getByLabelText('Series rating')
            .querySelector('input');
        userEvent.type(textBox, '9{esc}');

        expect(value.api.updateLibraryItem).not.toHaveBeenCalled();
        expect(textBox).not.toBeInTheDocument();
    });

    it('submitting the change updates the anime', async () => {
        const { container } = render(<Rating value={value} />);

        userEvent.click(container.firstChild);
        const textBox = screen
            .getByLabelText('Series rating')
            .querySelector('input');
        userEvent.type(textBox, '{backspace}10{enter}');

        await waitFor(() =>
            expect(value.api.updateLibraryItem).toHaveBeenCalled()
        );
        expect(value.api.updateLibraryItem).toHaveBeenLastCalledWith('12345', {
            rating: 10,
        });
    });

    it('blurring the field updates the anime', async () => {
        const { container } = render(<Rating value={value} />);

        userEvent.click(container.firstChild);
        const textBox = screen
            .getByLabelText('Series rating')
            .querySelector('input');
        userEvent.type(textBox, '{backspace}7');
        fireEvent.blur(textBox);

        await waitFor(() =>
            expect(value.api.updateLibraryItem).toHaveBeenCalled()
        );
        expect(value.api.updateLibraryItem).toHaveBeenLastCalledWith('12345', {
            rating: 7,
        });
    });
});
