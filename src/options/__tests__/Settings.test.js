import Settings from '../Settings';
import {
    SERVICES,
    NOTIFY_EPSIODE_ANSWERS,
    TITLE_LANGUAGE_PREFERENCES,
} from '../../enums';

describe('App settings', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    async function callGetter(key) {
        switch (key) {
            case 'enabled_services':
                return Settings.getEnabledServices();
            case 'update_enabled':
                return Settings.listUpdatingEnabled();
            case 'update_delay':
                return Settings.shouldUpdateAfterMinutes();
            case 'enable_update_popup':
                return Settings.shouldShowUpdatePopup();
            case 'enable_add_popup':
                return Settings.shouldShowAddPopup();
            case 'should_check_for_new_episodes':
                return Settings.shouldCheckForNewEpisodes();
            case 'check_for_new_episodes_after':
                return Settings.checkForNewEpisodesAfterMinutes();
            case 'should_notify_for_new_episodes':
                return Settings.shouldNotifiyForNewEpisodes();
            case 'title_language_preference':
                return Settings.getTitleLanguagePreference();
            default:
                return Promise.reject('bad key');
        }
    }

    async function callSetter(key, value) {
        switch (key) {
            case 'enabled_services':
                return Settings.setEnabledServices(value);
            case 'update_enabled':
                return Settings.setListUpdatingEnabled(value);
            case 'update_delay':
                return Settings.setShouldUpdateAfterMinutes(value);
            case 'enable_update_popup':
                return Settings.setShouldShowUpdatePopup(value);
            case 'enable_add_popup':
                return Settings.setShouldShowAddPopup(value);
            case 'should_check_for_new_episodes':
                return Settings.setShouldCheckForNewEpisodes(value);
            case 'check_for_new_episodes_after':
                return Settings.setCheckForNewEpisodesAfterMinutes(value);
            case 'should_notify_for_new_episodes':
                return Settings.setNotifiyForNewEpisodes(value);
            case 'title_language_preference':
                return Settings.setTitleLanguagePreference(value);
            default:
                return Promise.reject('bad key');
        }
    }

    test.each([
        ['enabled_services', Object.values(SERVICES)],
        ['update_enabled', true],
        ['update_delay', 10],
        ['enable_update_popup', true],
        ['enable_add_popup', true],
        ['should_check_for_new_episodes', true],
        ['check_for_new_episodes_after', 60],
        ['should_notify_for_new_episodes', NOTIFY_EPSIODE_ANSWERS.LATEST],
    ])('returns default value for %p', async function (key, expected) {
        expect(await callGetter(key)).toStrictEqual(expected);
    });

    describe('getTitleLanguagePreference', () => {
        it('returns romaji titles by default for english speakers', async function () {
            browser.i18n.getUILanguage.mockReturnValue('en-US');

            expect(await Settings.getTitleLanguagePreference()).toBe(
                TITLE_LANGUAGE_PREFERENCES.ROMAJI
            );
        });

        it('returns native titles by default for other locales', async function () {
            browser.i18n.getUILanguage.mockReturnValue('ja-JP');

            expect(await Settings.getTitleLanguagePreference()).toBe(
                TITLE_LANGUAGE_PREFERENCES.UI_LANGUAGE
            );
        });
    });

    test.each([
        ['enabled_services', [SERVICES.CRUNCHYROLL]],
        ['update_enabled', false],
        ['update_delay', 5],
        ['enable_update_popup', false],
        ['enable_add_popup', false],
        ['should_check_for_new_episodes', false],
        ['check_for_new_episodes_after', 120],
        ['should_notify_for_new_episodes', NOTIFY_EPSIODE_ANSWERS.NEVER],
        ['title_language_preference', TITLE_LANGUAGE_PREFERENCES.UI_LANGUAGE],
    ])('gets and sets data for %p', async function (key, value) {
        browser.storage.sync.get.mockResolvedValueOnce({
            [key]: value,
        });
        await callSetter(key, value);
        expect(browser.storage.sync.set).toHaveBeenCalledTimes(1);
        expect(browser.storage.sync.set).toHaveBeenCalledWith({
            [key]: value,
        });

        const actualValue = await callGetter(key);
        expect(actualValue).toStrictEqual(value);

        expect(browser.storage.sync.get).toHaveBeenCalledTimes(1);
        expect(
            Object.keys(browser.storage.sync.get.mock.calls[0][0])
        ).toContain(key);
    });

    it('returns whether or not a service is enabled', async function () {
        await Settings.setEnabledServices([
            SERVICES.CRUNCHYROLL,
            SERVICES.NETFLIX,
        ]);

        expect(
            await Settings.isServiceEnabled(SERVICES.CRUNCHYROLL)
        ).toBeTruthy();
        expect(await Settings.isServiceEnabled(SERVICES.NETFLIX)).toBeTruthy();
        expect(await Settings.isServiceEnabled(SERVICES.HIDIVE)).toBeFalsy();
        expect(await Settings.isServiceEnabled(SERVICES.HULU)).toBeFalsy();
    });
});
