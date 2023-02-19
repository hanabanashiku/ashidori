import { waitFor } from '@testing-library/react';
import Settings from '../../../options/Settings';
import MockApiProvider from '../../../__mocks__/MockApiProvider';
import NetflixService from '../../../services/Netflix';
import MESSAGE_TYPES from '../../../messageTypes';
import { SERVICES, LIST_STATUS } from '../../../enums';
import AnimeEpisode from '../../../models/AnimeEpisode';
import UserData from '../../../models/UserData';
import LibraryEntry from '../../../models/LibraryEntry';
import AnimeSeries from '../../../models/AnimeSeries';

jest.mock('../../../options/Settings');
jest.genMockFromModule('../../../services/Netflix');
jest.mock('../../../services/Netflix');

describe('Netflix video content script', () => {
    const api = new MockApiProvider();

    let player = null;
    let historyStateUpdatedListener = null;

    const mockAnimeEpisode = new AnimeEpisode({
        _id: 'GVWU0Q2Z4',
        _title: 'The Best Guarantee • Buy the CD',
        _number: 9,
        _duration: 24,
        _series: new AnimeSeries({
            _id: 'GXJHM37WP',
            _title: 'Healer Girl',
            _streamingLinks: {
                [SERVICES.CRUNCHYROLL]:
                    'https://www.crunchyroll.com/series/GXJHM37WP',
            },
        }),
    });
    const mockUserData = new UserData({
        _id: '12345',
        _name: 'john.doe',
        _provider: 0,
    });
    const mockLibraryEntry = new LibraryEntry({
        _id: '1583135',
        _anime: {
            _id: '44494',
            _title: 'Healer Girl',
            _englishTitle: 'Healer Girl',
            _description:
                'The anime depicts the world of "Healer Girls" — high school girls who cure people with singing.\n\n(Source: Anime News Network)',
            _coverImage:
                'https://media.kitsu.io/anime/44494/poster_image/tiny-fd67c284dd61086b2363fa5035d1cb51.jpeg',
            _startDate: '2022-04-04T00:00:00.000Z',
            _endDate: null,
            _status: 0,
            _episodeCount: null,
            _episodeLength: null,
            _genres: [],
            _streamingLinks: {},
            _link: 'https://kitsu.io/anime/44494',
            _seasonCount: 0,
        },
        _progress: 8,
        _startDate: '2022-04-11T01:32:16.930Z',
        _rating: 5,
        _status: LIST_STATUS.CURRENT,
    });

    beforeEach(() => {
        Settings.getEnabledServices = jest
            .fn()
            .mockResolvedValue([SERVICES.NETFLIX]);
        browser.runtime.onMessage.addListener.mockImplementationOnce((fn) => {
            historyStateUpdatedListener = fn;
        });
        browser.runtime.getURL.mockReturnValue(
            'chrome-extension://static/scripts/inject_netflix.js'
        );

        initBody();
    });

    afterEach(() => {
        document.getElementsByTagName('html')[0].innerHTML = '';
        player = null;
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.resetModules();
    });

    function initBody() {
        player = document.createElement('div');
        player.setAttribute('data-uia', 'player');
        document.body.appendChild(player);
        mockUrl('https://www.netflix.com/watch/18561531?trackid=48434354');
    }

    function mockUrl(url) {
        global.window = Object.create(window);
        Object.defineProperty(window, 'location', {
            value: {
                href: url,
            },
        });
    }

    function requireScript() {
        jest.isolateModules(() => {
            jest.spyOn(
                jest.requireActual('../../../providers/builder'),
                'getApiInstance'
            ).mockResolvedValue(api);

            NetflixService.mockReturnValue({
                getEpisodeMetadata: jest
                    .fn()
                    .mockResolvedValue(mockAnimeEpisode),
            });

            api.getUserData.mockResolvedValue(mockUserData);
            api.resolveLibraryEntryFromAnimeEpisode.mockResolvedValue(
                mockLibraryEntry
            );

            mockInjectScript();

            require('../video');
        });
    }

    // This mocks the injected script from static/inject_netflix.js to get the current memberapi version
    function mockInjectScript() {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'ashidori-observer';
        input.value = 'https://www.netflix.com/memberapi/sdfddgdgad';
        document.body.appendChild(input);
    }

    it('does not activate if netflix is not enabled', () => {
        Settings.getEnabledServices = jest.fn().mockResolvedValue([]);
        requireScript();
        expect(historyStateUpdatedListener).toBeNull();
    });

    it('does activate if crunchyroll is enabled', async () => {
        Settings.getEnabledServices = jest
            .fn()
            .mockResolvedValue([SERVICES.NETFLIX]);

        requireScript();
        expect(Settings.getEnabledServices).toBeCalled();
        expect(historyStateUpdatedListener).toBeDefined();
        await waitFor(() =>
            expect(browser.runtime.sendMessage).toHaveBeenNthCalledWith(1, {
                type: MESSAGE_TYPES.ANIME_EPISODE_STARTED,
                payload: {
                    loadTime: expect.any(Date),
                    userData: mockUserData,
                    listEntry: mockLibraryEntry,
                    episodeData: mockAnimeEpisode,
                },
            })
        );
    });

    it('re-inits the script when switching to a new episode', async () => {
        Settings.getEnabledServices = jest
            .fn()
            .mockResolvedValue([SERVICES.NETFLIX]);

        requireScript();
        await waitFor(() => expect(historyStateUpdatedListener).not.toBeNull());
        mockInjectScript();
        historyStateUpdatedListener({
            type: MESSAGE_TYPES.HISTORY_STATE_UPDATED,
            payload: {
                url: 'https://www.netflix.com/watch/81054853',
            },
        });

        await waitFor(() =>
            expect(browser.runtime.sendMessage).toHaveBeenCalledTimes(2)
        );
        expect(browser.runtime.sendMessage).toHaveBeenLastCalledWith({
            type: MESSAGE_TYPES.ANIME_EPISODE_STARTED,
            payload: {
                episodeData: mockAnimeEpisode,
                loadTime: expect.any(Date),
                userData: mockUserData,
                listEntry: mockLibraryEntry,
            },
        });
    });
});
