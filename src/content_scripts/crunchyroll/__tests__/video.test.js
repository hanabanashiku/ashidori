import { waitFor } from '@testing-library/react';
import Settings from '../../../options/Settings';
import MockApiProvider from '../../../__mocks__/MockApiProvider';
import CrunchyrollService from '../../../services/Crunchyroll';
import MESSAGE_TYPES from '../../../messageTypes';
import { SERVICES, LIST_STATUS } from '../../../enums';
import AnimeEpisode from '../../../models/AnimeEpisode';
import UserData from '../../../models/UserData';
import LibraryEntry from '../../../models/LibraryEntry';
import AnimeSeries from '../../../models/AnimeSeries';

jest.mock('../../../options/Settings');
jest.genMockFromModule('../../../services/Crunchyroll');
jest.mock('../../../services/Crunchyroll');

describe('Crunchyroll video content script', () => {
    const api = new MockApiProvider();

    let mediaInfo = null;
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
            .mockResolvedValue([SERVICES.CRUNCHYROLL]);
        browser.runtime.onMessage.addListener.mockImplementationOnce((fn) => {
            historyStateUpdatedListener = fn;
        });

        initBody();
    });

    afterEach(() => {
        document.getElementsByTagName('html')[0].innerHTML = '';
        mediaInfo = null;
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.resetModules();
    });

    function initBody() {
        mediaInfo = document.createElement('div');
        mediaInfo.className = 'erc-current-media-info';
        document.body.appendChild(mediaInfo);
        mockUrl(
            'https://www.crunchyroll.com/watch/GVWU0Q2Z4/the-best-guarantee--buy-the-cd'
        );
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

            CrunchyrollService.mockReturnValue({
                authenticate: jest.fn(),
                getEpisodeData: jest.fn().mockResolvedValue(mockAnimeEpisode),
            });

            api.getUserData.mockResolvedValue(mockUserData);
            api.resolveLibraryEntryFromAnimeEpisode.mockResolvedValue(
                mockLibraryEntry
            );

            require('../video');
        });
    }

    it('does not activate if crunchyroll is not enabled', () => {
        Settings.getEnabledServices = jest.fn().mockResolvedValue([]);
        requireScript();
        expect(document.querySelector('.ashidori-list-info')).toBeFalsy();
        expect(historyStateUpdatedListener).toBeNull();
    });

    it('does activate if crunchyroll is enabled', async () => {
        Settings.getEnabledServices = jest
            .fn()
            .mockResolvedValue([SERVICES.CRUNCHYROLL]);

        requireScript();
        expect(Settings.getEnabledServices).toBeCalled();
        await waitFor(() =>
            expect(
                document.querySelector('#ashidori-list-info')
            ).toBeInTheDocument()
        );
        expect(historyStateUpdatedListener).toBeDefined();
        expect(browser.runtime.sendMessage).toHaveBeenNthCalledWith(1, {
            type: MESSAGE_TYPES.ANIME_EPISODE_STARTED,
            payload: {
                loadTime: expect.any(Date),
                userData: mockUserData,
                listEntry: mockLibraryEntry,
                episodeData: mockAnimeEpisode,
            },
        });
    });

    it('sends update episode message on unload', async () => {
        Settings.getEnabledServices = jest
            .fn()
            .mockResolvedValue([SERVICES.CRUNCHYROLL]);

        requireScript();
        await waitFor(() => expect(historyStateUpdatedListener).not.toBeNull());
        historyStateUpdatedListener({
            type: MESSAGE_TYPES.HISTORY_STATE_UPDATED,
            payload: {
                url: 'https://www.crunchyroll.com/watchlist',
            },
        });

        expect(browser.runtime.sendMessage).toHaveBeenCalledTimes(2);
        expect(browser.runtime.sendMessage).toHaveBeenLastCalledWith({
            type: MESSAGE_TYPES.UPDATE_EPISODE,
            payload: {
                episodeData: mockAnimeEpisode,
                loadTime: expect.any(Date),
                userData: mockUserData,
                listEntry: mockLibraryEntry,
            },
        });
        expect(document.querySelector('#ashidori-list-info')).toBeFalsy();
    });

    it('re-inits the script when switching to a new episode', async () => {
        Settings.getEnabledServices = jest
            .fn()
            .mockResolvedValue([SERVICES.CRUNCHYROLL]);

        requireScript();
        await waitFor(() => expect(historyStateUpdatedListener).not.toBeNull());
        historyStateUpdatedListener({
            type: MESSAGE_TYPES.HISTORY_STATE_UPDATED,
            payload: {
                url: 'https://www.crunchyroll.com/watch/GJWU2520V/the-counter-secret-police-cover-operation',
            },
        });

        await waitFor(() =>
            expect(browser.runtime.sendMessage).toHaveBeenCalledTimes(3)
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
        expect(
            document.querySelector('#ashidori-list-info')
        ).toBeInTheDocument();
    });
});
