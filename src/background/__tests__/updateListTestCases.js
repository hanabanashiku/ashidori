/* istanbul ignore file */
import { LIST_STATUS, BROWSER } from '../../enums';

export const updatePopupTestCases = [
    [
        'updating',
        'chrome',
        BROWSER.CHROMIUM,
        "Looks like you've finished watching episode 113 of My Hero Academia. Should we update your progress on john.doe's anime list?",
    ],
    [
        'adding',
        'chrome',
        BROWSER.CHROMIUM,
        "Looks like you've finished watching episode 1 of My Hero Academia. Should we add the show to john.doe's anime list?",
    ],
    [
        'updating',
        'firefox',
        BROWSER.FIREFOX,
        "Looks like you've finished watching episode 113 of My Hero Academia. Click on this notification to update john.doe's anime list.",
    ],
    [
        'adding',
        'firefox',
        BROWSER.FIREFOX,
        "Looks like you've finished watching episode 1 of My Hero Academia. Click on this notification to add the show to john.doe's anime list.",
    ],
];

export const updatedPopupTestCases = ['chrome', 'firefox']
    .map((browser) => [
        [
            'completed',
            browser,
            {
                episodeData: {
                    _number: 115,
                },
                listEntry: {
                    _progress: 114,
                    _status: LIST_STATUS.CURRENT,
                    _anime: {
                        _episodeCount: 115,
                    },
                },
            },
            'My Hero Academia has been marked finished.',
        ],
        [
            'on hold',
            browser,
            {
                episodeData: {
                    _number: 115,
                },
                listEntry: {
                    _progress: 114,
                    _status: LIST_STATUS.ON_HOLD,
                    _anime: {
                        _episodeCount: 120,
                    },
                },
            },
            'My Hero Academia has been marked as currently watching.',
        ],
        [
            'planned',
            browser,
            {
                episodeData: {
                    _number: 1,
                },
                listEntry: {
                    _progress: 0,
                    _status: LIST_STATUS.PLANNED,
                    _anime: {
                        _episodeCount: 120,
                    },
                },
            },
            'My Hero Academia has been marked as currently watching.',
        ],
        [
            'current',
            browser,
            {
                episodeData: {
                    _number: 115,
                },
                listEntry: {
                    _progress: 114,
                    _status: LIST_STATUS.CURRENT,
                    _anime: {
                        _episodeCount: 120,
                    },
                },
            },
            'My Hero Academia has been updated to episode 115.',
        ],
    ])
    .flat(1);
