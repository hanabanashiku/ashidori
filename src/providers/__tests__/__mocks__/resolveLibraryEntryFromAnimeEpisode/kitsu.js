import { ANIME_STATUS } from '../../../../enums';
import AnimeEpisode from '../../../../models/AnimeEpisode';
import AnimeSeason from '../../../../models/AnimeSeason';
import AnimeSeries from '../../../../models/AnimeSeries';

const Scenarios = {
    'resolves for long running series compiled to one season': 0,
    'resolves for one season anime': 1,
    'resolves for season of a not-airing multi-season anime': 2,
    // "resolves for season of an anime where the season names don't match extracted data": 3,
};

const ScrapedEpisodeData = {
    0: new AnimeEpisode({
        _id: 'GEVUZGGGQ',
        _title: "Eliminate the Ice Oni! Chopper's Fire Trick!",
        _description: '',
        _number: 1010,
        _duration: 24,
        _season: new AnimeSeason({
            _id: '12345',
            _name: 'One Piece: WANO KUNI (892-Current)',
            _number: 13,
            _isAiring: true,
        }),
        _series: new AnimeSeries({
            _id: 'GRMG8ZQZR',
            _title: 'One Piece',
            _englishTitle: 'One Piece',
            _description:
                "Monkey. D. Luffy refuses to let anyone or anything stand in the way of his quest to become the king of all pirates. With a course charted for the treacherous waters of the Grand Line and beyond, this is one captain who'll never give up until he's claimed the greatest treasure on Earth: the Legendary One Piece!",
            _status: ANIME_STATUS.AIRING,
            _episodeCount: 0,
            _episodeLength: 24,
            _genres: ['Action', 'Adventure', 'Fantasy', 'Shonen'],
            _streamingLinks: {
                0: 'https://beta.crunchyroll.com/series/GRMG8ZQZR/one-piece',
            },
        }),
        _airDate: null,
    }),
    1: new AnimeEpisode({
        _id: 'GVWU0ZDX2',
        _title: 'For Real?!',
        _description: 'GQWH0M9N8',
        _number: 6,
        _duration: 24,
        _season: new AnimeSeason({
            _id: '12345',
            _name: 'My Dress-Up Darling',
            _number: 1,
            _isAiring: true,
        }),
        _series: new AnimeSeries({
            _id: 'GQWH0M9N8',
            _title: 'My Dress-Up Darling',
            _englishTitle: 'My Dress-Up Darling',
            _description:
                "Wakana Gojo is a high school boy who wants to become a kashirashi--a master craftsman who makes traditional Japanese Hina dolls. Though he's gung-ho about the craft, he knows nothing about the latest trends, and has a hard time fitting in with his class. The popular kids--especially one girl, Marin Kitagawa--seem like they live in a completely different world.\n\nThat all changes one day, when she shares an unexpected secret with him, and their completely different worlds collide.",
            _status: ANIME_STATUS.AIRING,
            _episodeCount: 0,
            _episodeLength: 24,
            _genres: [],
            _streamingLinks: {
                0: 'https://beta.crunchyroll.com/series/GQWH0M9N8/my-dress-up-darling',
            },
        }),
        _airDate: null,
    }),
    2: new AnimeEpisode({
        _id: 'GYEXV3196',
        _title: 'Wild, Wild Pussycats',
        _number: 40,
        _duration: 24,
        _season: new AnimeSeason({
            _id: '12345',
            _name: 'My Hero Academia Season 3',
            _number: 3,
            _isAiring: false,
        }),
        _series: new AnimeSeries({
            _id: 'G6NQ5DWZ6',
            _title: 'My Hero Academia',
            _englishTitle: 'My Hero Academia',
            _description:
                'Izuku has dreamt of being a hero all his life—a lofty goal for anyone, but especially challenging for a kid with no superpowers. That’s right, in a world where eighty percent of the population has some kind of super-powered “quirk,” Izuku was unlucky enough to be born completely normal. But that’s not enough to stop him from enrolling in one of the world’s most prestigious hero academies.',
            _episodeCount: 113,
            _episodeLength: 24,
            _genres: ['Action', 'Fantasy', 'Shonen'],
            _streamingLinks: {
                0: 'https://beta.crunchyroll.com/series/G6NQ5DWZ6/my-hero-academia',
            },
        }),
        _airDate: null,
    }),
    3: new AnimeEpisode({
        _id: 'GEVUZ8ZEW',
        _title: 'Undertaker',
        _number: 1,
        _duration: 24,
        _airDate: new Date('Sat Apr 10 2021 11:00:00 GMT-0400'),
        _season: new AnimeSeason({
            _id: 'GR09CXQJ5',
            _name: '86 EIGHTY-SIX',
            _number: 2, // fix
            _isAiring: true,
        }),
        _series: new AnimeSeries({
            _id: 'GVDHX8DM5',
            _title: '86 EIGHTY-SIX',
            _englishTitle: 'My Hero Academia',
            _description:
                'Called “Juggernaut,” these are the unmanned combat drones developed by the Republic of San Magnolia in answer to the attacks by the autonomous unmanned drones of the neighboring Empire of Giad, the “Legion”. But they’re only unmanned in name. In reality, they are piloted by the Eighty-sixers—those considered to be less than human and treated as mere tools. \r\nDetermined to achieve his own mysterious ends, Shin, the captain of Spearhead Squadron, which is comprised of Eighty-sixers, continues to fight a hopeless war on a battlefield where only death awaits him.',
            _episodeCount: 0,
            _episodeLength: 0,
            _genres: [],
            _streamingLinks: {
                0: 'https://beta.crunchyroll.com/series/GVDHX8DM5',
            },
        }),
    }),
};

