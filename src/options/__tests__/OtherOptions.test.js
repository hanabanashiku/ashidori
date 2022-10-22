import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import OtherOptions from '../OtherOptions';
import Settings from '../Settings';
import { TITLE_LANGUAGE_PREFERENCES } from '../../enums';

describe('Other options section', () => {
    async function waitForLoad() {
        return waitFor(() =>
            expect(
                screen.getByRole('heading', { name: /options/i })
            ).toBeInTheDocument()
        );
    }

    //   afterEach(() => {
    //     jest.clearAllMocks();
    //   });

    it('renders default values', async () => {
        render(<OtherOptions />);
        await waitForLoad();

        expect(
            screen.getByRole('checkbox', {
                name: /automatically update my anime list after watching an episode\./i,
            })
        ).toBeChecked();

        expect(
            screen.getByRole('spinbutton', {
                name: /wait minutes before updating episode progress\./i,
            })
        ).toHaveValue(10);

        expect(
            screen.getByRole('checkbox', {
                name: /ask before updating episode progress/i,
            })
        ).toBeChecked();

        expect(
            screen.getByRole('checkbox', {
                name: /ask before adding a new series/i,
            })
        ).toBeChecked();
    });

    describe('renders default values for show title question', () => {
        it('for english speakers', async () => {
            browser.i18n.getUILanguage.mockReturnValue('en-US');
            render(<OtherOptions />);
            await waitForLoad();

            expect(
                screen.getByRole('radio', { name: /canonical title/i })
            ).toBeChecked();
        });

        it('for other speakers', async () => {
            browser.i18n.getUILanguage.mockReturnValue('ja-JP');
            render(<OtherOptions />);
            await waitForLoad();

            expect(
                screen.getByRole('radio', { name: /ui language/i })
            ).toBeChecked();
        });
    });

    it('toggling the list update feature updates the setting', async () => {
        await Settings.setListUpdatingEnabled(false);
        render(<OtherOptions />);
        await waitForLoad();

        screen
            .getByRole('checkbox', {
                name: /automatically update my anime list after watching an episode/i,
            })
            .click();

        expect(await Settings.listUpdatingEnabled()).toBeTruthy();

        screen
            .getByRole('checkbox', {
                name: /automatically update my anime list after watching an episode/i,
            })
            .click();
    });

    it('updating the minutes before updating update the settings', async () => {
        await Settings.setShouldUpdateAfterMinutes(0);
        render(<OtherOptions />);
        await waitForLoad();

        const field = screen.getByRole('spinbutton', {
            name: /wait minutes before updating episode progress\./i,
        });
        userEvent.clear(field);
        userEvent.type(field, '5');

        expect(await Settings.shouldUpdateAfterMinutes()).toBe(5);
    });

    it('toggling the ask before updating episode progress field toggles the setting', async () => {
        await Settings.setShouldShowUpdatePopup(false);
        render(<OtherOptions />);
        await waitForLoad();

        screen
            .getByRole('checkbox', {
                name: /ask before updating episode progress/i,
            })
            .click();

        expect(await Settings.shouldShowUpdatePopup()).toBeTruthy();
    });

    it('toggling the ask before adding series field toggles the setting', async () => {
        await Settings.setShouldShowAddPopup(false);
        render(<OtherOptions />);
        await waitForLoad();

        screen
            .getByRole('checkbox', {
                name: /ask before adding a new series/i,
            })
            .click();

        expect(await Settings.shouldShowAddPopup()).toBeTruthy();
    });

    it('toggling the update anime list box enables/disables child fields', async () => {
        render(<OtherOptions />);
        await waitForLoad();

        expect(
            screen.getByRole('spinbutton', {
                name: /wait minutes before updating episode progress\./i,
            })
        ).toBeEnabled();

        expect(
            screen.getByRole('checkbox', {
                name: /ask before updating episode progress/i,
            })
        ).toBeEnabled();

        expect(
            screen.getByRole('checkbox', {
                name: /ask before adding a new series/i,
            })
        ).toBeEnabled();

        screen
            .getByRole('checkbox', {
                name: /automatically update my anime list after watching an episode/i,
            })
            .click();

        expect(
            screen.getByRole('spinbutton', {
                name: /wait minutes before updating episode progress\./i,
            })
        ).toBeDisabled();

        expect(
            screen.getByRole('checkbox', {
                name: /ask before updating episode progress/i,
            })
        ).toBeDisabled();

        expect(
            screen.getByRole('checkbox', {
                name: /ask before adding a new series/i,
            })
        ).toBeDisabled();
    });

    it('updating the title preference updates the title setting', async () => {
        await Settings.setTitleLanguagePreference(
            TITLE_LANGUAGE_PREFERENCES.ROMAJI
        );
        render(<OtherOptions />);
        await waitForLoad();

        screen
            .getByRole('radio', {
                name: /ui language/i,
            })
            .click();

        expect(await Settings.getTitleLanguagePreference()).toBe(
            TITLE_LANGUAGE_PREFERENCES.UI_LANGUAGE
        );
    });

    it('has no aXe violations', async () => {
        const { container } = render(<OtherOptions />);
        await waitForLoad();

        expect(await axe(container)).toHaveNoViolations();
    });
});
