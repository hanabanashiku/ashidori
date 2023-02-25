import { waitFor } from '@testing-library/react';
import Settings from '../../../options/Settings';
import MockApiProvider from '../../../__mocks__/MockApiProvider';
import MESSAGE_TYPES from '../../../messageTypes';
import { SERVICES, LIST_STATUS } from '../../../enums';
import AnimeEpisode from '../../../models/AnimeEpisode';
import UserData from '../../../models/UserData';
import LibraryEntry from '../../../models/LibraryEntry';
import AnimeSeries from '../../../models/AnimeSeries';
import AnimeSeason from '../../../models/AnimeSeason';

jest.mock('../../../options/Settings');

describe('Hidive video content script', () => {
    const api = new MockApiProvider();

    const expectedAnimeEpisode = new AnimeEpisode({
        _id: 's04e000',
        _title: 'Play Back | Reminisce',
        _description:
            'What’s past is prologue. Bell has come a long way and he and Hestia reflect upon the events that forged him into the adventurer he is today.',
        _number: 0,
        _duration: 24,
        _series: new AnimeSeries({
            _id: 'is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv',
            _title: 'Is It Wrong to Try to Pick Up Girls in a Dungeon? IV',
            _englishTitle:
                'Is It Wrong to Try to Pick Up Girls in a Dungeon? IV',
        }),
        _season: new AnimeSeason({
            _name: 'Season 4',
            _number: 4,
        }),
        _service: SERVICES.HIDIVE,
    });
    const mockUserData = new UserData({
        _id: '12345',
        _name: 'john.doe',
        _provider: 0,
    });
    const mockLibraryEntry = new LibraryEntry({
        _id: '29377819',
        _status: LIST_STATUS.CURRENT,
        _progress: 1,
        _notes: '',
        _startDate: '2015-04-05T00:00:00.000Z',
        _completedDate: '2015-06-26T00:00:00.000Z',
        _rewatchCount: 0,
        _lastUpdated: null,
        _rating: 8,
        _anime: new AnimeSeries({
            _id: '9962',
            _title: 'Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka',
            _englishTitle: 'Is It Wrong to Try to Pick Up Girls in a Dungeon?',
            _description:
                'Commonly known as the "Dungeon," the city of Orario possesses a huge labyrinth in the underground. Its strange name attracts excitement, illusions of honor, and hopes of romance with a pretty girl. In this city of dreams and desires, new adventurer Bell Cranel has his fateful encounter with the tiny Goddess Hestia.\n\nThus begins the story of a boy striving to become the best adventurer and a lonely goddess searching for followers both working together to fulfill their goals. ',
            _coverImage:
                'https://media.kitsu.io/anime/poster_images/9962/tiny.jpg',
            _startDate: '2015-04-04T04:00:00.000Z',
            _endDate: '2015-06-27T04:00:00.000Z',
            _status: 1,
            _episodeCount: 13,
            _episodeLength: 24,
            _genres: ['Action', 'Adventure', 'Comedy', 'Fantasy', 'Romance'],
            _streamingLinks: {
                0: 'http://www.crunchyroll.com/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon',
                2: 'http://www.hulu.com/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon',
                4: 'https://www.amazon.com/Bell-Cranel-ADVENTURER/dp/B01N0YCDM9',
                5: 'https://www.hidive.com/tv/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon',
                7: 'https://vrv.co/series/G6DQN9KGR/Is-It-Wrong-to-Try-to-Pick-Up-Girls-in-a-Dungeon',
            },
            _link: 'https://kitsu.io/anime/9962',
            _seasonCount: 0,
        }),
    });

    beforeEach(() => {
        Settings.getEnabledServices = jest
            .fn()
            .mockResolvedValue([SERVICES.HIDIVE]);

        initBody();
    });

    afterEach(() => {
        document.getElementsByTagName('html')[0].innerHTML = '';
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.resetModules();
    });

    function initBody() {
        document.getElementsByTagName('html')[0].innerHTML =
            require('./mockPage').default;

        mockUrl(
            'https://www.hidive.com/stream/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv/s04e000'
        );
    }

    function mockUrl(url) {
        global.window = Object.create(window);
        Object.defineProperty(window, 'location', {
            value: {
                href: url,
                pathname:
                    '/stream/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv/s04e000',
            },
        });
    }

    function requireScript() {
        jest.isolateModules(() => {
            jest.spyOn(
                jest.requireActual('../../../providers/builder'),
                'getApiInstance'
            ).mockResolvedValue(api);

            api.getUserData.mockResolvedValue(mockUserData);
            api.resolveLibraryEntryFromAnimeEpisode.mockResolvedValue(
                mockLibraryEntry
            );

            require('../video');
        });
    }

    it('does not activate if hidive is not enabled', () => {
        Settings.getEnabledServices = jest.fn().mockResolvedValueOnce([]);
        requireScript();
        expect(document.querySelector('#ashidori-root')).toBeFalsy();
    });

    it('does activate if hidive is enabled', async () => {
        requireScript();
        expect(Settings.getEnabledServices).toBeCalled();
        await waitFor(() =>
            expect(document.querySelector('#ashidori-root')).toBeInTheDocument()
        );
        expect(browser.runtime.sendMessage).toHaveBeenNthCalledWith(1, {
            type: MESSAGE_TYPES.ANIME_EPISODE_STARTED,
            payload: {
                loadTime: expect.any(Date),
                userData: mockUserData,
                listEntry: mockLibraryEntry,
                episodeData: expectedAnimeEpisode,
            },
        });
    });
});