const SeasonResults = {
    0: {
        data: [
            {
                id: '12',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/12',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:25.722Z',
                    updatedAt: '2022-02-16T02:13:25.768Z',
                    slug: 'one-piece',
                    synopsis:
                        'Gol D. Roger was known as the "Pirate King," the strongest and most infamous being to have sailed the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece—which promises an unlimited amount of riches and fame—and quite possibly the pinnacle of glory and the title of the Pirate King.\nEnter Monkey D. Luffy, a 17-year-old boy who defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate ransacking villages for fun, Luffy’s reason for being a pirate is one of pure wonder: the thought of an exciting adventure that leads him to intriguing people and ultimately, the promised treasure. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach the most coveted of all fortunes—One Piece.\n[Written by MAL Rewrite]',
                    description:
                        'Gol D. Roger was known as the "Pirate King," the strongest and most infamous being to have sailed the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece—which promises an unlimited amount of riches and fame—and quite possibly the pinnacle of glory and the title of the Pirate King.\nEnter Monkey D. Luffy, a 17-year-old boy who defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate ransacking villages for fun, Luffy’s reason for being a pirate is one of pure wonder: the thought of an exciting adventure that leads him to intriguing people and ultimately, the promised treasure. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach the most coveted of all fortunes—One Piece.\n[Written by MAL Rewrite]',
                    coverImageTopOffset: 50,
                    titles: {
                        en: 'One Piece',
                        en_jp: 'One Piece',
                        ja_jp: 'ONE PIECE',
                    },
                    canonicalTitle: 'One Piece',
                    abbreviatedTitles: ['ワンピース'],
                    averageRating: '83.11',
                    ratingFrequencies: {
                        2: '7635',
                        3: '165',
                        4: '562',
                        5: '119',
                        6: '499',
                        7: '110',
                        8: '8710',
                        9: '143',
                        10: '1617',
                        11: '220',
                        12: '2729',
                        13: '281',
                        14: '19588',
                        15: '641',
                        16: '7368',
                        17: '1102',
                        18: '7826',
                        19: '1053',
                        20: '82467',
                    },
                    userCount: 186101,
                    favoritesCount: 6578,
                    startDate: '1999-10-20',
                    endDate: null,
                    nextRelease: '2022-02-20T09:30:00.000+09:00',
                    popularityRank: 14,
                    ratingRank: 33,
                    ageRating: 'PG',
                    ageRatingGuide: 'Teens 13 or older',
                    subtype: 'TV',
                    status: 'current',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/12/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/12/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/12/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/12/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/12/original.png',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: {
                        tiny: 'https://media.kitsu.io/anime/12/cover_image/tiny-cd1b0729d5c15400bfa2441ea3751e86.jpeg',
                        large: 'https://media.kitsu.io/anime/12/cover_image/large-3e72f400a87b5241780c5082f0582611.jpeg',
                        small: 'https://media.kitsu.io/anime/12/cover_image/small-8d0cbc39cac65d5d7c4db5f5b3742ae7.jpeg',
                        original:
                            'https://media.kitsu.io/anime/12/cover_image/21ecb556255bd46b95aea4779d19789f.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 840,
                                    height: 200,
                                },
                                large: {
                                    width: 3360,
                                    height: 800,
                                },
                                small: {
                                    width: 1680,
                                    height: 400,
                                },
                            },
                        },
                    },
                    episodeCount: null,
                    episodeLength: 24,
                    totalLength: 28056,
                    youtubeVideoId: 'CmTeYj2FmRc',
                    showType: 'TV',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/12/genres',
                        },
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/12/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/12/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/12/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/12/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/12/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/12/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/12/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/staff',
                            related: 'https://kitsu.io/api/edge/anime/12/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/12/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/12/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/12/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/12/streaming-links',
                        },
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/12/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/12/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/12/anime-staff',
                        },
                    },
                },
            },
            {
                id: '421',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/421',
                },
                attributes: {
                    createdAt: '2013-02-20T16:06:54.084Z',
                    updatedAt: '2022-02-16T00:00:08.651Z',
                    slug: 'one-piece-2000',
                    synopsis:
                        "Woonan is the legendary Great Gold Pirate, earning the nickname after accumulating about 1/3 of the gold available in the world. Even after his disappearance, the tales of his gold being stashed away in a remote island continue to persist, a juicy target that other pirates lust for.\nOne of the pirates going to great lengths to attain the treasure is El Drago. He and his crew have hunted down Woonan's former crew members one by one, and along the way, they find the map that will take them to the hidden island.\nThe map is not all they come across; they also manage to come into contact with the straw hat pirates. After a short battle, Luffy and company are robbed and separated from one another. Now they must find a way to make it to the island before El Drago does and take the legendary treasure for themselves.",
                    description:
                        "Woonan is the legendary Great Gold Pirate, earning the nickname after accumulating about 1/3 of the gold available in the world. Even after his disappearance, the tales of his gold being stashed away in a remote island continue to persist, a juicy target that other pirates lust for.\nOne of the pirates going to great lengths to attain the treasure is El Drago. He and his crew have hunted down Woonan's former crew members one by one, and along the way, they find the map that will take them to the hidden island.\nThe map is not all they come across; they also manage to come into contact with the straw hat pirates. After a short battle, Luffy and company are robbed and separated from one another. Now they must find a way to make it to the island before El Drago does and take the legendary treasure for themselves.",
                    coverImageTopOffset: 0,
                    titles: {
                        en_jp: 'One Piece Movie 1',
                        ja_jp: 'ONE PIECE',
                    },
                    canonicalTitle: 'One Piece Movie 1',
                    abbreviatedTitles: ['One Piece: The Movie'],
                    averageRating: '71.07',
                    ratingFrequencies: {
                        2: '35',
                        3: '1',
                        4: '38',
                        5: '0',
                        6: '57',
                        7: '4',
                        8: '195',
                        9: '5',
                        10: '466',
                        11: '10',
                        12: '880',
                        13: '32',
                        14: '1422',
                        15: '21',
                        16: '685',
                        17: '15',
                        18: '243',
                        19: '3',
                        20: '712',
                    },
                    userCount: 6870,
                    favoritesCount: 34,
                    startDate: '2000-03-04',
                    endDate: '2000-03-04',
                    nextRelease: null,
                    popularityRank: 1634,
                    ratingRank: 3730,
                    ageRating: 'PG',
                    ageRatingGuide: 'Teens 13 or older',
                    subtype: 'movie',
                    status: 'finished',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/421/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/421/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/421/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/421/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/421/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: null,
                                    height: null,
                                },
                                large: {
                                    width: null,
                                    height: null,
                                },
                                small: {
                                    width: null,
                                    height: null,
                                },
                                medium: {
                                    width: null,
                                    height: null,
                                },
                            },
                        },
                    },
                    coverImage: null,
                    episodeCount: 1,
                    episodeLength: 50,
                    totalLength: 50,
                    youtubeVideoId: 'eEApDotghec',
                    showType: 'movie',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/421/genres',
                        },
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/421/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/421/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/421/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/421/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/421/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/421/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/421/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/421/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/421/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/421/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/421/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/421/streaming-links',
                        },
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/421/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/421/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/421/anime-staff',
                        },
                    },
                },
            },
            {
                id: '6827',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/6827',
                },
                attributes: {
                    createdAt: '2013-02-20T17:46:00.433Z',
                    updatedAt: '2022-02-16T00:00:08.651Z',
                    slug: 'one-piece-film-z',
                    synopsis:
                        'The Straw Hat Pirates enter the rough seas of the New World in search of the hidden treasures of the Pirate King, Gol D. Roger－One Piece. On their voyage, the pirates come across a terrifying, powerful man, former Marine Admiral Z.\nZ is accused of having stolen the "Dyna Stones", weapons believed to have the power to shake up the New World. The Marine Headquarters believes Z is about to use it to end the pirate era, and with it, the lives of many innocent people. In fear of such a phenomenal event, marines start to take action against the former admiral.\nEven if it means stumbling upon marines and the navy, the Straw Hat Pirates decided to chase after Z and stop him from causing havoc. As they continue to embark on their ventures, the pirates bump into new and familiar acquaintances.',
                    description:
                        'The Straw Hat Pirates enter the rough seas of the New World in search of the hidden treasures of the Pirate King, Gol D. Roger－One Piece. On their voyage, the pirates come across a terrifying, powerful man, former Marine Admiral Z.\nZ is accused of having stolen the "Dyna Stones", weapons believed to have the power to shake up the New World. The Marine Headquarters believes Z is about to use it to end the pirate era, and with it, the lives of many innocent people. In fear of such a phenomenal event, marines start to take action against the former admiral.\nEven if it means stumbling upon marines and the navy, the Straw Hat Pirates decided to chase after Z and stop him from causing havoc. As they continue to embark on their ventures, the pirates bump into new and familiar acquaintances.',
                    coverImageTopOffset: 0,
                    titles: {
                        en: 'One Piece Film Z',
                        en_jp: 'One Piece Film: Z',
                        en_us: 'One Piece Film Z',
                        ja_jp: 'ワンピース　フィルム　﻿Ｚ',
                    },
                    canonicalTitle: 'One Piece Film: Z',
                    abbreviatedTitles: ['One Piece Movie 12'],
                    averageRating: '82.06',
                    ratingFrequencies: {
                        2: '829',
                        3: '21',
                        4: '55',
                        5: '6',
                        6: '80',
                        7: '12',
                        8: '638',
                        9: '9',
                        10: '267',
                        11: '24',
                        12: '628',
                        13: '73',
                        14: '2713',
                        15: '147',
                        16: '2465',
                        17: '227',
                        18: '1705',
                        19: '121',
                        20: '8165',
                    },
                    userCount: 22714,
                    favoritesCount: 106,
                    startDate: '2012-12-15',
                    endDate: '2012-12-15',
                    nextRelease: null,
                    popularityRank: 483,
                    ratingRank: 177,
                    ageRating: 'PG',
                    ageRatingGuide: 'Teens 13 or older',
                    subtype: 'movie',
                    status: 'finished',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/6827/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/6827/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/6827/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/6827/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/6827/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: {
                        tiny: 'https://media.kitsu.io/anime/cover_images/6827/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/cover_images/6827/large.jpg',
                        small: 'https://media.kitsu.io/anime/cover_images/6827/small.jpg',
                        original:
                            'https://media.kitsu.io/anime/cover_images/6827/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 840,
                                    height: 200,
                                },
                                large: {
                                    width: 3360,
                                    height: 800,
                                },
                                small: {
                                    width: 1680,
                                    height: 400,
                                },
                            },
                        },
                    },
                    episodeCount: 1,
                    episodeLength: 107,
                    totalLength: 107,
                    youtubeVideoId: '1gGt1Mg_zSo',
                    showType: 'movie',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/genres',
                        },
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/streaming-links',
                        },
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/anime-staff',
                        },
                    },
                },
            },
            {
                id: '11351',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/11351',
                },
                attributes: {
                    createdAt: '2015-08-29T13:45:12.287Z',
                    updatedAt: '2022-02-16T00:00:08.651Z',
                    slug: 'one-piece-film-gold',
                    synopsis:
                        'The Straw Hat Pirates are taking on Gild Tesoro, one of the richest men in the world.\n(Source: IMDb)',
                    description:
                        'The Straw Hat Pirates are taking on Gild Tesoro, one of the richest men in the world.\n(Source: IMDb)',
                    coverImageTopOffset: 250,
                    titles: {
                        en_jp: 'One Piece Film: Gold',
                        ja_jp: 'ONE PIECE FILM GOLD',
                    },
                    canonicalTitle: 'One Piece Film: Gold',
                    abbreviatedTitles: ['One Piece Movie 13'],
                    averageRating: '81.83',
                    ratingFrequencies: {
                        2: '352',
                        3: '3',
                        4: '16',
                        5: '14',
                        6: '21',
                        7: '7',
                        8: '252',
                        9: '10',
                        10: '123',
                        11: '21',
                        12: '314',
                        13: '58',
                        14: '1510',
                        15: '110',
                        16: '1337',
                        17: '167',
                        18: '704',
                        19: '67',
                        20: '3685',
                    },
                    userCount: 12645,
                    favoritesCount: 37,
                    startDate: '2016-07-23',
                    endDate: '2016-07-23',
                    nextRelease: null,
                    popularityRank: 938,
                    ratingRank: 278,
                    ageRating: 'PG',
                    ageRatingGuide: 'Teens 13 or older',
                    subtype: 'movie',
                    status: 'finished',
                    tba: '',
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/11351/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/11351/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/11351/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/11351/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/11351/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: {
                        tiny: 'https://media.kitsu.io/anime/cover_images/11351/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/cover_images/11351/large.jpg',
                        small: 'https://media.kitsu.io/anime/cover_images/11351/small.jpg',
                        original:
                            'https://media.kitsu.io/anime/cover_images/11351/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 840,
                                    height: 200,
                                },
                                large: {
                                    width: 3360,
                                    height: 800,
                                },
                                small: {
                                    width: 1680,
                                    height: 400,
                                },
                            },
                        },
                    },
                    episodeCount: 1,
                    episodeLength: 120,
                    totalLength: 120,
                    youtubeVideoId: 'BvqD6Oamf0U',
                    showType: 'movie',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/genres',
                        },
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/streaming-links',
                        },
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/anime-staff',
                        },
                    },
                },
            },
            {
                id: '3492',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/3492',
                },
                attributes: {
                    createdAt: '2013-02-20T16:53:42.492Z',
                    updatedAt: '2022-02-16T00:00:08.651Z',
                    slug: 'one-piece-strong-world',
                    synopsis:
                        '20 years after his escape from Impel Down, the legendary pirate Shiki "the Golden Lion" reappears causing massive upheaval to the Marines. During his long seclusion, he was able to come up with a scheme to bring the World Government to its knees. On his way to execute the plan, Shiki crosses paths with the Straw Hat Pirates and becomes so impressed with Nami\'s knowledge of meteorology that he abducts her to forcedly enlist her into his crew. Luffy and the gang end up on a strange land populated with monstrous beasts as they desperately search for Shiki and Nami.\n(Source: ANN)',
                    description:
                        '20 years after his escape from Impel Down, the legendary pirate Shiki "the Golden Lion" reappears causing massive upheaval to the Marines. During his long seclusion, he was able to come up with a scheme to bring the World Government to its knees. On his way to execute the plan, Shiki crosses paths with the Straw Hat Pirates and becomes so impressed with Nami\'s knowledge of meteorology that he abducts her to forcedly enlist her into his crew. Luffy and the gang end up on a strange land populated with monstrous beasts as they desperately search for Shiki and Nami.\n(Source: ANN)',
                    coverImageTopOffset: 163,
                    titles: {
                        en: 'One Piece Film Strong World',
                        en_jp: 'One Piece Film: Strong World',
                        en_us: 'One Piece Film Strong World',
                        ja_jp: 'ワンピース　フィルム　ストロングワールド',
                    },
                    canonicalTitle: 'One Piece Film: Strong World',
                    abbreviatedTitles: ['One Piece Movie 10'],
                    averageRating: '82.09',
                    ratingFrequencies: {
                        2: '639',
                        3: '9',
                        4: '34',
                        5: '2',
                        6: '44',
                        7: '9',
                        8: '481',
                        9: '9',
                        10: '251',
                        11: '21',
                        12: '618',
                        13: '31',
                        14: '2247',
                        15: '132',
                        16: '2260',
                        17: '166',
                        18: '1952',
                        19: '70',
                        20: '6311',
                    },
                    userCount: 19304,
                    favoritesCount: 70,
                    startDate: '2009-12-12',
                    endDate: '2009-12-12',
                    nextRelease: null,
                    popularityRank: 596,
                    ratingRank: 127,
                    ageRating: 'PG',
                    ageRatingGuide: 'Teens 13 or older',
                    subtype: 'movie',
                    status: 'finished',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/3492/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/3492/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/3492/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/3492/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/3492/original.png',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: {
                        tiny: 'https://media.kitsu.io/anime/cover_images/3492/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/cover_images/3492/large.jpg',
                        small: 'https://media.kitsu.io/anime/cover_images/3492/small.jpg',
                        original:
                            'https://media.kitsu.io/anime/cover_images/3492/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 840,
                                    height: 200,
                                },
                                large: {
                                    width: 3360,
                                    height: 800,
                                },
                                small: {
                                    width: 1680,
                                    height: 400,
                                },
                            },
                        },
                    },
                    episodeCount: 1,
                    episodeLength: 115,
                    totalLength: 115,
                    youtubeVideoId: '3n58UPvcD7I',
                    showType: 'movie',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/genres',
                        },
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/streaming-links',
                        },
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/anime-staff',
                        },
                    },
                },
            },
        ],
        meta: {
            count: 2440,
        },
        links: {
            first: 'https://kitsu.io/api/edge/anime?filter%5Btext%5D=One+Piece%3A+WANO+KUNI+%28892-Current%29&page%5Blimit%5D=5&page%5Boffset%5D=0',
            next: 'https://kitsu.io/api/edge/anime?filter%5Btext%5D=One+Piece%3A+WANO+KUNI+%28892-Current%29&page%5Blimit%5D=5&page%5Boffset%5D=5',
            last: 'https://kitsu.io/api/edge/anime?filter%5Btext%5D=One+Piece%3A+WANO+KUNI+%28892-Current%29&page%5Blimit%5D=5&page%5Boffset%5D=2435',
        },
    },
    1: {
        data: [
            {
                id: '44382',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/44382',
                },
                attributes: {
                    createdAt: '2021-04-14T01:10:25.426Z',
                    updatedAt: '2022-02-16T22:43:33.502Z',
                    slug: 'sono-bisque-doll-wa-koi-wo-suru',
                    synopsis:
                        "Wakana Gojo is a high school boy who wants to become a kashirashi--a master craftsman who makes traditional Japanese Hina dolls. Though he's gung-ho about the craft, he knows nothing about the latest trends and has a hard time fitting in with his class. The popular kids--especially one girl, Marin Kitagawa--seem like they live in a completely different world. That all changes one day, when she shares an unexpected secret with him, and their completely different worlds collide\n\n(Source: Crunchyroll)",
                    description:
                        "Wakana Gojo is a high school boy who wants to become a kashirashi--a master craftsman who makes traditional Japanese Hina dolls. Though he's gung-ho about the craft, he knows nothing about the latest trends and has a hard time fitting in with his class. The popular kids--especially one girl, Marin Kitagawa--seem like they live in a completely different world. That all changes one day, when she shares an unexpected secret with him, and their completely different worlds collide\n\n(Source: Crunchyroll)",
                    coverImageTopOffset: 0,
                    titles: {
                        en: 'My Dress-Up Darling',
                        en_jp: 'Sono Bisque Doll wa Koi wo Suru',
                        ja_jp: 'その着せ替え人形〈ビスク・ドール〉は恋をする',
                    },
                    canonicalTitle: 'Sono Bisque Doll wa Koi wo Suru',
                    abbreviatedTitles: ['Sono Kisekae Ningyou wa Koi wo Suru'],
                    averageRating: '82.49',
                    ratingFrequencies: {
                        2: '42',
                        4: '2',
                        5: '0',
                        6: '7',
                        7: '2',
                        8: '53',
                        9: '1',
                        10: '4',
                        11: '4',
                        12: '23',
                        13: '3',
                        14: '166',
                        15: '24',
                        16: '126',
                        17: '48',
                        18: '107',
                        19: '21',
                        20: '485',
                    },
                    userCount: 0,
                    favoritesCount: 0,
                    startDate: '2022-01-08',
                    endDate: null,
                    nextRelease: null,
                    popularityRank: 18977,
                    ratingRank: 50,
                    ageRating: 'R',
                    ageRatingGuide: null,
                    subtype: 'TV',
                    status: 'current',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/44382/poster_image/tiny-c6eedf248b1efa3a603b82ada61acf30.jpeg',
                        large: 'https://media.kitsu.io/anime/44382/poster_image/large-278c3c9f61f2fd4213ba5529e4655eab.jpeg',
                        small: 'https://media.kitsu.io/anime/44382/poster_image/small-85545d20cafbe0885f9b3955da6eacb8.jpeg',
                        medium: 'https://media.kitsu.io/anime/44382/poster_image/medium-e711cf37fa55da2f9518bbb306bfcf36.jpeg',
                        original:
                            'https://media.kitsu.io/anime/44382/poster_image/8f280cb9c768f8299b0add4df171016c.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: {
                        tiny: 'https://media.kitsu.io/anime/44382/cover_image/tiny-b862d8cdbfa66b171f438b241ff2b2f9.jpeg',
                        large: 'https://media.kitsu.io/anime/44382/cover_image/large-47ab8eee676eb6fdb6e0e560bc8bb361.jpeg',
                        small: 'https://media.kitsu.io/anime/44382/cover_image/small-a141714c344c8335e4e11793f99d45a4.jpeg',
                        original:
                            'https://media.kitsu.io/anime/44382/cover_image/b8b6fab7117bfabb89a2726ced38b49a.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 840,
                                    height: 200,
                                },
                                large: {
                                    width: 3360,
                                    height: 800,
                                },
                                small: {
                                    width: 1680,
                                    height: 400,
                                },
                            },
                        },
                    },
                    episodeCount: 12,
                    episodeLength: 24,
                    totalLength: 0,
                    youtubeVideoId: '8oveGY6h6T8',
                    showType: 'TV',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/genres',
                        },
                        data: [],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/streaming-links',
                        },
                        data: [
                            {
                                type: 'streamingLinks',
                                id: '6002',
                            },
                            {
                                type: 'streamingLinks',
                                id: '5928',
                            },
                        ],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/anime-staff',
                        },
                    },
                },
            },
            {
                id: '1735',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/1735',
                },
                attributes: {
                    createdAt: '2013-02-20T16:27:34.331Z',
                    updatedAt: '2022-02-16T18:00:04.480Z',
                    slug: 'urusei-yatsura-movie-6-itsudatte-my-darling',
                    synopsis:
                        "Lupica, another one of the legion of space princesses that all seem to have found out about Earth in some tour book, appears and abducts Ataru! \nBut Lupica isn't after Ataru for his great looks or charming personality (because he doesn't have either). Lupica's goal is the greatest love potion in the galaxy, which she intends to use to induce her sweetheart to tie the knot. To get it, she needs the possessor of the greatest lust in the universe...\n(Source: AniDB)",
                    description:
                        "Lupica, another one of the legion of space princesses that all seem to have found out about Earth in some tour book, appears and abducts Ataru! \nBut Lupica isn't after Ataru for his great looks or charming personality (because he doesn't have either). Lupica's goal is the greatest love potion in the galaxy, which she intends to use to induce her sweetheart to tie the knot. To get it, she needs the possessor of the greatest lust in the universe...\n(Source: AniDB)",
                    coverImageTopOffset: 0,
                    titles: {
                        en: 'Urusei Yatsura Movie 6: Always My Darling',
                        en_jp: 'Urusei Yatsura Movie 6: Itsudatte My Darling',
                        en_us: 'Urusei Yatsura Movie 6: Always My Darling',
                        ja_jp: 'うる星やつら いつだって・マイ・ダーリン',
                    },
                    canonicalTitle:
                        'Urusei Yatsura Movie 6: Itsudatte My Darling',
                    abbreviatedTitles: [],
                    averageRating: '69.32',
                    ratingFrequencies: {
                        2: '2',
                        3: '0',
                        4: '2',
                        5: '0',
                        6: '6',
                        7: '0',
                        8: '16',
                        9: '0',
                        10: '34',
                        11: '1',
                        12: '48',
                        13: '0',
                        14: '69',
                        15: '1',
                        16: '29',
                        17: '0',
                        18: '11',
                        19: '0',
                        20: '30',
                    },
                    userCount: 591,
                    favoritesCount: 1,
                    startDate: '1991-08-18',
                    endDate: '1991-08-18',
                    nextRelease: null,
                    popularityRank: 5930,
                    ratingRank: 4738,
                    ageRating: 'PG',
                    ageRatingGuide: 'Teens 13 or older',
                    subtype: 'movie',
                    status: 'finished',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/1735/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/1735/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/1735/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/1735/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/1735/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: null,
                                    height: null,
                                },
                                large: {
                                    width: null,
                                    height: null,
                                },
                                small: {
                                    width: null,
                                    height: null,
                                },
                                medium: {
                                    width: null,
                                    height: null,
                                },
                            },
                        },
                    },
                    coverImage: null,
                    episodeCount: 1,
                    episodeLength: 77,
                    totalLength: 77,
                    youtubeVideoId: null,
                    showType: 'movie',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/genres',
                        },
                        data: [
                            {
                                type: 'genres',
                                id: '3',
                            },
                            {
                                type: 'genres',
                                id: '2',
                            },
                            {
                                type: 'genres',
                                id: '5',
                            },
                            {
                                type: 'genres',
                                id: '4',
                            },
                            {
                                type: 'genres',
                                id: '14',
                            },
                            {
                                type: 'genres',
                                id: '1',
                            },
                        ],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/streaming-links',
                        },
                        data: [
                            {
                                type: 'streamingLinks',
                                id: '5228',
                            },
                        ],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/anime-staff',
                        },
                    },
                },
            },
            {
                id: '13600',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/13600',
                },
                attributes: {
                    createdAt: '2017-07-03T15:58:27.045Z',
                    updatedAt: '2022-02-16T22:51:57.891Z',
                    slug: 'darling-in-the-franxx',
                    synopsis:
                        'The distant future: Humanity established the mobile fort city, Plantation, upon the ruined wasteland. Within the city were pilot quarters, Mistilteinn, otherwise known as the “Birdcage.” That is where the children live... Their only mission in life was the fight. Their enemies are the mysterious giant organisms known as Kyoryu. The children operate robots known as FRANXX in order to face these still unseen enemies. Among them was a boy who was once called a child prodigy: Code number 016, Hiro. One day, a mysterious girl called Zero Two appears in front of Hiro. “I’ve found you, my Darling.”\n\n(Source: Crunchyroll)',
                    description:
                        'The distant future: Humanity established the mobile fort city, Plantation, upon the ruined wasteland. Within the city were pilot quarters, Mistilteinn, otherwise known as the “Birdcage.” That is where the children live... Their only mission in life was the fight. Their enemies are the mysterious giant organisms known as Kyoryu. The children operate robots known as FRANXX in order to face these still unseen enemies. Among them was a boy who was once called a child prodigy: Code number 016, Hiro. One day, a mysterious girl called Zero Two appears in front of Hiro. “I’ve found you, my Darling.”\n\n(Source: Crunchyroll)',
                    coverImageTopOffset: 0,
                    titles: {
                        en: 'DARLING in the FRANXX',
                        en_jp: 'Darling in the FranXX',
                        en_us: 'DARLING in the FRANXX',
                        ja_jp: 'ダーリン・イン・ザ・フランキス',
                    },
                    canonicalTitle: 'Darling in the FranXX',
                    abbreviatedTitles: [],
                    averageRating: '74.49',
                    ratingFrequencies: {
                        2: '711',
                        3: '17',
                        4: '389',
                        5: '45',
                        6: '612',
                        7: '91',
                        8: '2209',
                        9: '120',
                        10: '1739',
                        11: '223',
                        12: '2889',
                        13: '512',
                        14: '6989',
                        15: '804',
                        16: '4865',
                        17: '764',
                        18: '3132',
                        19: '379',
                        20: '8007',
                    },
                    userCount: 54570,
                    favoritesCount: 1566,
                    startDate: '2018-01-13',
                    endDate: '2018-07-07',
                    nextRelease: null,
                    popularityRank: 136,
                    ratingRank: 2085,
                    ageRating: 'PG',
                    ageRatingGuide: 'Teens 13 or older',
                    subtype: 'TV',
                    status: 'finished',
                    tba: '',
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/13600/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/13600/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/13600/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/13600/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/13600/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: {
                        tiny: 'https://media.kitsu.io/anime/cover_images/13600/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/cover_images/13600/large.jpg',
                        small: 'https://media.kitsu.io/anime/cover_images/13600/small.jpg',
                        original:
                            'https://media.kitsu.io/anime/cover_images/13600/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 840,
                                    height: 200,
                                },
                                large: {
                                    width: 3360,
                                    height: 800,
                                },
                                small: {
                                    width: 1680,
                                    height: 400,
                                },
                            },
                        },
                    },
                    episodeCount: 24,
                    episodeLength: 24,
                    totalLength: 576,
                    youtubeVideoId: 'Q4jDgDSV6Kk',
                    showType: 'TV',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/genres',
                        },
                        data: [
                            {
                                type: 'genres',
                                id: '5',
                            },
                            {
                                type: 'genres',
                                id: '30',
                            },
                            {
                                type: 'genres',
                                id: '4',
                            },
                            {
                                type: 'genres',
                                id: '14',
                            },
                            {
                                type: 'genres',
                                id: '1',
                            },
                        ],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/streaming-links',
                        },
                        data: [
                            {
                                type: 'streamingLinks',
                                id: '2236',
                            },
                            {
                                type: 'streamingLinks',
                                id: '2237',
                            },
                        ],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/anime-staff',
                        },
                    },
                },
            },
            {
                id: '1486',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/1486',
                },
                attributes: {
                    createdAt: '2013-02-20T16:23:45.234Z',
                    updatedAt: '2022-02-16T18:00:04.480Z',
                    slug: 'nerima-daikon-brothers',
                    synopsis:
                        'Hideki, leader of the Nerima Daikon Brothers, has a dream to build a dome in his hometown of Nerima to hold a concert for his band. Together with his cousin, Mako (whom he has a crush on), Ichiro, and Pandaikon (a panda he found in his yard that resembles a daikon), they strive to make money any way they can, and in the process, rid the world of evil-doers and steal their money in the process. With help from a rental guy, Nabeshin, who rents them outrageous items that always seem to help them defeat the bad guys, the Nerima Daikon Brothers sing their way to victory but always manage to lose the money they stole in the end. Even under the investigation of Inspector Karakuri, they never fail to fight for justice the Nerima-Daikon way.',
                    description:
                        'Hideki, leader of the Nerima Daikon Brothers, has a dream to build a dome in his hometown of Nerima to hold a concert for his band. Together with his cousin, Mako (whom he has a crush on), Ichiro, and Pandaikon (a panda he found in his yard that resembles a daikon), they strive to make money any way they can, and in the process, rid the world of evil-doers and steal their money in the process. With help from a rental guy, Nabeshin, who rents them outrageous items that always seem to help them defeat the bad guys, the Nerima Daikon Brothers sing their way to victory but always manage to lose the money they stole in the end. Even under the investigation of Inspector Karakuri, they never fail to fight for justice the Nerima-Daikon way.',
                    coverImageTopOffset: 0,
                    titles: {
                        en: 'Nerima Daikon Brothers',
                        en_jp: 'Nerima Daikon Brothers',
                        en_us: 'Nerima Daikon Brothers',
                        ja_jp: '練馬大根ブラザーズ',
                    },
                    canonicalTitle: 'Nerima Daikon Brothers',
                    abbreviatedTitles: [
                        'Oroshitate Musical Nerima Daikon Brothers',
                        'Dress-up Musical Nerima Daikon Brothers',
                    ],
                    averageRating: '73.55',
                    ratingFrequencies: {
                        2: '2',
                        3: '0',
                        4: '3',
                        5: '0',
                        6: '5',
                        7: '0',
                        8: '11',
                        9: '1',
                        10: '23',
                        11: '0',
                        12: '61',
                        13: '1',
                        14: '92',
                        15: '1',
                        16: '74',
                        17: '0',
                        18: '30',
                        19: '1',
                        20: '50',
                    },
                    userCount: 772,
                    favoritesCount: 9,
                    startDate: '2006-01-09',
                    endDate: '2006-03-27',
                    nextRelease: null,
                    popularityRank: 5298,
                    ratingRank: 2477,
                    ageRating: 'R',
                    ageRatingGuide: 'Mild Nudity',
                    subtype: 'TV',
                    status: 'finished',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/1486/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/1486/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/1486/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/1486/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/1486/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: null,
                                    height: null,
                                },
                                large: {
                                    width: null,
                                    height: null,
                                },
                                small: {
                                    width: null,
                                    height: null,
                                },
                                medium: {
                                    width: null,
                                    height: null,
                                },
                            },
                        },
                    },
                    coverImage: null,
                    episodeCount: 12,
                    episodeLength: 24,
                    totalLength: 288,
                    youtubeVideoId: null,
                    showType: 'TV',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/genres',
                        },
                        data: [
                            {
                                type: 'genres',
                                id: '3',
                            },
                            {
                                type: 'genres',
                                id: '35',
                            },
                        ],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/streaming-links',
                        },
                        data: [],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/anime-staff',
                        },
                    },
                },
            },
            {
                id: '42713',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/42713',
                },
                attributes: {
                    createdAt: '2019-11-13T21:49:19.650Z',
                    updatedAt: '2022-02-16T18:00:04.480Z',
                    slug: 'he-nuer-de-richang',
                    synopsis:
                        "A father with lots of love is often tormented endlessly by his daughter in everyday life. But this father would often look on all the troubles created by this child with a warm and loving heart. This is the super healing and cute series about the daily life of this father and daughter, it's warm loving and interesting too.\n\n(Source: Bayi Subs)",
                    description:
                        "A father with lots of love is often tormented endlessly by his daughter in everyday life. But this father would often look on all the troubles created by this child with a warm and loving heart. This is the super healing and cute series about the daily life of this father and daughter, it's warm loving and interesting too.\n\n(Source: Bayi Subs)",
                    coverImageTopOffset: 0,
                    titles: {
                        en: 'Grow Up with my Daughter',
                        en_cn: "He Nu'er De Richang",
                        zh_cn: '和女儿的日常 第一季',
                    },
                    canonicalTitle: "He Nu'er De Richang",
                    abbreviatedTitles: [
                        'Daily Life with a Daughter',
                        'Nuer de Richang',
                        "He Nü'er De Richang",
                    ],
                    averageRating: null,
                    ratingFrequencies: {
                        12: '1',
                        14: '1',
                        16: '2',
                        18: '1',
                    },
                    userCount: 10,
                    favoritesCount: 0,
                    startDate: '2016-10-14',
                    endDate: '2016-10-14',
                    nextRelease: null,
                    popularityRank: 16770,
                    ratingRank: null,
                    ageRating: 'G',
                    ageRatingGuide: null,
                    subtype: 'ONA',
                    status: 'finished',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/42713/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/42713/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/42713/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/42713/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/42713/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: null,
                    episodeCount: 18,
                    episodeLength: 2,
                    totalLength: 36,
                    youtubeVideoId: null,
                    showType: 'ONA',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/genres',
                        },
                        data: [],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/streaming-links',
                        },
                        data: [],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/anime-staff',
                        },
                    },
                },
            },
        ],
        included: [
            {
                id: '6002',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/6002',
                },
                attributes: {
                    createdAt: '2022-01-29T16:34:04.620Z',
                    updatedAt: '2022-01-29T16:34:04.620Z',
                    url: 'https://www.funimation.com/shows/my-dress-up-darling/',
                    subs: ['en'],
                    dubs: ['ja', 'en'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/6002/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/6002/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/6002/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/6002/media',
                        },
                    },
                },
            },
            {
                id: '5928',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/5928',
                },
                attributes: {
                    createdAt: '2022-01-08T16:56:38.887Z',
                    updatedAt: '2022-01-08T16:56:38.887Z',
                    url: 'https://www.crunchyroll.com/my-dress-up-darling',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/5928/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/5928/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/5928/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/5928/media',
                        },
                    },
                },
            },
            {
                id: '5228',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/5228',
                },
                attributes: {
                    createdAt: '2021-06-12T16:12:37.576Z',
                    updatedAt: '2021-06-12T16:12:37.576Z',
                    url: 'https://beta.crunchyroll.com/series/GG5H5X7DK/Urusei-Yatsura-Movies',
                    subs: ['en'],
                    dubs: ['ja', 'en'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/5228/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/5228/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/5228/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/5228/media',
                        },
                    },
                },
            },
            {
                id: '2236',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/2236',
                },
                attributes: {
                    createdAt: '2018-01-14T02:26:08.181Z',
                    updatedAt: '2018-01-14T02:26:08.181Z',
                    url: 'https://www.hulu.com/darling-in-the-franxx',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/2236/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/2236/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/2236/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/2236/media',
                        },
                    },
                },
            },
            {
                id: '2237',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/2237',
                },
                attributes: {
                    createdAt: '2018-01-14T02:26:30.221Z',
                    updatedAt: '2018-01-14T02:26:30.221Z',
                    url: 'http://www.crunchyroll.com/darling-in-the-franxx',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/2237/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/2237/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/2237/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/2237/media',
                        },
                    },
                },
            },
            {
                id: '3',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/3',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:15.671Z',
                    updatedAt: '2013-02-20T16:00:15.671Z',
                    name: 'Comedy',
                    slug: 'comedy',
                    description: null,
                },
            },
            {
                id: '2',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/2',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:15.657Z',
                    updatedAt: '2017-04-22T16:11:16.077Z',
                    name: 'Adventure',
                    slug: 'adventure',
                    description: '',
                },
            },
            {
                id: '5',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/5',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:15.701Z',
                    updatedAt: '2013-02-20T16:00:15.701Z',
                    name: 'Sci-Fi',
                    slug: 'sci-fi',
                    description: null,
                },
            },
            {
                id: '4',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/4',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:15.686Z',
                    updatedAt: '2016-06-10T11:23:00.431Z',
                    name: 'Drama',
                    slug: 'drama',
                    description: '',
                },
            },
            {
                id: '14',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/14',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:21.971Z',
                    updatedAt: '2016-07-13T21:31:59.654Z',
                    name: 'Romance',
                    slug: 'romance',
                    description: '',
                },
            },
            {
                id: '1',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/1',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:15.623Z',
                    updatedAt: '2016-07-17T19:30:56.164Z',
                    name: 'Action',
                    slug: 'action',
                    description: '',
                },
            },
            {
                id: '30',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/30',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:34.924Z',
                    updatedAt: '2013-02-20T16:00:34.924Z',
                    name: 'Mecha',
                    slug: 'mecha',
                    description: null,
                },
            },
            {
                id: '35',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/35',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:51.053Z',
                    updatedAt: '2013-02-20T16:00:51.053Z',
                    name: 'Music',
                    slug: 'music',
                    description: null,
                },
            },
        ],
        meta: {
            count: 816,
        },
        links: {
            first: 'https://kitsu.io/api/edge/anime?filter%5Btext%5D=My+Dress-Up+Darling&include=streamingLinks%2Cgenres&page%5Blimit%5D=5&page%5Boffset%5D=0',
            next: 'https://kitsu.io/api/edge/anime?filter%5Btext%5D=My+Dress-Up+Darling&include=streamingLinks%2Cgenres&page%5Blimit%5D=5&page%5Boffset%5D=5',
            last: 'https://kitsu.io/api/edge/anime?filter%5Btext%5D=My+Dress-Up+Darling&include=streamingLinks%2Cgenres&page%5Blimit%5D=5&page%5Boffset%5D=811',
        },
    },
    2: {
        data: [
            {
                id: '13881',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/13881',
                },
                attributes: {
                    createdAt: '2017-09-29T18:20:02.301Z',
                    updatedAt: '2022-02-17T00:10:46.385Z',
                    slug: 'boku-no-hero-academia-3rd-season',
                    synopsis:
                        "Summer is here, and the heroes of Class 1-A and 1-B are in for the toughest training camp of their lives! A group of seasoned pros pushes everyone's Quirks to new heights as the students face one overwhelming challenge after another. Braving the elements in this secret location becomes the least of their worries when routine training turns into a critical struggle for survival.\n\n(Source: Crunchyroll)",
                    description:
                        "Summer is here, and the heroes of Class 1-A and 1-B are in for the toughest training camp of their lives! A group of seasoned pros pushes everyone's Quirks to new heights as the students face one overwhelming challenge after another. Braving the elements in this secret location becomes the least of their worries when routine training turns into a critical struggle for survival.\n\n(Source: Crunchyroll)",
                    coverImageTopOffset: 0,
                    titles: {
                        en: 'My Hero Academia 3',
                        en_jp: 'Boku no Hero Academia 3',
                        ja_jp: '僕のヒーローアカデミア 3rdシーズン',
                    },
                    canonicalTitle: 'Boku no Hero Academia 3',
                    abbreviatedTitles: [],
                    averageRating: '84.7',
                    ratingFrequencies: {
                        2: '10788',
                        3: '320',
                        4: '798',
                        5: '191',
                        6: '809',
                        7: '210',
                        8: '13590',
                        9: '301',
                        10: '2304',
                        11: '599',
                        12: '3699',
                        13: '896',
                        14: '45347',
                        15: '2226',
                        16: '15757',
                        17: '3577',
                        18: '13625',
                        19: '1995',
                        20: '164166',
                    },
                    userCount: 282271,
                    favoritesCount: 1985,
                    startDate: '2018-04-07',
                    endDate: '2018-09-29',
                    nextRelease: null,
                    popularityRank: 7,
                    ratingRank: 14,
                    ageRating: 'PG',
                    ageRatingGuide: 'Teens 13 or older',
                    subtype: 'TV',
                    status: 'finished',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/13881/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/13881/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/13881/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/13881/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/13881/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: {
                        tiny: 'https://media.kitsu.io/anime/cover_images/13881/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/cover_images/13881/large.jpg',
                        small: 'https://media.kitsu.io/anime/cover_images/13881/small.jpg',
                        original:
                            'https://media.kitsu.io/anime/cover_images/13881/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 840,
                                    height: 200,
                                },
                                large: {
                                    width: 3360,
                                    height: 800,
                                },
                                small: {
                                    width: 1680,
                                    height: 400,
                                },
                            },
                        },
                    },
                    episodeCount: 25,
                    episodeLength: 24,
                    totalLength: 600,
                    youtubeVideoId: 'JezE6iZUWxo',
                    showType: 'TV',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/genres',
                        },
                        data: [
                            {
                                type: 'genres',
                                id: '3',
                            },
                            {
                                type: 'genres',
                                id: '23',
                            },
                            {
                                type: 'genres',
                                id: '24',
                            },
                            {
                                type: 'genres',
                                id: '1',
                            },
                        ],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/streaming-links',
                        },
                        data: [
                            {
                                type: 'streamingLinks',
                                id: '2690',
                            },
                            {
                                type: 'streamingLinks',
                                id: '2691',
                            },
                        ],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/anime-staff',
                        },
                    },
                },
            },
            {
                id: '13313',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/13313',
                },
                attributes: {
                    createdAt: '2017-04-01T15:03:26.305Z',
                    updatedAt: '2022-02-17T00:00:05.202Z',
                    slug: 'boku-no-hero-academia-2nd-season-hero-note',
                    synopsis:
                        'Izuku looks back at the events that brought him to U.A. High School and on his path to becoming a hero.\n\nRecap of Boku no Hero Academia that aired a week before the second season.',
                    description:
                        'Izuku looks back at the events that brought him to U.A. High School and on his path to becoming a hero.\n\nRecap of Boku no Hero Academia that aired a week before the second season.',
                    coverImageTopOffset: 0,
                    titles: {
                        en: 'My Hero Academia Season 2: Hero Notebook',
                        en_jp: 'Boku no Hero Academia 2nd Season: Hero Note',
                        en_us: 'My Hero Academia Season 2: Hero Notebook',
                        ja_jp: '僕のヒーローアカデミア 2ndシーズン ヒーローノート',
                    },
                    canonicalTitle:
                        'Boku no Hero Academia 2nd Season: Hero Note',
                    abbreviatedTitles: [
                        'My Hero Academia 2: Episode 0',
                        'Boku no Hero Academia 2nd Season: Episode 0',
                        'Boku no Hero Academia Recap',
                        'Boku no Hero Academia 13.5',
                    ],
                    averageRating: '73.82',
                    ratingFrequencies: {
                        2: '117',
                        3: '1',
                        4: '30',
                        5: '3',
                        6: '36',
                        7: '1',
                        8: '196',
                        9: '5',
                        10: '403',
                        11: '16',
                        12: '547',
                        13: '29',
                        14: '1401',
                        15: '50',
                        16: '640',
                        17: '40',
                        18: '277',
                        19: '17',
                        20: '1134',
                    },
                    userCount: 7998,
                    favoritesCount: 94,
                    startDate: '2017-03-25',
                    endDate: '2017-03-25',
                    nextRelease: null,
                    popularityRank: 1426,
                    ratingRank: 2359,
                    ageRating: 'PG',
                    ageRatingGuide: 'Teens 13 or older',
                    subtype: 'special',
                    status: 'finished',
                    tba: '',
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/13313/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/13313/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/13313/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/13313/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/13313/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: null,
                                    height: null,
                                },
                                large: {
                                    width: null,
                                    height: null,
                                },
                                small: {
                                    width: null,
                                    height: null,
                                },
                                medium: {
                                    width: null,
                                    height: null,
                                },
                            },
                        },
                    },
                    coverImage: null,
                    episodeCount: 1,
                    episodeLength: 23,
                    totalLength: 23,
                    youtubeVideoId: '',
                    showType: 'special',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13313/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/13313/genres',
                        },
                        data: [
                            {
                                type: 'genres',
                                id: '24',
                            },
                            {
                                type: 'genres',
                                id: '23',
                            },
                            {
                                type: 'genres',
                                id: '3',
                            },
                            {
                                type: 'genres',
                                id: '1',
                            },
                        ],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13313/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/13313/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13313/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/13313/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13313/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/13313/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13313/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/13313/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13313/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/13313/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13313/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/13313/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13313/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/13313/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13313/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/13313/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13313/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/13313/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13313/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/13313/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13313/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/13313/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13313/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/13313/streaming-links',
                        },
                        data: [],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13313/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/13313/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13313/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/13313/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13313/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/13313/anime-staff',
                        },
                    },
                },
            },
            {
                id: '11469',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/11469',
                },
                attributes: {
                    createdAt: '2015-10-27T22:39:09.949Z',
                    updatedAt: '2022-02-17T00:43:03.620Z',
                    slug: 'boku-no-hero-academia',
                    synopsis:
                        "What would the world be like if 80 percent of the population manifested extraordinary superpowers called “Quirks” at age four? Heroes and villains would be battling it out everywhere! Becoming a hero would mean learning to use your power, but where would you go to study? U.A. High's Hero Program of course! But what would you do if you were one of the 20 percent who were born Quirkless?\n\nMiddle school student Izuku Midoriya wants to be a hero more than anything, but he hasn't got an ounce of power in him. With no chance of ever getting into the prestigious U.A. High School for budding heroes, his life is looking more and more like a dead end. Then an encounter with All Might, the greatest hero of them all gives him a chance to change his destiny…\n\n(Source: Viz Media)",
                    description:
                        "What would the world be like if 80 percent of the population manifested extraordinary superpowers called “Quirks” at age four? Heroes and villains would be battling it out everywhere! Becoming a hero would mean learning to use your power, but where would you go to study? U.A. High's Hero Program of course! But what would you do if you were one of the 20 percent who were born Quirkless?\n\nMiddle school student Izuku Midoriya wants to be a hero more than anything, but he hasn't got an ounce of power in him. With no chance of ever getting into the prestigious U.A. High School for budding heroes, his life is looking more and more like a dead end. Then an encounter with All Might, the greatest hero of them all gives him a chance to change his destiny…\n\n(Source: Viz Media)",
                    coverImageTopOffset: 200,
                    titles: {
                        en: 'My Hero Academia',
                        en_jp: 'Boku no Hero Academia',
                        en_us: 'My Hero Academia',
                        ja_jp: '僕のヒーローアカデミア',
                    },
                    canonicalTitle: 'Boku no Hero Academia',
                    abbreviatedTitles: [],
                    averageRating: '84.43',
                    ratingFrequencies: {
                        2: '11025',
                        3: '291',
                        4: '826',
                        5: '197',
                        6: '939',
                        7: '244',
                        8: '14846',
                        9: '353',
                        10: '3085',
                        11: '640',
                        12: '5452',
                        13: '1054',
                        14: '56865',
                        15: '2614',
                        16: '23594',
                        17: '3847',
                        18: '18250',
                        19: '2023',
                        20: '181366',
                    },
                    userCount: 325631,
                    favoritesCount: 4349,
                    startDate: '2016-04-03',
                    endDate: '2016-06-26',
                    nextRelease: null,
                    popularityRank: 3,
                    ratingRank: 18,
                    ageRating: 'PG',
                    ageRatingGuide: 'Teens 13 or older',
                    subtype: 'TV',
                    status: 'finished',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/11469/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/11469/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/11469/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/11469/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/11469/original.png',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: {
                        tiny: 'https://media.kitsu.io/anime/cover_images/11469/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/cover_images/11469/large.jpg',
                        small: 'https://media.kitsu.io/anime/cover_images/11469/small.jpg',
                        original:
                            'https://media.kitsu.io/anime/cover_images/11469/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 840,
                                    height: 200,
                                },
                                large: {
                                    width: 3360,
                                    height: 800,
                                },
                                small: {
                                    width: 1680,
                                    height: 400,
                                },
                            },
                        },
                    },
                    episodeCount: 13,
                    episodeLength: 23,
                    totalLength: 312,
                    youtubeVideoId: 'D5fYOnwYkj4',
                    showType: 'TV',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11469/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/11469/genres',
                        },
                        data: [
                            {
                                type: 'genres',
                                id: '24',
                            },
                            {
                                type: 'genres',
                                id: '23',
                            },
                            {
                                type: 'genres',
                                id: '3',
                            },
                            {
                                type: 'genres',
                                id: '1',
                            },
                        ],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11469/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/11469/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11469/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/11469/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11469/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/11469/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11469/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/11469/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11469/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/11469/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11469/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/11469/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11469/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/11469/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11469/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/11469/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11469/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/11469/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11469/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/11469/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11469/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/11469/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11469/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/11469/streaming-links',
                        },
                        data: [
                            {
                                type: 'streamingLinks',
                                id: '1712',
                            },
                            {
                                type: 'streamingLinks',
                                id: '1713',
                            },
                            {
                                type: 'streamingLinks',
                                id: '1718',
                            },
                        ],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11469/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/11469/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11469/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/11469/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11469/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/11469/anime-staff',
                        },
                    },
                },
            },
            {
                id: '12268',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/12268',
                },
                attributes: {
                    createdAt: '2016-06-26T19:09:26.437Z',
                    updatedAt: '2022-02-17T00:43:07.256Z',
                    slug: 'boku-no-hero-academia-2nd-season',
                    synopsis:
                        'Taking off right after the last episode of the first season. The school is temporarily closed due to security. When U.A. restarts, it is announced that the highly anticipated School Sports Festival will soon be taking place. All classes: Hero, Support, General and Business will be participating. Tournaments all around will decide who is the top Hero in training.\n\n(Source: Anime News Network)',
                    description:
                        'Taking off right after the last episode of the first season. The school is temporarily closed due to security. When U.A. restarts, it is announced that the highly anticipated School Sports Festival will soon be taking place. All classes: Hero, Support, General and Business will be participating. Tournaments all around will decide who is the top Hero in training.\n\n(Source: Anime News Network)',
                    coverImageTopOffset: 200,
                    titles: {
                        en: 'My Hero Academia 2',
                        en_jp: 'Boku no Hero Academia 2',
                        ja_jp: '僕のヒーローアカデミア 2ndシーズン',
                    },
                    canonicalTitle: 'Boku no Hero Academia 2',
                    abbreviatedTitles: [],
                    averageRating: '84.69',
                    ratingFrequencies: {
                        2: '11237',
                        3: '289',
                        4: '823',
                        5: '211',
                        6: '1038',
                        7: '286',
                        8: '14868',
                        9: '366',
                        10: '2546',
                        11: '598',
                        12: '4220',
                        13: '939',
                        14: '53979',
                        15: '2592',
                        16: '20763',
                        17: '4144',
                        18: '18925',
                        19: '2239',
                        20: '181166',
                    },
                    userCount: 314258,
                    favoritesCount: 1774,
                    startDate: '2017-04-01',
                    endDate: '2017-09-30',
                    nextRelease: null,
                    popularityRank: 4,
                    ratingRank: 15,
                    ageRating: 'PG',
                    ageRatingGuide: 'Teens 13 or older',
                    subtype: 'TV',
                    status: 'finished',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/12268/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/12268/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/12268/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/12268/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/12268/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: {
                        tiny: 'https://media.kitsu.io/anime/cover_images/12268/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/cover_images/12268/large.jpg',
                        small: 'https://media.kitsu.io/anime/cover_images/12268/small.jpg',
                        original:
                            'https://media.kitsu.io/anime/cover_images/12268/original.png',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 840,
                                    height: 200,
                                },
                                large: {
                                    width: 3360,
                                    height: 800,
                                },
                                small: {
                                    width: 1680,
                                    height: 400,
                                },
                            },
                        },
                    },
                    episodeCount: 25,
                    episodeLength: 24,
                    totalLength: 600,
                    youtubeVideoId: '9ZIgCYSn3e8',
                    showType: 'TV',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12268/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/12268/genres',
                        },
                        data: [
                            {
                                type: 'genres',
                                id: '1',
                            },
                            {
                                type: 'genres',
                                id: '3',
                            },
                            {
                                type: 'genres',
                                id: '24',
                            },
                            {
                                type: 'genres',
                                id: '23',
                            },
                        ],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12268/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/12268/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12268/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/12268/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12268/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/12268/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12268/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/12268/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12268/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/12268/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12268/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/12268/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12268/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/12268/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12268/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/12268/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12268/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/12268/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12268/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/12268/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12268/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/12268/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12268/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/12268/streaming-links',
                        },
                        data: [
                            {
                                type: 'streamingLinks',
                                id: '1662',
                            },
                            {
                                type: 'streamingLinks',
                                id: '1663',
                            },
                            {
                                type: 'streamingLinks',
                                id: '1664',
                            },
                        ],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12268/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/12268/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12268/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/12268/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12268/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/12268/anime-staff',
                        },
                    },
                },
            },
            {
                id: '41971',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/41971',
                },
                attributes: {
                    createdAt: '2018-09-29T18:29:50.707Z',
                    updatedAt: '2022-02-17T00:00:05.202Z',
                    slug: 'boku-no-hero-academia-4th-season',
                    synopsis:
                        'The villain world teeters on the brink of war now that All For One is out of the picture. Shigaraki of the League of Villains squares off with Overhaul of the yakuza, vying for total control of the shadows. Meanwhile, Deku gets tangled in another dangerous internship as he struggles to keep pace with his upperclassman—Mirio.\n\n(Source: Crunchyroll)',
                    description:
                        'The villain world teeters on the brink of war now that All For One is out of the picture. Shigaraki of the League of Villains squares off with Overhaul of the yakuza, vying for total control of the shadows. Meanwhile, Deku gets tangled in another dangerous internship as he struggles to keep pace with his upperclassman—Mirio.\n\n(Source: Crunchyroll)',
                    coverImageTopOffset: 0,
                    titles: {
                        en: 'My Hero Academia 4',
                        en_jp: 'Boku no Hero Academia 4',
                        ja_jp: '僕のヒーローアカデミア 4th シーズン',
                    },
                    canonicalTitle: 'Boku no Hero Academia 4',
                    abbreviatedTitles: [],
                    averageRating: '78.1',
                    ratingFrequencies: {
                        2: '1662',
                        3: '5',
                        4: '37',
                        5: '6',
                        6: '84',
                        7: '11',
                        8: '543',
                        9: '30',
                        10: '487',
                        11: '74',
                        12: '1204',
                        13: '209',
                        14: '4543',
                        15: '624',
                        16: '4588',
                        17: '940',
                        18: '3233',
                        19: '400',
                        20: '7208',
                    },
                    userCount: 36662,
                    favoritesCount: 512,
                    startDate: '2019-10-12',
                    endDate: '2020-04-04',
                    nextRelease: null,
                    popularityRank: 243,
                    ratingRank: 985,
                    ageRating: 'PG',
                    ageRatingGuide: 'Teens 13 or older',
                    subtype: 'TV',
                    status: 'finished',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/41971/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/41971/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/41971/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/41971/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/41971/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: {
                        tiny: 'https://media.kitsu.io/anime/cover_images/41971/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/cover_images/41971/large.jpg',
                        small: 'https://media.kitsu.io/anime/cover_images/41971/small.jpg',
                        original:
                            'https://media.kitsu.io/anime/cover_images/41971/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 840,
                                    height: 200,
                                },
                                large: {
                                    width: 3360,
                                    height: 800,
                                },
                                small: {
                                    width: 1680,
                                    height: 400,
                                },
                            },
                        },
                    },
                    episodeCount: 25,
                    episodeLength: 24,
                    totalLength: 600,
                    youtubeVideoId: '5VQwDC5jqzQ',
                    showType: 'TV',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/41971/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/41971/genres',
                        },
                        data: [],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/41971/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/41971/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/41971/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/41971/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/41971/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/41971/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/41971/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/41971/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/41971/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/41971/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/41971/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/41971/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/41971/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/41971/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/41971/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/41971/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/41971/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/41971/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/41971/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/41971/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/41971/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/41971/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/41971/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/41971/streaming-links',
                        },
                        data: [
                            {
                                type: 'streamingLinks',
                                id: '3759',
                            },
                            {
                                type: 'streamingLinks',
                                id: '3760',
                            },
                            {
                                type: 'streamingLinks',
                                id: '3807',
                            },
                        ],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/41971/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/41971/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/41971/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/41971/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/41971/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/41971/anime-staff',
                        },
                    },
                },
            },
        ],
        included: [
            {
                id: '3',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/3',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:15.671Z',
                    updatedAt: '2013-02-20T16:00:15.671Z',
                    name: 'Comedy',
                    slug: 'comedy',
                    description: null,
                },
            },
            {
                id: '23',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/23',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:25.609Z',
                    updatedAt: '2013-02-20T16:00:25.609Z',
                    name: 'Super Power',
                    slug: 'super-power',
                    description: null,
                },
            },
            {
                id: '24',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/24',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:27.537Z',
                    updatedAt: '2013-02-20T16:00:27.537Z',
                    name: 'School',
                    slug: 'school',
                    description: null,
                },
            },
            {
                id: '1',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/1',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:15.623Z',
                    updatedAt: '2016-07-17T19:30:56.164Z',
                    name: 'Action',
                    slug: 'action',
                    description: '',
                },
            },
            {
                id: '2690',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/2690',
                },
                attributes: {
                    createdAt: '2018-04-07T16:37:55.037Z',
                    updatedAt: '2018-04-07T16:37:55.037Z',
                    url: 'http://www.crunchyroll.com/my-hero-academia',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/2690/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/2690/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/2690/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/2690/media',
                        },
                    },
                },
            },
            {
                id: '2691',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/2691',
                },
                attributes: {
                    createdAt: '2018-04-07T16:38:39.499Z',
                    updatedAt: '2018-04-07T16:38:39.499Z',
                    url: 'https://www.funimation.com/shows/my-hero-academia/',
                    subs: ['en'],
                    dubs: ['en'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/2691/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/2691/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/2691/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/2691/media',
                        },
                    },
                },
            },
            {
                id: '1712',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/1712',
                },
                attributes: {
                    createdAt: null,
                    updatedAt: null,
                    url: 'http://www.crunchyroll.com/my-hero-academia',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/1712/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/1712/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/1712/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/1712/media',
                        },
                    },
                },
            },
            {
                id: '1713',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/1713',
                },
                attributes: {
                    createdAt: null,
                    updatedAt: null,
                    url: 'https://www.funimation.com/shows/my-hero-academia/',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/1713/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/1713/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/1713/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/1713/media',
                        },
                    },
                },
            },
            {
                id: '1718',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/1718',
                },
                attributes: {
                    createdAt: null,
                    updatedAt: null,
                    url: 'https://www.hulu.com/my-hero-academia',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/1718/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/1718/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/1718/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/1718/media',
                        },
                    },
                },
            },
            {
                id: '1662',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/1662',
                },
                attributes: {
                    createdAt: null,
                    updatedAt: null,
                    url: 'https://www.funimation.com/shows/my-hero-academia/',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/1662/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/1662/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/1662/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/1662/media',
                        },
                    },
                },
            },
            {
                id: '1663',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/1663',
                },
                attributes: {
                    createdAt: null,
                    updatedAt: null,
                    url: 'http://www.crunchyroll.com/my-hero-academia',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/1663/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/1663/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/1663/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/1663/media',
                        },
                    },
                },
            },
            {
                id: '1664',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/1664',
                },
                attributes: {
                    createdAt: null,
                    updatedAt: null,
                    url: 'https://www.hulu.com/my-hero-academia',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/1664/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/1664/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/1664/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/1664/media',
                        },
                    },
                },
            },
            {
                id: '3759',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/3759',
                },
                attributes: {
                    createdAt: '2019-10-03T11:13:44.508Z',
                    updatedAt: '2019-10-03T11:13:44.508Z',
                    url: 'https://www.crunchyroll.com/my-hero-academia',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/3759/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/3759/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/3759/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/3759/media',
                        },
                    },
                },
            },
            {
                id: '3760',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/3760',
                },
                attributes: {
                    createdAt: '2019-10-03T11:14:17.192Z',
                    updatedAt: '2019-10-03T11:14:17.192Z',
                    url: 'https://www.funimation.com/shows/my-hero-academia/',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/3760/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/3760/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/3760/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/3760/media',
                        },
                    },
                },
            },
            {
                id: '3807',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/3807',
                },
                attributes: {
                    createdAt: '2019-10-12T11:58:29.413Z',
                    updatedAt: '2019-10-12T11:58:29.413Z',
                    url: 'https://www.hulu.com/my-hero-academia',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/3807/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/3807/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/3807/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/3807/media',
                        },
                    },
                },
            },
        ],
        meta: {
            count: 2485,
        },
        links: {
            first: 'https://kitsu.io/api/edge/anime?filter%5Btext%5D=My+Hero+Academia+Season+3&include=streamingLinks%2Cgenres&page%5Blimit%5D=5&page%5Boffset%5D=0',
            next: 'https://kitsu.io/api/edge/anime?filter%5Btext%5D=My+Hero+Academia+Season+3&include=streamingLinks%2Cgenres&page%5Blimit%5D=5&page%5Boffset%5D=5',
            last: 'https://kitsu.io/api/edge/anime?filter%5Btext%5D=My+Hero+Academia+Season+3&include=streamingLinks%2Cgenres&page%5Blimit%5D=5&page%5Boffset%5D=2480',
        },
    },
    3: {
        data: [
            {
                id: '43066',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/43066',
                },
                attributes: {
                    createdAt: '2020-03-16T17:14:50.652Z',
                    updatedAt: '2022-02-17T00:00:05.202Z',
                    slug: 'eighty-six',
                    synopsis:
                        'The Republic of San Magnolia.\n\nFor a long time, this country has been besieged by its neighbor, the Giadian Empire, which created a series of unmanned drones called the Legion. After years of painstaking research, the Republic finally developed autonomous drones of their own, turning the one-sided struggle into a war without casualties—or at least, that\'s what the government claims.\n\nIn truth, there is no such thing as a bloodless war. Beyond the fortified walls protecting the eighty-five Republic territories lies the "nonexistent" Eighty-Sixth Sector. The young men and women of this forsaken land are branded the Eighty-Six and, stripped of their humanity, pilot the "unmanned" weapons into battle...\n\nShinn directs the actions of a detachment of young Eighty-Sixers while on the battlefield. Lena is a "handler" who commands the detachment from the remote rear with the help of special communication.\n\nThe farewell story of the severe and sad struggle of these two begins!\n\n(Source: MU, Yen Press; edited)',
                    description:
                        'The Republic of San Magnolia.\n\nFor a long time, this country has been besieged by its neighbor, the Giadian Empire, which created a series of unmanned drones called the Legion. After years of painstaking research, the Republic finally developed autonomous drones of their own, turning the one-sided struggle into a war without casualties—or at least, that\'s what the government claims.\n\nIn truth, there is no such thing as a bloodless war. Beyond the fortified walls protecting the eighty-five Republic territories lies the "nonexistent" Eighty-Sixth Sector. The young men and women of this forsaken land are branded the Eighty-Six and, stripped of their humanity, pilot the "unmanned" weapons into battle...\n\nShinn directs the actions of a detachment of young Eighty-Sixers while on the battlefield. Lena is a "handler" who commands the detachment from the remote rear with the help of special communication.\n\nThe farewell story of the severe and sad struggle of these two begins!\n\n(Source: MU, Yen Press; edited)',
                    coverImageTopOffset: 0,
                    titles: {
                        en_jp: '86',
                        ja_jp: '86―エイティシックス―',
                    },
                    canonicalTitle: '86',
                    abbreviatedTitles: ['Eighty Six'],
                    averageRating: '81.43',
                    ratingFrequencies: {
                        2: '46',
                        3: '1',
                        4: '4',
                        5: '4',
                        6: '17',
                        7: '1',
                        8: '106',
                        9: '5',
                        10: '53',
                        11: '6',
                        12: '166',
                        13: '47',
                        14: '634',
                        15: '131',
                        16: '833',
                        17: '252',
                        18: '669',
                        19: '111',
                        20: '923',
                    },
                    userCount: 241,
                    favoritesCount: 0,
                    startDate: '2021-04-11',
                    endDate: '2021-06-20',
                    nextRelease: null,
                    popularityRank: 8417,
                    ratingRank: 367,
                    ageRating: 'R',
                    ageRatingGuide: '17+ (violence & profanity)',
                    subtype: 'TV',
                    status: 'finished',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/43066/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/43066/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/43066/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/43066/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/43066/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: {
                        tiny: 'https://media.kitsu.io/anime/cover_images/43066/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/cover_images/43066/large.jpg',
                        small: 'https://media.kitsu.io/anime/cover_images/43066/small.jpg',
                        original:
                            'https://media.kitsu.io/anime/cover_images/43066/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 840,
                                    height: 200,
                                },
                                large: {
                                    width: 3360,
                                    height: 800,
                                },
                                small: {
                                    width: 1680,
                                    height: 400,
                                },
                            },
                        },
                    },
                    episodeCount: 11,
                    episodeLength: 23,
                    totalLength: 0,
                    youtubeVideoId: 'VSdS29SDvn4',
                    showType: 'TV',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/genres',
                        },
                        data: [],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/streaming-links',
                        },
                        data: [
                            {
                                type: 'streamingLinks',
                                id: '5075',
                            },
                        ],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/anime-staff',
                        },
                    },
                },
            },
            {
                id: '45545',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/45545',
                },
                attributes: {
                    createdAt: '2021-12-02T03:31:20.049Z',
                    updatedAt: '2022-02-17T00:00:05.202Z',
                    slug: '86-part-2-special-edition-shishite-kai-aru-mono-nareba',
                    synopsis: 'Recap episode of 86 Part 2.',
                    description: 'Recap episode of 86 Part 2.',
                    coverImageTopOffset: 0,
                    titles: {
                        en: "86 Eighty-Six Episode 18.5 – If There's Something Worth Dying For",
                        en_jp: '86 Part 2 Special Edition: Shishite Kai Aru Mono Nareba',
                        ja_jp: '８６―エイティシックス― Special Edition『死して甲斐あるものなれば』',
                    },
                    canonicalTitle:
                        '86 Part 2 Special Edition: Shishite Kai Aru Mono Nareba',
                    abbreviatedTitles: ['86 Episode 18.5', '86 Recap'],
                    averageRating: '70.32',
                    ratingFrequencies: {
                        2: '2',
                        5: '1',
                        6: '2',
                        8: '2',
                        9: '1',
                        10: '9',
                        11: '1',
                        12: '13',
                        13: '1',
                        14: '9',
                        15: '3',
                        16: '2',
                        17: '1',
                        18: '1',
                        20: '8',
                    },
                    userCount: 0,
                    favoritesCount: 0,
                    startDate: '2021-11-28',
                    endDate: '2021-11-28',
                    nextRelease: null,
                    popularityRank: 17918,
                    ratingRank: 4156,
                    ageRating: 'R',
                    ageRatingGuide: '17+',
                    subtype: 'special',
                    status: 'finished',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/45545/poster_image/tiny-e48456e335779b975c25fedeef846f55.jpeg',
                        large: 'https://media.kitsu.io/anime/45545/poster_image/large-c080fad1c64f865a73774fd6bcdf3a57.jpeg',
                        small: 'https://media.kitsu.io/anime/45545/poster_image/small-b8b4d69a2454ccfae190fda61ee82586.jpeg',
                        medium: 'https://media.kitsu.io/anime/45545/poster_image/medium-aee90e20a3755a6512b907ef7280cc6e.jpeg',
                        original:
                            'https://media.kitsu.io/anime/45545/poster_image/b0bf3a1e2b4baef89aad1a430273c0a8.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: {
                        tiny: 'https://media.kitsu.io/anime/45545/cover_image/tiny-f5161225268a85138f1125a5bd62c99a.jpeg',
                        large: 'https://media.kitsu.io/anime/45545/cover_image/large-bafaf7e4050dd7ceca02280d6a151f99.jpeg',
                        small: 'https://media.kitsu.io/anime/45545/cover_image/small-91f99390302a21b7a388db81c76f338a.jpeg',
                        original:
                            'https://media.kitsu.io/anime/45545/cover_image/0a39eca236668bbc8e684f462d803e39.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 840,
                                    height: 200,
                                },
                                large: {
                                    width: 3360,
                                    height: 800,
                                },
                                small: {
                                    width: 1680,
                                    height: 400,
                                },
                            },
                        },
                    },
                    episodeCount: 1,
                    episodeLength: 23,
                    totalLength: 23,
                    youtubeVideoId: null,
                    showType: 'special',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/genres',
                        },
                        data: [],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/streaming-links',
                        },
                        data: [],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/anime-staff',
                        },
                    },
                },
            },
            {
                id: '44788',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/44788',
                },
                attributes: {
                    createdAt: '2021-06-21T17:00:18.788Z',
                    updatedAt: '2022-02-17T00:00:05.202Z',
                    slug: '86-special-edition-senya-ni-akaku-hinageshi-no-saku',
                    synopsis: '86 special edition.',
                    description: '86 special edition.',
                    coverImageTopOffset: 0,
                    titles: {
                        en_jp: '86 Special Edition: Senya ni Akaku Hinageshi no Saku',
                        ja_jp: '86-エイティシックス- Special Edition「戦野に紅く雛罌粟の咲く」',
                    },
                    canonicalTitle:
                        '86 Special Edition: Senya ni Akaku Hinageshi no Saku',
                    abbreviatedTitles: ['Eighty Six Special Edition'],
                    averageRating: '70.71',
                    ratingFrequencies: {
                        2: '5',
                        4: '3',
                        5: '1',
                        6: '3',
                        7: '1',
                        8: '14',
                        10: '30',
                        11: '2',
                        12: '55',
                        13: '10',
                        14: '102',
                        15: '7',
                        16: '40',
                        17: '5',
                        18: '15',
                        19: '3',
                        20: '39',
                    },
                    userCount: 0,
                    favoritesCount: 0,
                    startDate: '2021-06-27',
                    endDate: '2021-06-27',
                    nextRelease: null,
                    popularityRank: 18327,
                    ratingRank: 3908,
                    ageRating: 'R',
                    ageRatingGuide: '17+ (violence & profanity)',
                    subtype: 'special',
                    status: 'finished',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/44788/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/44788/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/44788/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/44788/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/44788/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: null,
                    episodeCount: 1,
                    episodeLength: null,
                    totalLength: 0,
                    youtubeVideoId: null,
                    showType: 'special',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/genres',
                        },
                        data: [],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/streaming-links',
                        },
                        data: [],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/anime-staff',
                        },
                    },
                },
            },
            {
                id: '44398',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/44398',
                },
                attributes: {
                    createdAt: '2021-04-17T18:51:54.301Z',
                    updatedAt: '2022-02-17T00:00:05.202Z',
                    slug: '86-part-2',
                    synopsis: 'The second cour of 86: Eighty-Six.',
                    description: 'The second cour of 86: Eighty-Six.',
                    coverImageTopOffset: 0,
                    titles: {
                        en: '86 Part 2',
                        en_jp: '86 Part 2',
                        ja_jp: '86－エイティシックス－ 第2クール',
                    },
                    canonicalTitle: '86 Part 2',
                    abbreviatedTitles: ['EIGHTY-SIX Part 2'],
                    averageRating: '81.79',
                    ratingFrequencies: {
                        2: '19',
                        4: '2',
                        6: '1',
                        7: '0',
                        8: '21',
                        9: '2',
                        10: '13',
                        11: '0',
                        12: '19',
                        13: '8',
                        14: '104',
                        15: '19',
                        16: '136',
                        17: '29',
                        18: '94',
                        19: '22',
                        20: '232',
                    },
                    userCount: 0,
                    favoritesCount: 0,
                    startDate: '2021-10-02',
                    endDate: '2022-03-19',
                    nextRelease: null,
                    popularityRank: 18493,
                    ratingRank: 288,
                    ageRating: 'R',
                    ageRatingGuide: '17+ (violence & profanity)',
                    subtype: 'TV',
                    status: 'current',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/44398/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/44398/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/44398/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/44398/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/44398/original.png',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: {
                        tiny: 'https://media.kitsu.io/anime/cover_images/44398/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/cover_images/44398/large.jpg',
                        small: 'https://media.kitsu.io/anime/cover_images/44398/small.jpg',
                        original:
                            'https://media.kitsu.io/anime/cover_images/44398/original.png',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 840,
                                    height: 200,
                                },
                                large: {
                                    width: 3360,
                                    height: 800,
                                },
                                small: {
                                    width: 1680,
                                    height: 400,
                                },
                            },
                        },
                    },
                    episodeCount: 12,
                    episodeLength: null,
                    totalLength: 0,
                    youtubeVideoId: 'OQ1yRGAnkC4',
                    showType: 'TV',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/genres',
                        },
                        data: [],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/streaming-links',
                        },
                        data: [
                            {
                                type: 'streamingLinks',
                                id: '5596',
                            },
                        ],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/anime-staff',
                        },
                    },
                },
            },
            {
                id: '6059',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/6059',
                },
                attributes: {
                    createdAt: '2013-02-20T17:33:43.706Z',
                    updatedAt: '2022-02-17T00:00:05.202Z',
                    slug: 'no-6',
                    synopsis:
                        'Many years ago, after the end of a bloody world war, mankind took shelter in six city-states that were peaceful and perfect... at least on the surface. However, Shion—an elite resident of the city-state No. 6—gained a new perspective on the world he lives in, thanks to a chance encounter with a mysterious boy, Nezumi. Nezumi turned out to be just one of many who lived in the desolate wasteland beyond the walls of the supposed utopia. But despite knowing that the other boy was a fugitive, Shion decided to take him in for the night and protect him, which resulted in drastic consequences: because of his actions, Shion and his mother lost their status as elites and were relocated elsewhere, and the darker side of the city began to make itself known. \nNow, a long time after their life-altering first meeting, Shion and Nezumi are finally brought together once again—the former elite and the boy on the run are about to embark on an adventure that will, in time, reveal the shattering secrets of No. 6.\n[Written by MAL Rewrite]',
                    description:
                        'Many years ago, after the end of a bloody world war, mankind took shelter in six city-states that were peaceful and perfect... at least on the surface. However, Shion—an elite resident of the city-state No. 6—gained a new perspective on the world he lives in, thanks to a chance encounter with a mysterious boy, Nezumi. Nezumi turned out to be just one of many who lived in the desolate wasteland beyond the walls of the supposed utopia. But despite knowing that the other boy was a fugitive, Shion decided to take him in for the night and protect him, which resulted in drastic consequences: because of his actions, Shion and his mother lost their status as elites and were relocated elsewhere, and the darker side of the city began to make itself known. \nNow, a long time after their life-altering first meeting, Shion and Nezumi are finally brought together once again—the former elite and the boy on the run are about to embark on an adventure that will, in time, reveal the shattering secrets of No. 6.\n[Written by MAL Rewrite]',
                    coverImageTopOffset: 150,
                    titles: {
                        en: 'No. 6',
                        en_jp: 'No.6',
                        en_us: 'No. 6',
                        ja_jp: 'NO.6［ナンバー・シックス］',
                    },
                    canonicalTitle: 'No.6',
                    abbreviatedTitles: ['Number Six', 'Number 6', 'No. Six'],
                    averageRating: '75.29',
                    ratingFrequencies: {
                        2: '116',
                        3: '1',
                        4: '119',
                        5: '3',
                        6: '157',
                        7: '4',
                        8: '579',
                        9: '17',
                        10: '727',
                        11: '30',
                        12: '1521',
                        13: '75',
                        14: '2715',
                        15: '96',
                        16: '2223',
                        17: '78',
                        18: '1534',
                        19: '48',
                        20: '2512',
                    },
                    userCount: 23058,
                    favoritesCount: 511,
                    startDate: '2011-07-08',
                    endDate: '2011-09-16',
                    nextRelease: null,
                    popularityRank: 474,
                    ratingRank: 1766,
                    ageRating: 'R',
                    ageRatingGuide: '17+ (violence & profanity)',
                    subtype: 'TV',
                    status: 'finished',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/6059/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/6059/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/6059/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/6059/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/6059/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: {
                        tiny: 'https://media.kitsu.io/anime/cover_images/6059/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/cover_images/6059/large.jpg',
                        small: 'https://media.kitsu.io/anime/cover_images/6059/small.jpg',
                        original:
                            'https://media.kitsu.io/anime/cover_images/6059/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 840,
                                    height: 200,
                                },
                                large: {
                                    width: 3360,
                                    height: 800,
                                },
                                small: {
                                    width: 1680,
                                    height: 400,
                                },
                            },
                        },
                    },
                    episodeCount: 11,
                    episodeLength: 23,
                    totalLength: 253,
                    youtubeVideoId: 'x2ig6nNs4xU',
                    showType: 'TV',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/genres',
                        },
                        data: [
                            {
                                type: 'genres',
                                id: '1',
                            },
                            {
                                type: 'genres',
                                id: '5',
                            },
                            {
                                type: 'genres',
                                id: '7',
                            },
                            {
                                type: 'genres',
                                id: '4',
                            },
                        ],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/streaming-links',
                        },
                        data: [
                            {
                                type: 'streamingLinks',
                                id: '1003',
                            },
                            {
                                type: 'streamingLinks',
                                id: '1004',
                            },
                        ],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/anime-staff',
                        },
                    },
                },
            },
        ],
        included: [
            {
                id: '5075',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/5075',
                },
                attributes: {
                    createdAt: '2021-05-04T09:32:07.800Z',
                    updatedAt: '2021-05-04T09:32:07.800Z',
                    url: 'https://www.crunchyroll.com/en-gb/86-eighty-six',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/5075/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/5075/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/5075/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/5075/media',
                        },
                    },
                },
            },
            {
                id: '5596',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/5596',
                },
                attributes: {
                    createdAt: '2021-10-03T18:09:36.664Z',
                    updatedAt: '2021-10-03T18:09:36.664Z',
                    url: 'https://www.crunchyroll.com/en-gb/86-eighty-six',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/5596/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/5596/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/5596/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/5596/media',
                        },
                    },
                },
            },
            {
                id: '1003',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/1003',
                },
                attributes: {
                    createdAt: null,
                    updatedAt: null,
                    url: 'http://www.hulu.com/no-6',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/1003/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/1003/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/1003/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/1003/media',
                        },
                    },
                },
            },
            {
                id: '1004',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/1004',
                },
                attributes: {
                    createdAt: null,
                    updatedAt: null,
                    url: 'http://www.crunchyroll.com/no-6',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/1004/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/1004/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/1004/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/1004/media',
                        },
                    },
                },
            },
            {
                id: '1',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/1',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:15.623Z',
                    updatedAt: '2016-07-17T19:30:56.164Z',
                    name: 'Action',
                    slug: 'action',
                    description: '',
                },
            },
            {
                id: '5',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/5',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:15.701Z',
                    updatedAt: '2013-02-20T16:00:15.701Z',
                    name: 'Sci-Fi',
                    slug: 'sci-fi',
                    description: null,
                },
            },
            {
                id: '7',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/7',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:17.012Z',
                    updatedAt: '2013-02-20T16:00:17.012Z',
                    name: 'Mystery',
                    slug: 'mystery',
                    description: null,
                },
            },
            {
                id: '4',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/4',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:15.686Z',
                    updatedAt: '2016-06-10T11:23:00.431Z',
                    name: 'Drama',
                    slug: 'drama',
                    description: '',
                },
            },
        ],
        meta: {
            count: 575,
        },
        links: {
            first: 'https://kitsu.io/api/edge/anime?filter%5Btext%5D=86+EIGHTY-SIX&include=streamingLinks%2Cgenres&page%5Blimit%5D=5&page%5Boffset%5D=0',
            next: 'https://kitsu.io/api/edge/anime?filter%5Btext%5D=86+EIGHTY-SIX&include=streamingLinks%2Cgenres&page%5Blimit%5D=5&page%5Boffset%5D=5',
            last: 'https://kitsu.io/api/edge/anime?filter%5Btext%5D=86+EIGHTY-SIX&include=streamingLinks%2Cgenres&page%5Blimit%5D=5&page%5Boffset%5D=570',
        },
    },
};

const SeriesResults = {
    0: {
        data: [
            {
                id: '12',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/12',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:25.722Z',
                    updatedAt: '2022-02-16T02:13:25.768Z',
                    slug: 'one-piece',
                    synopsis:
                        'Gol D. Roger was known as the "Pirate King," the strongest and most infamous being to have sailed the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece—which promises an unlimited amount of riches and fame—and quite possibly the pinnacle of glory and the title of the Pirate King.\nEnter Monkey D. Luffy, a 17-year-old boy who defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate ransacking villages for fun, Luffy’s reason for being a pirate is one of pure wonder: the thought of an exciting adventure that leads him to intriguing people and ultimately, the promised treasure. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach the most coveted of all fortunes—One Piece.\n[Written by MAL Rewrite]',
                    description:
                        'Gol D. Roger was known as the "Pirate King," the strongest and most infamous being to have sailed the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece—which promises an unlimited amount of riches and fame—and quite possibly the pinnacle of glory and the title of the Pirate King.\nEnter Monkey D. Luffy, a 17-year-old boy who defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate ransacking villages for fun, Luffy’s reason for being a pirate is one of pure wonder: the thought of an exciting adventure that leads him to intriguing people and ultimately, the promised treasure. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach the most coveted of all fortunes—One Piece.\n[Written by MAL Rewrite]',
                    coverImageTopOffset: 50,
                    titles: {
                        en: 'One Piece',
                        en_jp: 'One Piece',
                        ja_jp: 'ONE PIECE',
                    },
                    canonicalTitle: 'One Piece',
                    abbreviatedTitles: ['ワンピース'],
                    averageRating: '83.11',
                    ratingFrequencies: {
                        2: '7635',
                        3: '165',
                        4: '562',
                        5: '119',
                        6: '499',
                        7: '110',
                        8: '8710',
                        9: '143',
                        10: '1617',
                        11: '220',
                        12: '2729',
                        13: '281',
                        14: '19588',
                        15: '641',
                        16: '7368',
                        17: '1102',
                        18: '7826',
                        19: '1053',
                        20: '82467',
                    },
                    userCount: 186101,
                    favoritesCount: 6578,
                    startDate: '1999-10-20',
                    endDate: null,
                    nextRelease: '2022-02-20T09:30:00.000+09:00',
                    popularityRank: 14,
                    ratingRank: 33,
                    ageRating: 'PG',
                    ageRatingGuide: 'Teens 13 or older',
                    subtype: 'TV',
                    status: 'current',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/12/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/12/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/12/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/12/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/12/original.png',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: {
                        tiny: 'https://media.kitsu.io/anime/12/cover_image/tiny-cd1b0729d5c15400bfa2441ea3751e86.jpeg',
                        large: 'https://media.kitsu.io/anime/12/cover_image/large-3e72f400a87b5241780c5082f0582611.jpeg',
                        small: 'https://media.kitsu.io/anime/12/cover_image/small-8d0cbc39cac65d5d7c4db5f5b3742ae7.jpeg',
                        original:
                            'https://media.kitsu.io/anime/12/cover_image/21ecb556255bd46b95aea4779d19789f.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 840,
                                    height: 200,
                                },
                                large: {
                                    width: 3360,
                                    height: 800,
                                },
                                small: {
                                    width: 1680,
                                    height: 400,
                                },
                            },
                        },
                    },
                    episodeCount: null,
                    episodeLength: 24,
                    totalLength: 28056,
                    youtubeVideoId: 'CmTeYj2FmRc',
                    showType: 'TV',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/12/genres',
                        },
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/12/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/12/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/12/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/12/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/12/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/12/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/12/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/staff',
                            related: 'https://kitsu.io/api/edge/anime/12/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/12/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/12/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/12/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/12/streaming-links',
                        },
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/12/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/12/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/12/anime-staff',
                        },
                    },
                },
            },
            {
                id: '421',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/421',
                },
                attributes: {
                    createdAt: '2013-02-20T16:06:54.084Z',
                    updatedAt: '2022-02-16T00:00:08.651Z',
                    slug: 'one-piece-2000',
                    synopsis:
                        "Woonan is the legendary Great Gold Pirate, earning the nickname after accumulating about 1/3 of the gold available in the world. Even after his disappearance, the tales of his gold being stashed away in a remote island continue to persist, a juicy target that other pirates lust for.\nOne of the pirates going to great lengths to attain the treasure is El Drago. He and his crew have hunted down Woonan's former crew members one by one, and along the way, they find the map that will take them to the hidden island.\nThe map is not all they come across; they also manage to come into contact with the straw hat pirates. After a short battle, Luffy and company are robbed and separated from one another. Now they must find a way to make it to the island before El Drago does and take the legendary treasure for themselves.",
                    description:
                        "Woonan is the legendary Great Gold Pirate, earning the nickname after accumulating about 1/3 of the gold available in the world. Even after his disappearance, the tales of his gold being stashed away in a remote island continue to persist, a juicy target that other pirates lust for.\nOne of the pirates going to great lengths to attain the treasure is El Drago. He and his crew have hunted down Woonan's former crew members one by one, and along the way, they find the map that will take them to the hidden island.\nThe map is not all they come across; they also manage to come into contact with the straw hat pirates. After a short battle, Luffy and company are robbed and separated from one another. Now they must find a way to make it to the island before El Drago does and take the legendary treasure for themselves.",
                    coverImageTopOffset: 0,
                    titles: {
                        en_jp: 'One Piece Movie 1',
                        ja_jp: 'ONE PIECE',
                    },
                    canonicalTitle: 'One Piece Movie 1',
                    abbreviatedTitles: ['One Piece: The Movie'],
                    averageRating: '71.07',
                    ratingFrequencies: {
                        2: '35',
                        3: '1',
                        4: '38',
                        5: '0',
                        6: '57',
                        7: '4',
                        8: '195',
                        9: '5',
                        10: '466',
                        11: '10',
                        12: '880',
                        13: '32',
                        14: '1422',
                        15: '21',
                        16: '685',
                        17: '15',
                        18: '243',
                        19: '3',
                        20: '712',
                    },
                    userCount: 6870,
                    favoritesCount: 34,
                    startDate: '2000-03-04',
                    endDate: '2000-03-04',
                    nextRelease: null,
                    popularityRank: 1634,
                    ratingRank: 3730,
                    ageRating: 'PG',
                    ageRatingGuide: 'Teens 13 or older',
                    subtype: 'movie',
                    status: 'finished',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/421/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/421/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/421/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/421/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/421/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: null,
                                    height: null,
                                },
                                large: {
                                    width: null,
                                    height: null,
                                },
                                small: {
                                    width: null,
                                    height: null,
                                },
                                medium: {
                                    width: null,
                                    height: null,
                                },
                            },
                        },
                    },
                    coverImage: null,
                    episodeCount: 1,
                    episodeLength: 50,
                    totalLength: 50,
                    youtubeVideoId: 'eEApDotghec',
                    showType: 'movie',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/421/genres',
                        },
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/421/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/421/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/421/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/421/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/421/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/421/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/421/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/421/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/421/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/421/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/421/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/421/streaming-links',
                        },
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/421/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/421/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/421/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/421/anime-staff',
                        },
                    },
                },
            },
            {
                id: '6827',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/6827',
                },
                attributes: {
                    createdAt: '2013-02-20T17:46:00.433Z',
                    updatedAt: '2022-02-16T00:00:08.651Z',
                    slug: 'one-piece-film-z',
                    synopsis:
                        'The Straw Hat Pirates enter the rough seas of the New World in search of the hidden treasures of the Pirate King, Gol D. Roger－One Piece. On their voyage, the pirates come across a terrifying, powerful man, former Marine Admiral Z.\nZ is accused of having stolen the "Dyna Stones", weapons believed to have the power to shake up the New World. The Marine Headquarters believes Z is about to use it to end the pirate era, and with it, the lives of many innocent people. In fear of such a phenomenal event, marines start to take action against the former admiral.\nEven if it means stumbling upon marines and the navy, the Straw Hat Pirates decided to chase after Z and stop him from causing havoc. As they continue to embark on their ventures, the pirates bump into new and familiar acquaintances.',
                    description:
                        'The Straw Hat Pirates enter the rough seas of the New World in search of the hidden treasures of the Pirate King, Gol D. Roger－One Piece. On their voyage, the pirates come across a terrifying, powerful man, former Marine Admiral Z.\nZ is accused of having stolen the "Dyna Stones", weapons believed to have the power to shake up the New World. The Marine Headquarters believes Z is about to use it to end the pirate era, and with it, the lives of many innocent people. In fear of such a phenomenal event, marines start to take action against the former admiral.\nEven if it means stumbling upon marines and the navy, the Straw Hat Pirates decided to chase after Z and stop him from causing havoc. As they continue to embark on their ventures, the pirates bump into new and familiar acquaintances.',
                    coverImageTopOffset: 0,
                    titles: {
                        en: 'One Piece Film Z',
                        en_jp: 'One Piece Film: Z',
                        en_us: 'One Piece Film Z',
                        ja_jp: 'ワンピース　フィルム　﻿Ｚ',
                    },
                    canonicalTitle: 'One Piece Film: Z',
                    abbreviatedTitles: ['One Piece Movie 12'],
                    averageRating: '82.06',
                    ratingFrequencies: {
                        2: '829',
                        3: '21',
                        4: '55',
                        5: '6',
                        6: '80',
                        7: '12',
                        8: '638',
                        9: '9',
                        10: '267',
                        11: '24',
                        12: '628',
                        13: '73',
                        14: '2713',
                        15: '147',
                        16: '2465',
                        17: '227',
                        18: '1705',
                        19: '121',
                        20: '8165',
                    },
                    userCount: 22714,
                    favoritesCount: 106,
                    startDate: '2012-12-15',
                    endDate: '2012-12-15',
                    nextRelease: null,
                    popularityRank: 483,
                    ratingRank: 177,
                    ageRating: 'PG',
                    ageRatingGuide: 'Teens 13 or older',
                    subtype: 'movie',
                    status: 'finished',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/6827/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/6827/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/6827/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/6827/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/6827/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: {
                        tiny: 'https://media.kitsu.io/anime/cover_images/6827/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/cover_images/6827/large.jpg',
                        small: 'https://media.kitsu.io/anime/cover_images/6827/small.jpg',
                        original:
                            'https://media.kitsu.io/anime/cover_images/6827/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 840,
                                    height: 200,
                                },
                                large: {
                                    width: 3360,
                                    height: 800,
                                },
                                small: {
                                    width: 1680,
                                    height: 400,
                                },
                            },
                        },
                    },
                    episodeCount: 1,
                    episodeLength: 107,
                    totalLength: 107,
                    youtubeVideoId: '1gGt1Mg_zSo',
                    showType: 'movie',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/genres',
                        },
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/streaming-links',
                        },
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6827/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/6827/anime-staff',
                        },
                    },
                },
            },
            {
                id: '11351',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/11351',
                },
                attributes: {
                    createdAt: '2015-08-29T13:45:12.287Z',
                    updatedAt: '2022-02-16T00:00:08.651Z',
                    slug: 'one-piece-film-gold',
                    synopsis:
                        'The Straw Hat Pirates are taking on Gild Tesoro, one of the richest men in the world.\n(Source: IMDb)',
                    description:
                        'The Straw Hat Pirates are taking on Gild Tesoro, one of the richest men in the world.\n(Source: IMDb)',
                    coverImageTopOffset: 250,
                    titles: {
                        en_jp: 'One Piece Film: Gold',
                        ja_jp: 'ONE PIECE FILM GOLD',
                    },
                    canonicalTitle: 'One Piece Film: Gold',
                    abbreviatedTitles: ['One Piece Movie 13'],
                    averageRating: '81.83',
                    ratingFrequencies: {
                        2: '352',
                        3: '3',
                        4: '16',
                        5: '14',
                        6: '21',
                        7: '7',
                        8: '252',
                        9: '10',
                        10: '123',
                        11: '21',
                        12: '314',
                        13: '58',
                        14: '1510',
                        15: '110',
                        16: '1337',
                        17: '167',
                        18: '704',
                        19: '67',
                        20: '3685',
                    },
                    userCount: 12645,
                    favoritesCount: 37,
                    startDate: '2016-07-23',
                    endDate: '2016-07-23',
                    nextRelease: null,
                    popularityRank: 938,
                    ratingRank: 278,
                    ageRating: 'PG',
                    ageRatingGuide: 'Teens 13 or older',
                    subtype: 'movie',
                    status: 'finished',
                    tba: '',
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/11351/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/11351/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/11351/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/11351/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/11351/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: {
                        tiny: 'https://media.kitsu.io/anime/cover_images/11351/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/cover_images/11351/large.jpg',
                        small: 'https://media.kitsu.io/anime/cover_images/11351/small.jpg',
                        original:
                            'https://media.kitsu.io/anime/cover_images/11351/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 840,
                                    height: 200,
                                },
                                large: {
                                    width: 3360,
                                    height: 800,
                                },
                                small: {
                                    width: 1680,
                                    height: 400,
                                },
                            },
                        },
                    },
                    episodeCount: 1,
                    episodeLength: 120,
                    totalLength: 120,
                    youtubeVideoId: 'BvqD6Oamf0U',
                    showType: 'movie',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/genres',
                        },
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/streaming-links',
                        },
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/11351/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/11351/anime-staff',
                        },
                    },
                },
            },
            {
                id: '3492',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/3492',
                },
                attributes: {
                    createdAt: '2013-02-20T16:53:42.492Z',
                    updatedAt: '2022-02-16T00:00:08.651Z',
                    slug: 'one-piece-strong-world',
                    synopsis:
                        '20 years after his escape from Impel Down, the legendary pirate Shiki "the Golden Lion" reappears causing massive upheaval to the Marines. During his long seclusion, he was able to come up with a scheme to bring the World Government to its knees. On his way to execute the plan, Shiki crosses paths with the Straw Hat Pirates and becomes so impressed with Nami\'s knowledge of meteorology that he abducts her to forcedly enlist her into his crew. Luffy and the gang end up on a strange land populated with monstrous beasts as they desperately search for Shiki and Nami.\n(Source: ANN)',
                    description:
                        '20 years after his escape from Impel Down, the legendary pirate Shiki "the Golden Lion" reappears causing massive upheaval to the Marines. During his long seclusion, he was able to come up with a scheme to bring the World Government to its knees. On his way to execute the plan, Shiki crosses paths with the Straw Hat Pirates and becomes so impressed with Nami\'s knowledge of meteorology that he abducts her to forcedly enlist her into his crew. Luffy and the gang end up on a strange land populated with monstrous beasts as they desperately search for Shiki and Nami.\n(Source: ANN)',
                    coverImageTopOffset: 163,
                    titles: {
                        en: 'One Piece Film Strong World',
                        en_jp: 'One Piece Film: Strong World',
                        en_us: 'One Piece Film Strong World',
                        ja_jp: 'ワンピース　フィルム　ストロングワールド',
                    },
                    canonicalTitle: 'One Piece Film: Strong World',
                    abbreviatedTitles: ['One Piece Movie 10'],
                    averageRating: '82.09',
                    ratingFrequencies: {
                        2: '639',
                        3: '9',
                        4: '34',
                        5: '2',
                        6: '44',
                        7: '9',
                        8: '481',
                        9: '9',
                        10: '251',
                        11: '21',
                        12: '618',
                        13: '31',
                        14: '2247',
                        15: '132',
                        16: '2260',
                        17: '166',
                        18: '1952',
                        19: '70',
                        20: '6311',
                    },
                    userCount: 19304,
                    favoritesCount: 70,
                    startDate: '2009-12-12',
                    endDate: '2009-12-12',
                    nextRelease: null,
                    popularityRank: 596,
                    ratingRank: 127,
                    ageRating: 'PG',
                    ageRatingGuide: 'Teens 13 or older',
                    subtype: 'movie',
                    status: 'finished',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/3492/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/3492/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/3492/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/3492/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/3492/original.png',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: {
                        tiny: 'https://media.kitsu.io/anime/cover_images/3492/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/cover_images/3492/large.jpg',
                        small: 'https://media.kitsu.io/anime/cover_images/3492/small.jpg',
                        original:
                            'https://media.kitsu.io/anime/cover_images/3492/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 840,
                                    height: 200,
                                },
                                large: {
                                    width: 3360,
                                    height: 800,
                                },
                                small: {
                                    width: 1680,
                                    height: 400,
                                },
                            },
                        },
                    },
                    episodeCount: 1,
                    episodeLength: 115,
                    totalLength: 115,
                    youtubeVideoId: '3n58UPvcD7I',
                    showType: 'movie',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/genres',
                        },
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/streaming-links',
                        },
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/3492/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/3492/anime-staff',
                        },
                    },
                },
            },
        ],
        meta: {
            count: 1066,
        },
        links: {
            first: 'https://kitsu.io/api/edge/anime?filter%5Btext%5D=One+Piece&page%5Blimit%5D=5&page%5Boffset%5D=0',
            next: 'https://kitsu.io/api/edge/anime?filter%5Btext%5D=One+Piece&page%5Blimit%5D=5&page%5Boffset%5D=5',
            last: 'https://kitsu.io/api/edge/anime?filter%5Btext%5D=One+Piece&page%5Blimit%5D=5&page%5Boffset%5D=1061',
        },
    },
    3: {
        data: [
            {
                id: '43066',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/43066',
                },
                attributes: {
                    createdAt: '2020-03-16T17:14:50.652Z',
                    updatedAt: '2022-02-17T00:00:05.202Z',
                    slug: 'eighty-six',
                    synopsis:
                        'The Republic of San Magnolia.\n\nFor a long time, this country has been besieged by its neighbor, the Giadian Empire, which created a series of unmanned drones called the Legion. After years of painstaking research, the Republic finally developed autonomous drones of their own, turning the one-sided struggle into a war without casualties—or at least, that\'s what the government claims.\n\nIn truth, there is no such thing as a bloodless war. Beyond the fortified walls protecting the eighty-five Republic territories lies the "nonexistent" Eighty-Sixth Sector. The young men and women of this forsaken land are branded the Eighty-Six and, stripped of their humanity, pilot the "unmanned" weapons into battle...\n\nShinn directs the actions of a detachment of young Eighty-Sixers while on the battlefield. Lena is a "handler" who commands the detachment from the remote rear with the help of special communication.\n\nThe farewell story of the severe and sad struggle of these two begins!\n\n(Source: MU, Yen Press; edited)',
                    description:
                        'The Republic of San Magnolia.\n\nFor a long time, this country has been besieged by its neighbor, the Giadian Empire, which created a series of unmanned drones called the Legion. After years of painstaking research, the Republic finally developed autonomous drones of their own, turning the one-sided struggle into a war without casualties—or at least, that\'s what the government claims.\n\nIn truth, there is no such thing as a bloodless war. Beyond the fortified walls protecting the eighty-five Republic territories lies the "nonexistent" Eighty-Sixth Sector. The young men and women of this forsaken land are branded the Eighty-Six and, stripped of their humanity, pilot the "unmanned" weapons into battle...\n\nShinn directs the actions of a detachment of young Eighty-Sixers while on the battlefield. Lena is a "handler" who commands the detachment from the remote rear with the help of special communication.\n\nThe farewell story of the severe and sad struggle of these two begins!\n\n(Source: MU, Yen Press; edited)',
                    coverImageTopOffset: 0,
                    titles: {
                        en_jp: '86',
                        ja_jp: '86―エイティシックス―',
                    },
                    canonicalTitle: '86',
                    abbreviatedTitles: ['Eighty Six'],
                    averageRating: '81.43',
                    ratingFrequencies: {
                        2: '46',
                        3: '1',
                        4: '4',
                        5: '4',
                        6: '17',
                        7: '1',
                        8: '106',
                        9: '5',
                        10: '53',
                        11: '6',
                        12: '166',
                        13: '47',
                        14: '634',
                        15: '131',
                        16: '833',
                        17: '252',
                        18: '669',
                        19: '111',
                        20: '923',
                    },
                    userCount: 241,
                    favoritesCount: 0,
                    startDate: '2021-04-11',
                    endDate: '2021-06-20',
                    nextRelease: null,
                    popularityRank: 8417,
                    ratingRank: 367,
                    ageRating: 'R',
                    ageRatingGuide: '17+ (violence & profanity)',
                    subtype: 'TV',
                    status: 'finished',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/43066/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/43066/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/43066/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/43066/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/43066/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: {
                        tiny: 'https://media.kitsu.io/anime/cover_images/43066/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/cover_images/43066/large.jpg',
                        small: 'https://media.kitsu.io/anime/cover_images/43066/small.jpg',
                        original:
                            'https://media.kitsu.io/anime/cover_images/43066/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 840,
                                    height: 200,
                                },
                                large: {
                                    width: 3360,
                                    height: 800,
                                },
                                small: {
                                    width: 1680,
                                    height: 400,
                                },
                            },
                        },
                    },
                    episodeCount: 11,
                    episodeLength: 23,
                    totalLength: 0,
                    youtubeVideoId: 'VSdS29SDvn4',
                    showType: 'TV',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/genres',
                        },
                        data: [],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/streaming-links',
                        },
                        data: [
                            {
                                type: 'streamingLinks',
                                id: '5075',
                            },
                        ],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/43066/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/43066/anime-staff',
                        },
                    },
                },
            },
            {
                id: '45545',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/45545',
                },
                attributes: {
                    createdAt: '2021-12-02T03:31:20.049Z',
                    updatedAt: '2022-02-17T00:00:05.202Z',
                    slug: '86-part-2-special-edition-shishite-kai-aru-mono-nareba',
                    synopsis: 'Recap episode of 86 Part 2.',
                    description: 'Recap episode of 86 Part 2.',
                    coverImageTopOffset: 0,
                    titles: {
                        en: "86 Eighty-Six Episode 18.5 – If There's Something Worth Dying For",
                        en_jp: '86 Part 2 Special Edition: Shishite Kai Aru Mono Nareba',
                        ja_jp: '８６―エイティシックス― Special Edition『死して甲斐あるものなれば』',
                    },
                    canonicalTitle:
                        '86 Part 2 Special Edition: Shishite Kai Aru Mono Nareba',
                    abbreviatedTitles: ['86 Episode 18.5', '86 Recap'],
                    averageRating: '70.32',
                    ratingFrequencies: {
                        2: '2',
                        5: '1',
                        6: '2',
                        8: '2',
                        9: '1',
                        10: '9',
                        11: '1',
                        12: '13',
                        13: '1',
                        14: '9',
                        15: '3',
                        16: '2',
                        17: '1',
                        18: '1',
                        20: '8',
                    },
                    userCount: 0,
                    favoritesCount: 0,
                    startDate: '2021-11-28',
                    endDate: '2021-11-28',
                    nextRelease: null,
                    popularityRank: 17918,
                    ratingRank: 4156,
                    ageRating: 'R',
                    ageRatingGuide: '17+',
                    subtype: 'special',
                    status: 'finished',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/45545/poster_image/tiny-e48456e335779b975c25fedeef846f55.jpeg',
                        large: 'https://media.kitsu.io/anime/45545/poster_image/large-c080fad1c64f865a73774fd6bcdf3a57.jpeg',
                        small: 'https://media.kitsu.io/anime/45545/poster_image/small-b8b4d69a2454ccfae190fda61ee82586.jpeg',
                        medium: 'https://media.kitsu.io/anime/45545/poster_image/medium-aee90e20a3755a6512b907ef7280cc6e.jpeg',
                        original:
                            'https://media.kitsu.io/anime/45545/poster_image/b0bf3a1e2b4baef89aad1a430273c0a8.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: {
                        tiny: 'https://media.kitsu.io/anime/45545/cover_image/tiny-f5161225268a85138f1125a5bd62c99a.jpeg',
                        large: 'https://media.kitsu.io/anime/45545/cover_image/large-bafaf7e4050dd7ceca02280d6a151f99.jpeg',
                        small: 'https://media.kitsu.io/anime/45545/cover_image/small-91f99390302a21b7a388db81c76f338a.jpeg',
                        original:
                            'https://media.kitsu.io/anime/45545/cover_image/0a39eca236668bbc8e684f462d803e39.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 840,
                                    height: 200,
                                },
                                large: {
                                    width: 3360,
                                    height: 800,
                                },
                                small: {
                                    width: 1680,
                                    height: 400,
                                },
                            },
                        },
                    },
                    episodeCount: 1,
                    episodeLength: 23,
                    totalLength: 23,
                    youtubeVideoId: null,
                    showType: 'special',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/genres',
                        },
                        data: [],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/streaming-links',
                        },
                        data: [],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/45545/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/45545/anime-staff',
                        },
                    },
                },
            },
            {
                id: '44788',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/44788',
                },
                attributes: {
                    createdAt: '2021-06-21T17:00:18.788Z',
                    updatedAt: '2022-02-17T00:00:05.202Z',
                    slug: '86-special-edition-senya-ni-akaku-hinageshi-no-saku',
                    synopsis: '86 special edition.',
                    description: '86 special edition.',
                    coverImageTopOffset: 0,
                    titles: {
                        en_jp: '86 Special Edition: Senya ni Akaku Hinageshi no Saku',
                        ja_jp: '86-エイティシックス- Special Edition「戦野に紅く雛罌粟の咲く」',
                    },
                    canonicalTitle:
                        '86 Special Edition: Senya ni Akaku Hinageshi no Saku',
                    abbreviatedTitles: ['Eighty Six Special Edition'],
                    averageRating: '70.71',
                    ratingFrequencies: {
                        2: '5',
                        4: '3',
                        5: '1',
                        6: '3',
                        7: '1',
                        8: '14',
                        10: '30',
                        11: '2',
                        12: '55',
                        13: '10',
                        14: '102',
                        15: '7',
                        16: '40',
                        17: '5',
                        18: '15',
                        19: '3',
                        20: '39',
                    },
                    userCount: 0,
                    favoritesCount: 0,
                    startDate: '2021-06-27',
                    endDate: '2021-06-27',
                    nextRelease: null,
                    popularityRank: 18327,
                    ratingRank: 3908,
                    ageRating: 'R',
                    ageRatingGuide: '17+ (violence & profanity)',
                    subtype: 'special',
                    status: 'finished',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/44788/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/44788/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/44788/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/44788/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/44788/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: null,
                    episodeCount: 1,
                    episodeLength: null,
                    totalLength: 0,
                    youtubeVideoId: null,
                    showType: 'special',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/genres',
                        },
                        data: [],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/streaming-links',
                        },
                        data: [],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44788/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/44788/anime-staff',
                        },
                    },
                },
            },
            {
                id: '44398',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/44398',
                },
                attributes: {
                    createdAt: '2021-04-17T18:51:54.301Z',
                    updatedAt: '2022-02-17T00:00:05.202Z',
                    slug: '86-part-2',
                    synopsis: 'The second cour of 86: Eighty-Six.',
                    description: 'The second cour of 86: Eighty-Six.',
                    coverImageTopOffset: 0,
                    titles: {
                        en: '86 Part 2',
                        en_jp: '86 Part 2',
                        ja_jp: '86－エイティシックス－ 第2クール',
                    },
                    canonicalTitle: '86 Part 2',
                    abbreviatedTitles: ['EIGHTY-SIX Part 2'],
                    averageRating: '81.79',
                    ratingFrequencies: {
                        2: '19',
                        4: '2',
                        6: '1',
                        7: '0',
                        8: '21',
                        9: '2',
                        10: '13',
                        11: '0',
                        12: '19',
                        13: '8',
                        14: '104',
                        15: '19',
                        16: '136',
                        17: '29',
                        18: '94',
                        19: '22',
                        20: '232',
                    },
                    userCount: 0,
                    favoritesCount: 0,
                    startDate: '2021-10-02',
                    endDate: '2022-03-19',
                    nextRelease: null,
                    popularityRank: 18493,
                    ratingRank: 288,
                    ageRating: 'R',
                    ageRatingGuide: '17+ (violence & profanity)',
                    subtype: 'TV',
                    status: 'current',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/44398/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/44398/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/44398/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/44398/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/44398/original.png',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: {
                        tiny: 'https://media.kitsu.io/anime/cover_images/44398/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/cover_images/44398/large.jpg',
                        small: 'https://media.kitsu.io/anime/cover_images/44398/small.jpg',
                        original:
                            'https://media.kitsu.io/anime/cover_images/44398/original.png',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 840,
                                    height: 200,
                                },
                                large: {
                                    width: 3360,
                                    height: 800,
                                },
                                small: {
                                    width: 1680,
                                    height: 400,
                                },
                            },
                        },
                    },
                    episodeCount: 12,
                    episodeLength: null,
                    totalLength: 0,
                    youtubeVideoId: 'OQ1yRGAnkC4',
                    showType: 'TV',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/genres',
                        },
                        data: [],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/streaming-links',
                        },
                        data: [
                            {
                                type: 'streamingLinks',
                                id: '5596',
                            },
                        ],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44398/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/44398/anime-staff',
                        },
                    },
                },
            },
            {
                id: '6059',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/6059',
                },
                attributes: {
                    createdAt: '2013-02-20T17:33:43.706Z',
                    updatedAt: '2022-02-17T00:00:05.202Z',
                    slug: 'no-6',
                    synopsis:
                        'Many years ago, after the end of a bloody world war, mankind took shelter in six city-states that were peaceful and perfect... at least on the surface. However, Shion—an elite resident of the city-state No. 6—gained a new perspective on the world he lives in, thanks to a chance encounter with a mysterious boy, Nezumi. Nezumi turned out to be just one of many who lived in the desolate wasteland beyond the walls of the supposed utopia. But despite knowing that the other boy was a fugitive, Shion decided to take him in for the night and protect him, which resulted in drastic consequences: because of his actions, Shion and his mother lost their status as elites and were relocated elsewhere, and the darker side of the city began to make itself known. \nNow, a long time after their life-altering first meeting, Shion and Nezumi are finally brought together once again—the former elite and the boy on the run are about to embark on an adventure that will, in time, reveal the shattering secrets of No. 6.\n[Written by MAL Rewrite]',
                    description:
                        'Many years ago, after the end of a bloody world war, mankind took shelter in six city-states that were peaceful and perfect... at least on the surface. However, Shion—an elite resident of the city-state No. 6—gained a new perspective on the world he lives in, thanks to a chance encounter with a mysterious boy, Nezumi. Nezumi turned out to be just one of many who lived in the desolate wasteland beyond the walls of the supposed utopia. But despite knowing that the other boy was a fugitive, Shion decided to take him in for the night and protect him, which resulted in drastic consequences: because of his actions, Shion and his mother lost their status as elites and were relocated elsewhere, and the darker side of the city began to make itself known. \nNow, a long time after their life-altering first meeting, Shion and Nezumi are finally brought together once again—the former elite and the boy on the run are about to embark on an adventure that will, in time, reveal the shattering secrets of No. 6.\n[Written by MAL Rewrite]',
                    coverImageTopOffset: 150,
                    titles: {
                        en: 'No. 6',
                        en_jp: 'No.6',
                        en_us: 'No. 6',
                        ja_jp: 'NO.6［ナンバー・シックス］',
                    },
                    canonicalTitle: 'No.6',
                    abbreviatedTitles: ['Number Six', 'Number 6', 'No. Six'],
                    averageRating: '75.29',
                    ratingFrequencies: {
                        2: '116',
                        3: '1',
                        4: '119',
                        5: '3',
                        6: '157',
                        7: '4',
                        8: '579',
                        9: '17',
                        10: '727',
                        11: '30',
                        12: '1521',
                        13: '75',
                        14: '2715',
                        15: '96',
                        16: '2223',
                        17: '78',
                        18: '1534',
                        19: '48',
                        20: '2512',
                    },
                    userCount: 23058,
                    favoritesCount: 511,
                    startDate: '2011-07-08',
                    endDate: '2011-09-16',
                    nextRelease: null,
                    popularityRank: 474,
                    ratingRank: 1766,
                    ageRating: 'R',
                    ageRatingGuide: '17+ (violence & profanity)',
                    subtype: 'TV',
                    status: 'finished',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/6059/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/6059/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/6059/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/6059/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/6059/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: {
                        tiny: 'https://media.kitsu.io/anime/cover_images/6059/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/cover_images/6059/large.jpg',
                        small: 'https://media.kitsu.io/anime/cover_images/6059/small.jpg',
                        original:
                            'https://media.kitsu.io/anime/cover_images/6059/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 840,
                                    height: 200,
                                },
                                large: {
                                    width: 3360,
                                    height: 800,
                                },
                                small: {
                                    width: 1680,
                                    height: 400,
                                },
                            },
                        },
                    },
                    episodeCount: 11,
                    episodeLength: 23,
                    totalLength: 253,
                    youtubeVideoId: 'x2ig6nNs4xU',
                    showType: 'TV',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/genres',
                        },
                        data: [
                            {
                                type: 'genres',
                                id: '1',
                            },
                            {
                                type: 'genres',
                                id: '5',
                            },
                            {
                                type: 'genres',
                                id: '7',
                            },
                            {
                                type: 'genres',
                                id: '4',
                            },
                        ],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/streaming-links',
                        },
                        data: [
                            {
                                type: 'streamingLinks',
                                id: '1003',
                            },
                            {
                                type: 'streamingLinks',
                                id: '1004',
                            },
                        ],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/6059/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/6059/anime-staff',
                        },
                    },
                },
            },
        ],
        included: [
            {
                id: '5075',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/5075',
                },
                attributes: {
                    createdAt: '2021-05-04T09:32:07.800Z',
                    updatedAt: '2021-05-04T09:32:07.800Z',
                    url: 'https://www.crunchyroll.com/en-gb/86-eighty-six',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/5075/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/5075/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/5075/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/5075/media',
                        },
                    },
                },
            },
            {
                id: '5596',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/5596',
                },
                attributes: {
                    createdAt: '2021-10-03T18:09:36.664Z',
                    updatedAt: '2021-10-03T18:09:36.664Z',
                    url: 'https://www.crunchyroll.com/en-gb/86-eighty-six',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/5596/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/5596/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/5596/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/5596/media',
                        },
                    },
                },
            },
            {
                id: '1003',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/1003',
                },
                attributes: {
                    createdAt: null,
                    updatedAt: null,
                    url: 'http://www.hulu.com/no-6',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/1003/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/1003/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/1003/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/1003/media',
                        },
                    },
                },
            },
            {
                id: '1004',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/1004',
                },
                attributes: {
                    createdAt: null,
                    updatedAt: null,
                    url: 'http://www.crunchyroll.com/no-6',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/1004/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/1004/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/1004/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/1004/media',
                        },
                    },
                },
            },
            {
                id: '1',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/1',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:15.623Z',
                    updatedAt: '2016-07-17T19:30:56.164Z',
                    name: 'Action',
                    slug: 'action',
                    description: '',
                },
            },
            {
                id: '5',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/5',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:15.701Z',
                    updatedAt: '2013-02-20T16:00:15.701Z',
                    name: 'Sci-Fi',
                    slug: 'sci-fi',
                    description: null,
                },
            },
            {
                id: '7',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/7',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:17.012Z',
                    updatedAt: '2013-02-20T16:00:17.012Z',
                    name: 'Mystery',
                    slug: 'mystery',
                    description: null,
                },
            },
            {
                id: '4',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/4',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:15.686Z',
                    updatedAt: '2016-06-10T11:23:00.431Z',
                    name: 'Drama',
                    slug: 'drama',
                    description: '',
                },
            },
        ],
        meta: {
            count: 575,
        },
        links: {
            first: 'https://kitsu.io/api/edge/anime?filter%5Btext%5D=86+EIGHTY-SIX&include=streamingLinks%2Cgenres&page%5Blimit%5D=5&page%5Boffset%5D=0',
            next: 'https://kitsu.io/api/edge/anime?filter%5Btext%5D=86+EIGHTY-SIX&include=streamingLinks%2Cgenres&page%5Blimit%5D=5&page%5Boffset%5D=5',
            last: 'https://kitsu.io/api/edge/anime?filter%5Btext%5D=86+EIGHTY-SIX&include=streamingLinks%2Cgenres&page%5Blimit%5D=5&page%5Boffset%5D=570',
        },
    },
};

const ListResults = {
    0: {
        data: [
            {
                id: '29378122',
                type: 'libraryEntries',
                links: {
                    self: 'https://kitsu.io/api/edge/library-entries/29378122',
                },
                attributes: {
                    createdAt: '2018-06-16T17:58:19.824Z',
                    updatedAt: '2022-02-16T02:20:49.880Z',
                    status: 'current',
                    progress: 1010,
                    volumesOwned: 0,
                    reconsuming: false,
                    reconsumeCount: 0,
                    notes: 'Sunday(Fansub Group:Horrible Subs)',
                    private: false,
                    reactionSkipped: 'unskipped',
                    progressedAt: '2022-02-16T02:20:49.877Z',
                    startedAt: null,
                    finishedAt: null,
                    rating: '5.0',
                    ratingTwenty: 20,
                },
                relationships: {
                    user: {
                        links: {
                            self: 'https://kitsu.io/api/edge/library-entries/29378122/relationships/user',
                            related:
                                'https://kitsu.io/api/edge/library-entries/29378122/user',
                        },
                    },
                    anime: {
                        links: {
                            self: 'https://kitsu.io/api/edge/library-entries/29378122/relationships/anime',
                            related:
                                'https://kitsu.io/api/edge/library-entries/29378122/anime',
                        },
                        data: {
                            type: 'anime',
                            id: '12',
                        },
                    },
                    manga: {
                        links: {
                            self: 'https://kitsu.io/api/edge/library-entries/29378122/relationships/manga',
                            related:
                                'https://kitsu.io/api/edge/library-entries/29378122/manga',
                        },
                    },
                    drama: {
                        links: {
                            self: 'https://kitsu.io/api/edge/library-entries/29378122/relationships/drama',
                            related:
                                'https://kitsu.io/api/edge/library-entries/29378122/drama',
                        },
                    },
                    review: {
                        links: {
                            self: 'https://kitsu.io/api/edge/library-entries/29378122/relationships/review',
                            related:
                                'https://kitsu.io/api/edge/library-entries/29378122/review',
                        },
                    },
                    mediaReaction: {
                        links: {
                            self: 'https://kitsu.io/api/edge/library-entries/29378122/relationships/media-reaction',
                            related:
                                'https://kitsu.io/api/edge/library-entries/29378122/media-reaction',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/library-entries/29378122/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/library-entries/29378122/media',
                        },
                    },
                    unit: {
                        links: {
                            self: 'https://kitsu.io/api/edge/library-entries/29378122/relationships/unit',
                            related:
                                'https://kitsu.io/api/edge/library-entries/29378122/unit',
                        },
                    },
                    nextUnit: {
                        links: {
                            self: 'https://kitsu.io/api/edge/library-entries/29378122/relationships/next-unit',
                            related:
                                'https://kitsu.io/api/edge/library-entries/29378122/next-unit',
                        },
                    },
                },
            },
        ],
        included: [
            {
                id: '12',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/12',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:25.722Z',
                    updatedAt: '2022-02-16T02:55:36.129Z',
                    slug: 'one-piece',
                    synopsis:
                        'Gol D. Roger was known as the "Pirate King," the strongest and most infamous being to have sailed the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece—which promises an unlimited amount of riches and fame—and quite possibly the pinnacle of glory and the title of the Pirate King.\nEnter Monkey D. Luffy, a 17-year-old boy who defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate ransacking villages for fun, Luffy’s reason for being a pirate is one of pure wonder: the thought of an exciting adventure that leads him to intriguing people and ultimately, the promised treasure. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach the most coveted of all fortunes—One Piece.\n[Written by MAL Rewrite]',
                    description:
                        'Gol D. Roger was known as the "Pirate King," the strongest and most infamous being to have sailed the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece—which promises an unlimited amount of riches and fame—and quite possibly the pinnacle of glory and the title of the Pirate King.\nEnter Monkey D. Luffy, a 17-year-old boy who defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate ransacking villages for fun, Luffy’s reason for being a pirate is one of pure wonder: the thought of an exciting adventure that leads him to intriguing people and ultimately, the promised treasure. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach the most coveted of all fortunes—One Piece.\n[Written by MAL Rewrite]',
                    coverImageTopOffset: 50,
                    titles: {
                        en: 'One Piece',
                        en_jp: 'One Piece',
                        ja_jp: 'ONE PIECE',
                    },
                    canonicalTitle: 'One Piece',
                    abbreviatedTitles: ['ワンピース'],
                    averageRating: '83.11',
                    ratingFrequencies: {
                        2: '7635',
                        3: '165',
                        4: '562',
                        5: '119',
                        6: '499',
                        7: '110',
                        8: '8710',
                        9: '143',
                        10: '1617',
                        11: '220',
                        12: '2729',
                        13: '281',
                        14: '19588',
                        15: '641',
                        16: '7368',
                        17: '1102',
                        18: '7826',
                        19: '1053',
                        20: '82468',
                    },
                    userCount: 186101,
                    favoritesCount: 6578,
                    startDate: '1999-10-20',
                    endDate: null,
                    nextRelease: '2022-02-20T09:30:00.000+09:00',
                    popularityRank: 14,
                    ratingRank: 33,
                    ageRating: 'PG',
                    ageRatingGuide: 'Teens 13 or older',
                    subtype: 'TV',
                    status: 'current',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/12/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/12/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/12/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/12/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/12/original.png',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: {
                        tiny: 'https://media.kitsu.io/anime/12/cover_image/tiny-cd1b0729d5c15400bfa2441ea3751e86.jpeg',
                        large: 'https://media.kitsu.io/anime/12/cover_image/large-3e72f400a87b5241780c5082f0582611.jpeg',
                        small: 'https://media.kitsu.io/anime/12/cover_image/small-8d0cbc39cac65d5d7c4db5f5b3742ae7.jpeg',
                        original:
                            'https://media.kitsu.io/anime/12/cover_image/21ecb556255bd46b95aea4779d19789f.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 840,
                                    height: 200,
                                },
                                large: {
                                    width: 3360,
                                    height: 800,
                                },
                                small: {
                                    width: 1680,
                                    height: 400,
                                },
                            },
                        },
                    },
                    episodeCount: null,
                    episodeLength: 24,
                    totalLength: 28056,
                    youtubeVideoId: 'CmTeYj2FmRc',
                    showType: 'TV',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/12/genres',
                        },
                        data: [
                            {
                                type: 'genres',
                                id: '1',
                            },
                            {
                                type: 'genres',
                                id: '2',
                            },
                            {
                                type: 'genres',
                                id: '3',
                            },
                            {
                                type: 'genres',
                                id: '11',
                            },
                            {
                                type: 'genres',
                                id: '23',
                            },
                            {
                                type: 'genres',
                                id: '4',
                            },
                            {
                                type: 'genres',
                                id: '63',
                            },
                        ],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/12/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/12/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/12/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/12/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/12/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/12/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/12/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/staff',
                            related: 'https://kitsu.io/api/edge/anime/12/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/12/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/12/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/12/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/12/streaming-links',
                        },
                        data: [
                            {
                                type: 'streamingLinks',
                                id: '3696',
                            },
                            {
                                type: 'streamingLinks',
                                id: '3697',
                            },
                            {
                                type: 'streamingLinks',
                                id: '3698',
                            },
                            {
                                type: 'streamingLinks',
                                id: '4263',
                            },
                        ],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/12/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/12/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/12/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/12/anime-staff',
                        },
                    },
                },
            },
            {
                id: '1',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/1',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:15.623Z',
                    updatedAt: '2016-07-17T19:30:56.164Z',
                    name: 'Action',
                    slug: 'action',
                    description: '',
                },
            },
            {
                id: '2',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/2',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:15.657Z',
                    updatedAt: '2017-04-22T16:11:16.077Z',
                    name: 'Adventure',
                    slug: 'adventure',
                    description: '',
                },
            },
            {
                id: '3',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/3',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:15.671Z',
                    updatedAt: '2013-02-20T16:00:15.671Z',
                    name: 'Comedy',
                    slug: 'comedy',
                    description: null,
                },
            },
            {
                id: '11',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/11',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:19.973Z',
                    updatedAt: '2016-01-10T12:27:18.443Z',
                    name: 'Fantasy',
                    slug: 'fantasy',
                    description: '',
                },
            },
            {
                id: '23',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/23',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:25.609Z',
                    updatedAt: '2013-02-20T16:00:25.609Z',
                    name: 'Super Power',
                    slug: 'super-power',
                    description: null,
                },
            },
            {
                id: '4',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/4',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:15.686Z',
                    updatedAt: '2016-06-10T11:23:00.431Z',
                    name: 'Drama',
                    slug: 'drama',
                    description: '',
                },
            },
            {
                id: '63',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/63',
                },
                attributes: {
                    createdAt: '2017-03-12T06:24:28.657Z',
                    updatedAt: '2017-03-21T15:25:24.849Z',
                    name: 'Friendship',
                    slug: 'friendship',
                    description: '',
                },
            },
            {
                id: '3696',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/3696',
                },
                attributes: {
                    createdAt: '2019-07-18T19:08:28.510Z',
                    updatedAt: '2019-07-18T19:09:33.816Z',
                    url: 'https://www.funimation.com/shows/one-piece/#videos',
                    subs: ['en'],
                    dubs: ['ja', 'en'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/3696/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/3696/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/3696/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/3696/media',
                        },
                    },
                },
            },
            {
                id: '3697',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/3697',
                },
                attributes: {
                    createdAt: '2019-07-18T19:09:27.864Z',
                    updatedAt: '2019-07-18T19:09:33.879Z',
                    url: 'https://www.crunchyroll.com/one-piece',
                    subs: ['en'],
                    dubs: ['ja', 'en'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/3697/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/3697/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/3697/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/3697/media',
                        },
                    },
                },
            },
            {
                id: '3698',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/3698',
                },
                attributes: {
                    createdAt: '2019-07-18T19:10:59.730Z',
                    updatedAt: '2019-07-18T19:11:06.778Z',
                    url: 'https://www.hulu.com/series/one-piece-c7a08df6-d0d5-4dd3-afff-d1f90133cd4e',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/3698/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/3698/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/3698/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/3698/media',
                        },
                    },
                },
            },
            {
                id: '4263',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/4263',
                },
                attributes: {
                    createdAt: '2020-04-08T22:19:26.627Z',
                    updatedAt: '2020-04-08T22:19:31.201Z',
                    url: 'https://vrv.co/series/GRMG8ZQZR/One-Piece',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/4263/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/4263/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/4263/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/4263/media',
                        },
                    },
                },
            },
        ],
        meta: {
            statusCounts: {
                current: 1,
            },
            count: 1,
        },
        links: {
            first: 'https://kitsu.io/api/edge/library-entries?filter%5BanimeId%5D=12&filter%5Bkind%5D=anime&filter%5BuserId%5D=32602&include=anime%2Canime.streamingLinks%2Canime.genres&page%5Blimit%5D=10&page%5Boffset%5D=0',
            last: 'https://kitsu.io/api/edge/library-entries?filter%5BanimeId%5D=12&filter%5Bkind%5D=anime&filter%5BuserId%5D=32602&include=anime%2Canime.streamingLinks%2Canime.genres&page%5Blimit%5D=10&page%5Boffset%5D=0',
        },
    },
    1: {
        data: [
            {
                id: '44382',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/44382',
                },
                attributes: {
                    createdAt: '2021-04-14T01:10:25.426Z',
                    updatedAt: '2022-02-16T22:43:33.502Z',
                    slug: 'sono-bisque-doll-wa-koi-wo-suru',
                    synopsis:
                        "Wakana Gojo is a high school boy who wants to become a kashirashi--a master craftsman who makes traditional Japanese Hina dolls. Though he's gung-ho about the craft, he knows nothing about the latest trends and has a hard time fitting in with his class. The popular kids--especially one girl, Marin Kitagawa--seem like they live in a completely different world. That all changes one day, when she shares an unexpected secret with him, and their completely different worlds collide\n\n(Source: Crunchyroll)",
                    description:
                        "Wakana Gojo is a high school boy who wants to become a kashirashi--a master craftsman who makes traditional Japanese Hina dolls. Though he's gung-ho about the craft, he knows nothing about the latest trends and has a hard time fitting in with his class. The popular kids--especially one girl, Marin Kitagawa--seem like they live in a completely different world. That all changes one day, when she shares an unexpected secret with him, and their completely different worlds collide\n\n(Source: Crunchyroll)",
                    coverImageTopOffset: 0,
                    titles: {
                        en: 'My Dress-Up Darling',
                        en_jp: 'Sono Bisque Doll wa Koi wo Suru',
                        ja_jp: 'その着せ替え人形〈ビスク・ドール〉は恋をする',
                    },
                    canonicalTitle: 'Sono Bisque Doll wa Koi wo Suru',
                    abbreviatedTitles: ['Sono Kisekae Ningyou wa Koi wo Suru'],
                    averageRating: '82.49',
                    ratingFrequencies: {
                        2: '42',
                        4: '2',
                        5: '0',
                        6: '7',
                        7: '2',
                        8: '53',
                        9: '1',
                        10: '4',
                        11: '4',
                        12: '23',
                        13: '3',
                        14: '166',
                        15: '24',
                        16: '126',
                        17: '48',
                        18: '107',
                        19: '21',
                        20: '485',
                    },
                    userCount: 0,
                    favoritesCount: 0,
                    startDate: '2022-01-08',
                    endDate: null,
                    nextRelease: null,
                    popularityRank: 18977,
                    ratingRank: 50,
                    ageRating: 'R',
                    ageRatingGuide: null,
                    subtype: 'TV',
                    status: 'current',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/44382/poster_image/tiny-c6eedf248b1efa3a603b82ada61acf30.jpeg',
                        large: 'https://media.kitsu.io/anime/44382/poster_image/large-278c3c9f61f2fd4213ba5529e4655eab.jpeg',
                        small: 'https://media.kitsu.io/anime/44382/poster_image/small-85545d20cafbe0885f9b3955da6eacb8.jpeg',
                        medium: 'https://media.kitsu.io/anime/44382/poster_image/medium-e711cf37fa55da2f9518bbb306bfcf36.jpeg',
                        original:
                            'https://media.kitsu.io/anime/44382/poster_image/8f280cb9c768f8299b0add4df171016c.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: {
                        tiny: 'https://media.kitsu.io/anime/44382/cover_image/tiny-b862d8cdbfa66b171f438b241ff2b2f9.jpeg',
                        large: 'https://media.kitsu.io/anime/44382/cover_image/large-47ab8eee676eb6fdb6e0e560bc8bb361.jpeg',
                        small: 'https://media.kitsu.io/anime/44382/cover_image/small-a141714c344c8335e4e11793f99d45a4.jpeg',
                        original:
                            'https://media.kitsu.io/anime/44382/cover_image/b8b6fab7117bfabb89a2726ced38b49a.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 840,
                                    height: 200,
                                },
                                large: {
                                    width: 3360,
                                    height: 800,
                                },
                                small: {
                                    width: 1680,
                                    height: 400,
                                },
                            },
                        },
                    },
                    episodeCount: 12,
                    episodeLength: 24,
                    totalLength: 0,
                    youtubeVideoId: '8oveGY6h6T8',
                    showType: 'TV',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/genres',
                        },
                        data: [],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/streaming-links',
                        },
                        data: [
                            {
                                type: 'streamingLinks',
                                id: '6002',
                            },
                            {
                                type: 'streamingLinks',
                                id: '5928',
                            },
                        ],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/44382/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/44382/anime-staff',
                        },
                    },
                },
            },
            {
                id: '1735',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/1735',
                },
                attributes: {
                    createdAt: '2013-02-20T16:27:34.331Z',
                    updatedAt: '2022-02-16T18:00:04.480Z',
                    slug: 'urusei-yatsura-movie-6-itsudatte-my-darling',
                    synopsis:
                        "Lupica, another one of the legion of space princesses that all seem to have found out about Earth in some tour book, appears and abducts Ataru! \nBut Lupica isn't after Ataru for his great looks or charming personality (because he doesn't have either). Lupica's goal is the greatest love potion in the galaxy, which she intends to use to induce her sweetheart to tie the knot. To get it, she needs the possessor of the greatest lust in the universe...\n(Source: AniDB)",
                    description:
                        "Lupica, another one of the legion of space princesses that all seem to have found out about Earth in some tour book, appears and abducts Ataru! \nBut Lupica isn't after Ataru for his great looks or charming personality (because he doesn't have either). Lupica's goal is the greatest love potion in the galaxy, which she intends to use to induce her sweetheart to tie the knot. To get it, she needs the possessor of the greatest lust in the universe...\n(Source: AniDB)",
                    coverImageTopOffset: 0,
                    titles: {
                        en: 'Urusei Yatsura Movie 6: Always My Darling',
                        en_jp: 'Urusei Yatsura Movie 6: Itsudatte My Darling',
                        en_us: 'Urusei Yatsura Movie 6: Always My Darling',
                        ja_jp: 'うる星やつら いつだって・マイ・ダーリン',
                    },
                    canonicalTitle:
                        'Urusei Yatsura Movie 6: Itsudatte My Darling',
                    abbreviatedTitles: [],
                    averageRating: '69.32',
                    ratingFrequencies: {
                        2: '2',
                        3: '0',
                        4: '2',
                        5: '0',
                        6: '6',
                        7: '0',
                        8: '16',
                        9: '0',
                        10: '34',
                        11: '1',
                        12: '48',
                        13: '0',
                        14: '69',
                        15: '1',
                        16: '29',
                        17: '0',
                        18: '11',
                        19: '0',
                        20: '30',
                    },
                    userCount: 591,
                    favoritesCount: 1,
                    startDate: '1991-08-18',
                    endDate: '1991-08-18',
                    nextRelease: null,
                    popularityRank: 5930,
                    ratingRank: 4738,
                    ageRating: 'PG',
                    ageRatingGuide: 'Teens 13 or older',
                    subtype: 'movie',
                    status: 'finished',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/1735/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/1735/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/1735/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/1735/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/1735/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: null,
                                    height: null,
                                },
                                large: {
                                    width: null,
                                    height: null,
                                },
                                small: {
                                    width: null,
                                    height: null,
                                },
                                medium: {
                                    width: null,
                                    height: null,
                                },
                            },
                        },
                    },
                    coverImage: null,
                    episodeCount: 1,
                    episodeLength: 77,
                    totalLength: 77,
                    youtubeVideoId: null,
                    showType: 'movie',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/genres',
                        },
                        data: [
                            {
                                type: 'genres',
                                id: '3',
                            },
                            {
                                type: 'genres',
                                id: '2',
                            },
                            {
                                type: 'genres',
                                id: '5',
                            },
                            {
                                type: 'genres',
                                id: '4',
                            },
                            {
                                type: 'genres',
                                id: '14',
                            },
                            {
                                type: 'genres',
                                id: '1',
                            },
                        ],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/streaming-links',
                        },
                        data: [
                            {
                                type: 'streamingLinks',
                                id: '5228',
                            },
                        ],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1735/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/1735/anime-staff',
                        },
                    },
                },
            },
            {
                id: '13600',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/13600',
                },
                attributes: {
                    createdAt: '2017-07-03T15:58:27.045Z',
                    updatedAt: '2022-02-16T22:51:57.891Z',
                    slug: 'darling-in-the-franxx',
                    synopsis:
                        'The distant future: Humanity established the mobile fort city, Plantation, upon the ruined wasteland. Within the city were pilot quarters, Mistilteinn, otherwise known as the “Birdcage.” That is where the children live... Their only mission in life was the fight. Their enemies are the mysterious giant organisms known as Kyoryu. The children operate robots known as FRANXX in order to face these still unseen enemies. Among them was a boy who was once called a child prodigy: Code number 016, Hiro. One day, a mysterious girl called Zero Two appears in front of Hiro. “I’ve found you, my Darling.”\n\n(Source: Crunchyroll)',
                    description:
                        'The distant future: Humanity established the mobile fort city, Plantation, upon the ruined wasteland. Within the city were pilot quarters, Mistilteinn, otherwise known as the “Birdcage.” That is where the children live... Their only mission in life was the fight. Their enemies are the mysterious giant organisms known as Kyoryu. The children operate robots known as FRANXX in order to face these still unseen enemies. Among them was a boy who was once called a child prodigy: Code number 016, Hiro. One day, a mysterious girl called Zero Two appears in front of Hiro. “I’ve found you, my Darling.”\n\n(Source: Crunchyroll)',
                    coverImageTopOffset: 0,
                    titles: {
                        en: 'DARLING in the FRANXX',
                        en_jp: 'Darling in the FranXX',
                        en_us: 'DARLING in the FRANXX',
                        ja_jp: 'ダーリン・イン・ザ・フランキス',
                    },
                    canonicalTitle: 'Darling in the FranXX',
                    abbreviatedTitles: [],
                    averageRating: '74.49',
                    ratingFrequencies: {
                        2: '711',
                        3: '17',
                        4: '389',
                        5: '45',
                        6: '612',
                        7: '91',
                        8: '2209',
                        9: '120',
                        10: '1739',
                        11: '223',
                        12: '2889',
                        13: '512',
                        14: '6989',
                        15: '804',
                        16: '4865',
                        17: '764',
                        18: '3132',
                        19: '379',
                        20: '8007',
                    },
                    userCount: 54570,
                    favoritesCount: 1566,
                    startDate: '2018-01-13',
                    endDate: '2018-07-07',
                    nextRelease: null,
                    popularityRank: 136,
                    ratingRank: 2085,
                    ageRating: 'PG',
                    ageRatingGuide: 'Teens 13 or older',
                    subtype: 'TV',
                    status: 'finished',
                    tba: '',
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/13600/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/13600/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/13600/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/13600/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/13600/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: {
                        tiny: 'https://media.kitsu.io/anime/cover_images/13600/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/cover_images/13600/large.jpg',
                        small: 'https://media.kitsu.io/anime/cover_images/13600/small.jpg',
                        original:
                            'https://media.kitsu.io/anime/cover_images/13600/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 840,
                                    height: 200,
                                },
                                large: {
                                    width: 3360,
                                    height: 800,
                                },
                                small: {
                                    width: 1680,
                                    height: 400,
                                },
                            },
                        },
                    },
                    episodeCount: 24,
                    episodeLength: 24,
                    totalLength: 576,
                    youtubeVideoId: 'Q4jDgDSV6Kk',
                    showType: 'TV',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/genres',
                        },
                        data: [
                            {
                                type: 'genres',
                                id: '5',
                            },
                            {
                                type: 'genres',
                                id: '30',
                            },
                            {
                                type: 'genres',
                                id: '4',
                            },
                            {
                                type: 'genres',
                                id: '14',
                            },
                            {
                                type: 'genres',
                                id: '1',
                            },
                        ],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/streaming-links',
                        },
                        data: [
                            {
                                type: 'streamingLinks',
                                id: '2236',
                            },
                            {
                                type: 'streamingLinks',
                                id: '2237',
                            },
                        ],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13600/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/13600/anime-staff',
                        },
                    },
                },
            },
            {
                id: '1486',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/1486',
                },
                attributes: {
                    createdAt: '2013-02-20T16:23:45.234Z',
                    updatedAt: '2022-02-16T18:00:04.480Z',
                    slug: 'nerima-daikon-brothers',
                    synopsis:
                        'Hideki, leader of the Nerima Daikon Brothers, has a dream to build a dome in his hometown of Nerima to hold a concert for his band. Together with his cousin, Mako (whom he has a crush on), Ichiro, and Pandaikon (a panda he found in his yard that resembles a daikon), they strive to make money any way they can, and in the process, rid the world of evil-doers and steal their money in the process. With help from a rental guy, Nabeshin, who rents them outrageous items that always seem to help them defeat the bad guys, the Nerima Daikon Brothers sing their way to victory but always manage to lose the money they stole in the end. Even under the investigation of Inspector Karakuri, they never fail to fight for justice the Nerima-Daikon way.',
                    description:
                        'Hideki, leader of the Nerima Daikon Brothers, has a dream to build a dome in his hometown of Nerima to hold a concert for his band. Together with his cousin, Mako (whom he has a crush on), Ichiro, and Pandaikon (a panda he found in his yard that resembles a daikon), they strive to make money any way they can, and in the process, rid the world of evil-doers and steal their money in the process. With help from a rental guy, Nabeshin, who rents them outrageous items that always seem to help them defeat the bad guys, the Nerima Daikon Brothers sing their way to victory but always manage to lose the money they stole in the end. Even under the investigation of Inspector Karakuri, they never fail to fight for justice the Nerima-Daikon way.',
                    coverImageTopOffset: 0,
                    titles: {
                        en: 'Nerima Daikon Brothers',
                        en_jp: 'Nerima Daikon Brothers',
                        en_us: 'Nerima Daikon Brothers',
                        ja_jp: '練馬大根ブラザーズ',
                    },
                    canonicalTitle: 'Nerima Daikon Brothers',
                    abbreviatedTitles: [
                        'Oroshitate Musical Nerima Daikon Brothers',
                        'Dress-up Musical Nerima Daikon Brothers',
                    ],
                    averageRating: '73.55',
                    ratingFrequencies: {
                        2: '2',
                        3: '0',
                        4: '3',
                        5: '0',
                        6: '5',
                        7: '0',
                        8: '11',
                        9: '1',
                        10: '23',
                        11: '0',
                        12: '61',
                        13: '1',
                        14: '92',
                        15: '1',
                        16: '74',
                        17: '0',
                        18: '30',
                        19: '1',
                        20: '50',
                    },
                    userCount: 772,
                    favoritesCount: 9,
                    startDate: '2006-01-09',
                    endDate: '2006-03-27',
                    nextRelease: null,
                    popularityRank: 5298,
                    ratingRank: 2477,
                    ageRating: 'R',
                    ageRatingGuide: 'Mild Nudity',
                    subtype: 'TV',
                    status: 'finished',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/1486/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/1486/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/1486/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/1486/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/1486/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: null,
                                    height: null,
                                },
                                large: {
                                    width: null,
                                    height: null,
                                },
                                small: {
                                    width: null,
                                    height: null,
                                },
                                medium: {
                                    width: null,
                                    height: null,
                                },
                            },
                        },
                    },
                    coverImage: null,
                    episodeCount: 12,
                    episodeLength: 24,
                    totalLength: 288,
                    youtubeVideoId: null,
                    showType: 'TV',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/genres',
                        },
                        data: [
                            {
                                type: 'genres',
                                id: '3',
                            },
                            {
                                type: 'genres',
                                id: '35',
                            },
                        ],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/streaming-links',
                        },
                        data: [],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/1486/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/1486/anime-staff',
                        },
                    },
                },
            },
            {
                id: '42713',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/42713',
                },
                attributes: {
                    createdAt: '2019-11-13T21:49:19.650Z',
                    updatedAt: '2022-02-16T18:00:04.480Z',
                    slug: 'he-nuer-de-richang',
                    synopsis:
                        "A father with lots of love is often tormented endlessly by his daughter in everyday life. But this father would often look on all the troubles created by this child with a warm and loving heart. This is the super healing and cute series about the daily life of this father and daughter, it's warm loving and interesting too.\n\n(Source: Bayi Subs)",
                    description:
                        "A father with lots of love is often tormented endlessly by his daughter in everyday life. But this father would often look on all the troubles created by this child with a warm and loving heart. This is the super healing and cute series about the daily life of this father and daughter, it's warm loving and interesting too.\n\n(Source: Bayi Subs)",
                    coverImageTopOffset: 0,
                    titles: {
                        en: 'Grow Up with my Daughter',
                        en_cn: "He Nu'er De Richang",
                        zh_cn: '和女儿的日常 第一季',
                    },
                    canonicalTitle: "He Nu'er De Richang",
                    abbreviatedTitles: [
                        'Daily Life with a Daughter',
                        'Nuer de Richang',
                        "He Nü'er De Richang",
                    ],
                    averageRating: null,
                    ratingFrequencies: {
                        12: '1',
                        14: '1',
                        16: '2',
                        18: '1',
                    },
                    userCount: 10,
                    favoritesCount: 0,
                    startDate: '2016-10-14',
                    endDate: '2016-10-14',
                    nextRelease: null,
                    popularityRank: 16770,
                    ratingRank: null,
                    ageRating: 'G',
                    ageRatingGuide: null,
                    subtype: 'ONA',
                    status: 'finished',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/42713/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/42713/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/42713/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/42713/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/42713/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: null,
                    episodeCount: 18,
                    episodeLength: 2,
                    totalLength: 36,
                    youtubeVideoId: null,
                    showType: 'ONA',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/genres',
                        },
                        data: [],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/streaming-links',
                        },
                        data: [],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/42713/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/42713/anime-staff',
                        },
                    },
                },
            },
        ],
        included: [
            {
                id: '6002',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/6002',
                },
                attributes: {
                    createdAt: '2022-01-29T16:34:04.620Z',
                    updatedAt: '2022-01-29T16:34:04.620Z',
                    url: 'https://www.funimation.com/shows/my-dress-up-darling/',
                    subs: ['en'],
                    dubs: ['ja', 'en'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/6002/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/6002/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/6002/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/6002/media',
                        },
                    },
                },
            },
            {
                id: '5928',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/5928',
                },
                attributes: {
                    createdAt: '2022-01-08T16:56:38.887Z',
                    updatedAt: '2022-01-08T16:56:38.887Z',
                    url: 'https://www.crunchyroll.com/my-dress-up-darling',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/5928/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/5928/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/5928/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/5928/media',
                        },
                    },
                },
            },
            {
                id: '5228',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/5228',
                },
                attributes: {
                    createdAt: '2021-06-12T16:12:37.576Z',
                    updatedAt: '2021-06-12T16:12:37.576Z',
                    url: 'https://beta.crunchyroll.com/series/GG5H5X7DK/Urusei-Yatsura-Movies',
                    subs: ['en'],
                    dubs: ['ja', 'en'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/5228/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/5228/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/5228/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/5228/media',
                        },
                    },
                },
            },
            {
                id: '2236',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/2236',
                },
                attributes: {
                    createdAt: '2018-01-14T02:26:08.181Z',
                    updatedAt: '2018-01-14T02:26:08.181Z',
                    url: 'https://www.hulu.com/darling-in-the-franxx',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/2236/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/2236/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/2236/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/2236/media',
                        },
                    },
                },
            },
            {
                id: '2237',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/2237',
                },
                attributes: {
                    createdAt: '2018-01-14T02:26:30.221Z',
                    updatedAt: '2018-01-14T02:26:30.221Z',
                    url: 'http://www.crunchyroll.com/darling-in-the-franxx',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/2237/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/2237/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/2237/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/2237/media',
                        },
                    },
                },
            },
            {
                id: '3',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/3',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:15.671Z',
                    updatedAt: '2013-02-20T16:00:15.671Z',
                    name: 'Comedy',
                    slug: 'comedy',
                    description: null,
                },
            },
            {
                id: '2',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/2',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:15.657Z',
                    updatedAt: '2017-04-22T16:11:16.077Z',
                    name: 'Adventure',
                    slug: 'adventure',
                    description: '',
                },
            },
            {
                id: '5',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/5',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:15.701Z',
                    updatedAt: '2013-02-20T16:00:15.701Z',
                    name: 'Sci-Fi',
                    slug: 'sci-fi',
                    description: null,
                },
            },
            {
                id: '4',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/4',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:15.686Z',
                    updatedAt: '2016-06-10T11:23:00.431Z',
                    name: 'Drama',
                    slug: 'drama',
                    description: '',
                },
            },
            {
                id: '14',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/14',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:21.971Z',
                    updatedAt: '2016-07-13T21:31:59.654Z',
                    name: 'Romance',
                    slug: 'romance',
                    description: '',
                },
            },
            {
                id: '1',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/1',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:15.623Z',
                    updatedAt: '2016-07-17T19:30:56.164Z',
                    name: 'Action',
                    slug: 'action',
                    description: '',
                },
            },
            {
                id: '30',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/30',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:34.924Z',
                    updatedAt: '2013-02-20T16:00:34.924Z',
                    name: 'Mecha',
                    slug: 'mecha',
                    description: null,
                },
            },
            {
                id: '35',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/35',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:51.053Z',
                    updatedAt: '2013-02-20T16:00:51.053Z',
                    name: 'Music',
                    slug: 'music',
                    description: null,
                },
            },
        ],
        meta: {
            count: 816,
        },
        links: {
            first: 'https://kitsu.io/api/edge/anime?filter%5Btext%5D=My+Dress-Up+Darling&include=streamingLinks%2Cgenres&page%5Blimit%5D=5&page%5Boffset%5D=0',
            next: 'https://kitsu.io/api/edge/anime?filter%5Btext%5D=My+Dress-Up+Darling&include=streamingLinks%2Cgenres&page%5Blimit%5D=5&page%5Boffset%5D=5',
            last: 'https://kitsu.io/api/edge/anime?filter%5Btext%5D=My+Dress-Up+Darling&include=streamingLinks%2Cgenres&page%5Blimit%5D=5&page%5Boffset%5D=811',
        },
    },
    2: {
        data: [
            {
                id: '29377751',
                type: 'libraryEntries',
                links: {
                    self: 'https://kitsu.io/api/edge/library-entries/29377751',
                },
                attributes: {
                    createdAt: '2018-06-16T17:57:13.105Z',
                    updatedAt: '2018-10-09T16:45:31.530Z',
                    status: 'completed',
                    progress: 25,
                    volumesOwned: 0,
                    reconsuming: false,
                    reconsumeCount: 0,
                    notes: '',
                    private: false,
                    reactionSkipped: 'unskipped',
                    progressedAt: '2018-10-09T16:45:31.529Z',
                    startedAt: '2018-05-25T00:00:00.000Z',
                    finishedAt: '2018-10-09T16:45:31.529Z',
                    rating: '4.5',
                    ratingTwenty: 18,
                },
                relationships: {
                    user: {
                        links: {
                            self: 'https://kitsu.io/api/edge/library-entries/29377751/relationships/user',
                            related:
                                'https://kitsu.io/api/edge/library-entries/29377751/user',
                        },
                    },
                    anime: {
                        links: {
                            self: 'https://kitsu.io/api/edge/library-entries/29377751/relationships/anime',
                            related:
                                'https://kitsu.io/api/edge/library-entries/29377751/anime',
                        },
                        data: {
                            type: 'anime',
                            id: '13881',
                        },
                    },
                    manga: {
                        links: {
                            self: 'https://kitsu.io/api/edge/library-entries/29377751/relationships/manga',
                            related:
                                'https://kitsu.io/api/edge/library-entries/29377751/manga',
                        },
                    },
                    drama: {
                        links: {
                            self: 'https://kitsu.io/api/edge/library-entries/29377751/relationships/drama',
                            related:
                                'https://kitsu.io/api/edge/library-entries/29377751/drama',
                        },
                    },
                    review: {
                        links: {
                            self: 'https://kitsu.io/api/edge/library-entries/29377751/relationships/review',
                            related:
                                'https://kitsu.io/api/edge/library-entries/29377751/review',
                        },
                    },
                    mediaReaction: {
                        links: {
                            self: 'https://kitsu.io/api/edge/library-entries/29377751/relationships/media-reaction',
                            related:
                                'https://kitsu.io/api/edge/library-entries/29377751/media-reaction',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/library-entries/29377751/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/library-entries/29377751/media',
                        },
                    },
                    unit: {
                        links: {
                            self: 'https://kitsu.io/api/edge/library-entries/29377751/relationships/unit',
                            related:
                                'https://kitsu.io/api/edge/library-entries/29377751/unit',
                        },
                    },
                    nextUnit: {
                        links: {
                            self: 'https://kitsu.io/api/edge/library-entries/29377751/relationships/next-unit',
                            related:
                                'https://kitsu.io/api/edge/library-entries/29377751/next-unit',
                        },
                    },
                },
            },
        ],
        included: [
            {
                id: '13881',
                type: 'anime',
                links: {
                    self: 'https://kitsu.io/api/edge/anime/13881',
                },
                attributes: {
                    createdAt: '2017-09-29T18:20:02.301Z',
                    updatedAt: '2022-02-17T00:10:46.385Z',
                    slug: 'boku-no-hero-academia-3rd-season',
                    synopsis:
                        "Summer is here, and the heroes of Class 1-A and 1-B are in for the toughest training camp of their lives! A group of seasoned pros pushes everyone's Quirks to new heights as the students face one overwhelming challenge after another. Braving the elements in this secret location becomes the least of their worries when routine training turns into a critical struggle for survival.\n\n(Source: Crunchyroll)",
                    description:
                        "Summer is here, and the heroes of Class 1-A and 1-B are in for the toughest training camp of their lives! A group of seasoned pros pushes everyone's Quirks to new heights as the students face one overwhelming challenge after another. Braving the elements in this secret location becomes the least of their worries when routine training turns into a critical struggle for survival.\n\n(Source: Crunchyroll)",
                    coverImageTopOffset: 0,
                    titles: {
                        en: 'My Hero Academia 3',
                        en_jp: 'Boku no Hero Academia 3',
                        ja_jp: '僕のヒーローアカデミア 3rdシーズン',
                    },
                    canonicalTitle: 'Boku no Hero Academia 3',
                    abbreviatedTitles: [],
                    averageRating: '84.7',
                    ratingFrequencies: {
                        2: '10788',
                        3: '320',
                        4: '798',
                        5: '191',
                        6: '809',
                        7: '210',
                        8: '13590',
                        9: '301',
                        10: '2304',
                        11: '599',
                        12: '3699',
                        13: '896',
                        14: '45347',
                        15: '2226',
                        16: '15757',
                        17: '3577',
                        18: '13625',
                        19: '1995',
                        20: '164166',
                    },
                    userCount: 282271,
                    favoritesCount: 1985,
                    startDate: '2018-04-07',
                    endDate: '2018-09-29',
                    nextRelease: null,
                    popularityRank: 7,
                    ratingRank: 14,
                    ageRating: 'PG',
                    ageRatingGuide: 'Teens 13 or older',
                    subtype: 'TV',
                    status: 'finished',
                    tba: null,
                    posterImage: {
                        tiny: 'https://media.kitsu.io/anime/poster_images/13881/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/poster_images/13881/large.jpg',
                        small: 'https://media.kitsu.io/anime/poster_images/13881/small.jpg',
                        medium: 'https://media.kitsu.io/anime/poster_images/13881/medium.jpg',
                        original:
                            'https://media.kitsu.io/anime/poster_images/13881/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 110,
                                    height: 156,
                                },
                                large: {
                                    width: 550,
                                    height: 780,
                                },
                                small: {
                                    width: 284,
                                    height: 402,
                                },
                                medium: {
                                    width: 390,
                                    height: 554,
                                },
                            },
                        },
                    },
                    coverImage: {
                        tiny: 'https://media.kitsu.io/anime/cover_images/13881/tiny.jpg',
                        large: 'https://media.kitsu.io/anime/cover_images/13881/large.jpg',
                        small: 'https://media.kitsu.io/anime/cover_images/13881/small.jpg',
                        original:
                            'https://media.kitsu.io/anime/cover_images/13881/original.jpg',
                        meta: {
                            dimensions: {
                                tiny: {
                                    width: 840,
                                    height: 200,
                                },
                                large: {
                                    width: 3360,
                                    height: 800,
                                },
                                small: {
                                    width: 1680,
                                    height: 400,
                                },
                            },
                        },
                    },
                    episodeCount: 25,
                    episodeLength: 24,
                    totalLength: 600,
                    youtubeVideoId: 'JezE6iZUWxo',
                    showType: 'TV',
                    nsfw: false,
                },
                relationships: {
                    genres: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/genres',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/genres',
                        },
                        data: [
                            {
                                type: 'genres',
                                id: '3',
                            },
                            {
                                type: 'genres',
                                id: '23',
                            },
                            {
                                type: 'genres',
                                id: '24',
                            },
                            {
                                type: 'genres',
                                id: '1',
                            },
                        ],
                    },
                    categories: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/categories',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/categories',
                        },
                    },
                    castings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/castings',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/castings',
                        },
                    },
                    installments: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/installments',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/installments',
                        },
                    },
                    mappings: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/mappings',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/mappings',
                        },
                    },
                    reviews: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/reviews',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/reviews',
                        },
                    },
                    mediaRelationships: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/media-relationships',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/media-relationships',
                        },
                    },
                    characters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/characters',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/characters',
                        },
                    },
                    staff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/staff',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/staff',
                        },
                    },
                    productions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/productions',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/productions',
                        },
                    },
                    quotes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/quotes',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/quotes',
                        },
                    },
                    episodes: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/episodes',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/episodes',
                        },
                    },
                    streamingLinks: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/streaming-links',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/streaming-links',
                        },
                        data: [
                            {
                                type: 'streamingLinks',
                                id: '2690',
                            },
                            {
                                type: 'streamingLinks',
                                id: '2691',
                            },
                        ],
                    },
                    animeProductions: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/anime-productions',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/anime-productions',
                        },
                    },
                    animeCharacters: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/anime-characters',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/anime-characters',
                        },
                    },
                    animeStaff: {
                        links: {
                            self: 'https://kitsu.io/api/edge/anime/13881/relationships/anime-staff',
                            related:
                                'https://kitsu.io/api/edge/anime/13881/anime-staff',
                        },
                    },
                },
            },
            {
                id: '3',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/3',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:15.671Z',
                    updatedAt: '2013-02-20T16:00:15.671Z',
                    name: 'Comedy',
                    slug: 'comedy',
                    description: null,
                },
            },
            {
                id: '23',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/23',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:25.609Z',
                    updatedAt: '2013-02-20T16:00:25.609Z',
                    name: 'Super Power',
                    slug: 'super-power',
                    description: null,
                },
            },
            {
                id: '24',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/24',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:27.537Z',
                    updatedAt: '2013-02-20T16:00:27.537Z',
                    name: 'School',
                    slug: 'school',
                    description: null,
                },
            },
            {
                id: '1',
                type: 'genres',
                links: {
                    self: 'https://kitsu.io/api/edge/genres/1',
                },
                attributes: {
                    createdAt: '2013-02-20T16:00:15.623Z',
                    updatedAt: '2016-07-17T19:30:56.164Z',
                    name: 'Action',
                    slug: 'action',
                    description: '',
                },
            },
            {
                id: '2690',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/2690',
                },
                attributes: {
                    createdAt: '2018-04-07T16:37:55.037Z',
                    updatedAt: '2018-04-07T16:37:55.037Z',
                    url: 'http://www.crunchyroll.com/my-hero-academia',
                    subs: ['en'],
                    dubs: ['ja'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/2690/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/2690/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/2690/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/2690/media',
                        },
                    },
                },
            },
            {
                id: '2691',
                type: 'streamingLinks',
                links: {
                    self: 'https://kitsu.io/api/edge/streaming-links/2691',
                },
                attributes: {
                    createdAt: '2018-04-07T16:38:39.499Z',
                    updatedAt: '2018-04-07T16:38:39.499Z',
                    url: 'https://www.funimation.com/shows/my-hero-academia/',
                    subs: ['en'],
                    dubs: ['en'],
                },
                relationships: {
                    streamer: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/2691/relationships/streamer',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/2691/streamer',
                        },
                    },
                    media: {
                        links: {
                            self: 'https://kitsu.io/api/edge/streaming-links/2691/relationships/media',
                            related:
                                'https://kitsu.io/api/edge/streaming-links/2691/media',
                        },
                    },
                },
            },
        ],
        meta: {
            statusCounts: {
                completed: 1,
            },
            count: 1,
        },
        links: {
            first: 'https://kitsu.io/api/edge/library-entries?filter%5BanimeId%5D=13881&filter%5Bkind%5D=anime&filter%5BuserId%5D=32602&include=anime%2Canime.streamingLinks%2Canime.genres&page%5Blimit%5D=10&page%5Boffset%5D=0',
            last: 'https://kitsu.io/api/edge/library-entries?filter%5BanimeId%5D=13881&filter%5Bkind%5D=anime&filter%5BuserId%5D=32602&include=anime%2Canime.streamingLinks%2Canime.genres&page%5Blimit%5D=10&page%5Boffset%5D=0',
        },
    },
};

const Expected = {
    0: {
        calledTimes: 2,
        animeId: '12',
    },
    1: {
        calledTimes: 2,
        animeId: '44382',
    },
    2: {
        calledTimes: 2,
        animeId: '13881',
    },
    3: {
        calledTimes: 3,
        animeId: '44398',
    },
};

export default {
    Scenarios,
    ScrapedEpisodeData,
    SeasonResults,
    SeriesResults,
    ListResults,
    Expected,
};
