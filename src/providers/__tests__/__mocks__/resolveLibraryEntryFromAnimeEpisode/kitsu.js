import { ANIME_STATUS } from "../../../../enums";
import AnimeEpisode from "../../../../models/AnimeEpisode";
import AnimeSeason from "../../../../models/AnimeSeason";
import AnimeSeries from "../../../../models/AnimeSeries";

const Scenarios = {
  "resolves for long running series compiled to one season": 0,
};

const ScrapedEpisodeData = {
  0: new AnimeEpisode({
    _id: "GEVUZGGGQ",
    _title: "Eliminate the Ice Oni! Chopper's Fire Trick!",
    _description: "",
    _number: 1010,
    _duration: 24,
    _season: new AnimeSeason({
      _id: "12345",
      _name: "One Piece: WANO KUNI (892-Current)",
      _number: 13,
      _isAiring: true,
    }),
    _series: new AnimeSeries({
      _id: "GRMG8ZQZR",
      _title: "One Piece",
      _englishTitle: "One Piece",
      _description:
        "Monkey. D. Luffy refuses to let anyone or anything stand in the way of his quest to become the king of all pirates. With a course charted for the treacherous waters of the Grand Line and beyond, this is one captain who'll never give up until he's claimed the greatest treasure on Earth: the Legendary One Piece!",
      _status: ANIME_STATUS.AIRING,
      _episodeCount: 0,
      _episodeLength: 24,
      _genres: ["Action", "Adventure", "Fantasy", "Shonen"],
      _streamingLinks: {
        0: "https://beta.crunchyroll.com/series/GRMG8ZQZR/one-piece",
      },
    }),
    _airDate: null,
  }),
};

const SeasonResults = {
  0: {
    data: [
      {
        id: "12",
        type: "anime",
        links: {
          self: "https://kitsu.io/api/edge/anime/12",
        },
        attributes: {
          createdAt: "2013-02-20T16:00:25.722Z",
          updatedAt: "2022-02-16T02:13:25.768Z",
          slug: "one-piece",
          synopsis:
            'Gol D. Roger was known as the "Pirate King," the strongest and most infamous being to have sailed the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece—which promises an unlimited amount of riches and fame—and quite possibly the pinnacle of glory and the title of the Pirate King.\nEnter Monkey D. Luffy, a 17-year-old boy who defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate ransacking villages for fun, Luffy’s reason for being a pirate is one of pure wonder: the thought of an exciting adventure that leads him to intriguing people and ultimately, the promised treasure. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach the most coveted of all fortunes—One Piece.\n[Written by MAL Rewrite]',
          description:
            'Gol D. Roger was known as the "Pirate King," the strongest and most infamous being to have sailed the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece—which promises an unlimited amount of riches and fame—and quite possibly the pinnacle of glory and the title of the Pirate King.\nEnter Monkey D. Luffy, a 17-year-old boy who defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate ransacking villages for fun, Luffy’s reason for being a pirate is one of pure wonder: the thought of an exciting adventure that leads him to intriguing people and ultimately, the promised treasure. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach the most coveted of all fortunes—One Piece.\n[Written by MAL Rewrite]',
          coverImageTopOffset: 50,
          titles: {
            en: "One Piece",
            en_jp: "One Piece",
            ja_jp: "ONE PIECE",
          },
          canonicalTitle: "One Piece",
          abbreviatedTitles: ["ワンピース"],
          averageRating: "83.11",
          ratingFrequencies: {
            2: "7635",
            3: "165",
            4: "562",
            5: "119",
            6: "499",
            7: "110",
            8: "8710",
            9: "143",
            10: "1617",
            11: "220",
            12: "2729",
            13: "281",
            14: "19588",
            15: "641",
            16: "7368",
            17: "1102",
            18: "7826",
            19: "1053",
            20: "82467",
          },
          userCount: 186101,
          favoritesCount: 6578,
          startDate: "1999-10-20",
          endDate: null,
          nextRelease: "2022-02-20T09:30:00.000+09:00",
          popularityRank: 14,
          ratingRank: 33,
          ageRating: "PG",
          ageRatingGuide: "Teens 13 or older",
          subtype: "TV",
          status: "current",
          tba: null,
          posterImage: {
            tiny: "https://media.kitsu.io/anime/poster_images/12/tiny.jpg",
            large: "https://media.kitsu.io/anime/poster_images/12/large.jpg",
            small: "https://media.kitsu.io/anime/poster_images/12/small.jpg",
            medium: "https://media.kitsu.io/anime/poster_images/12/medium.jpg",
            original:
              "https://media.kitsu.io/anime/poster_images/12/original.png",
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
            tiny: "https://media.kitsu.io/anime/12/cover_image/tiny-cd1b0729d5c15400bfa2441ea3751e86.jpeg",
            large:
              "https://media.kitsu.io/anime/12/cover_image/large-3e72f400a87b5241780c5082f0582611.jpeg",
            small:
              "https://media.kitsu.io/anime/12/cover_image/small-8d0cbc39cac65d5d7c4db5f5b3742ae7.jpeg",
            original:
              "https://media.kitsu.io/anime/12/cover_image/21ecb556255bd46b95aea4779d19789f.jpg",
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
          youtubeVideoId: "CmTeYj2FmRc",
          showType: "TV",
          nsfw: false,
        },
        relationships: {
          genres: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/genres",
              related: "https://kitsu.io/api/edge/anime/12/genres",
            },
          },
          categories: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/categories",
              related: "https://kitsu.io/api/edge/anime/12/categories",
            },
          },
          castings: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/castings",
              related: "https://kitsu.io/api/edge/anime/12/castings",
            },
          },
          installments: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/installments",
              related: "https://kitsu.io/api/edge/anime/12/installments",
            },
          },
          mappings: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/mappings",
              related: "https://kitsu.io/api/edge/anime/12/mappings",
            },
          },
          reviews: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/reviews",
              related: "https://kitsu.io/api/edge/anime/12/reviews",
            },
          },
          mediaRelationships: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/media-relationships",
              related: "https://kitsu.io/api/edge/anime/12/media-relationships",
            },
          },
          characters: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/characters",
              related: "https://kitsu.io/api/edge/anime/12/characters",
            },
          },
          staff: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/staff",
              related: "https://kitsu.io/api/edge/anime/12/staff",
            },
          },
          productions: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/productions",
              related: "https://kitsu.io/api/edge/anime/12/productions",
            },
          },
          quotes: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/quotes",
              related: "https://kitsu.io/api/edge/anime/12/quotes",
            },
          },
          episodes: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/episodes",
              related: "https://kitsu.io/api/edge/anime/12/episodes",
            },
          },
          streamingLinks: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/streaming-links",
              related: "https://kitsu.io/api/edge/anime/12/streaming-links",
            },
          },
          animeProductions: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/anime-productions",
              related: "https://kitsu.io/api/edge/anime/12/anime-productions",
            },
          },
          animeCharacters: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/anime-characters",
              related: "https://kitsu.io/api/edge/anime/12/anime-characters",
            },
          },
          animeStaff: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/anime-staff",
              related: "https://kitsu.io/api/edge/anime/12/anime-staff",
            },
          },
        },
      },
      {
        id: "421",
        type: "anime",
        links: {
          self: "https://kitsu.io/api/edge/anime/421",
        },
        attributes: {
          createdAt: "2013-02-20T16:06:54.084Z",
          updatedAt: "2022-02-16T00:00:08.651Z",
          slug: "one-piece-2000",
          synopsis:
            "Woonan is the legendary Great Gold Pirate, earning the nickname after accumulating about 1/3 of the gold available in the world. Even after his disappearance, the tales of his gold being stashed away in a remote island continue to persist, a juicy target that other pirates lust for.\nOne of the pirates going to great lengths to attain the treasure is El Drago. He and his crew have hunted down Woonan's former crew members one by one, and along the way, they find the map that will take them to the hidden island.\nThe map is not all they come across; they also manage to come into contact with the straw hat pirates. After a short battle, Luffy and company are robbed and separated from one another. Now they must find a way to make it to the island before El Drago does and take the legendary treasure for themselves.",
          description:
            "Woonan is the legendary Great Gold Pirate, earning the nickname after accumulating about 1/3 of the gold available in the world. Even after his disappearance, the tales of his gold being stashed away in a remote island continue to persist, a juicy target that other pirates lust for.\nOne of the pirates going to great lengths to attain the treasure is El Drago. He and his crew have hunted down Woonan's former crew members one by one, and along the way, they find the map that will take them to the hidden island.\nThe map is not all they come across; they also manage to come into contact with the straw hat pirates. After a short battle, Luffy and company are robbed and separated from one another. Now they must find a way to make it to the island before El Drago does and take the legendary treasure for themselves.",
          coverImageTopOffset: 0,
          titles: {
            en_jp: "One Piece Movie 1",
            ja_jp: "ONE PIECE",
          },
          canonicalTitle: "One Piece Movie 1",
          abbreviatedTitles: ["One Piece: The Movie"],
          averageRating: "71.07",
          ratingFrequencies: {
            2: "35",
            3: "1",
            4: "38",
            5: "0",
            6: "57",
            7: "4",
            8: "195",
            9: "5",
            10: "466",
            11: "10",
            12: "880",
            13: "32",
            14: "1422",
            15: "21",
            16: "685",
            17: "15",
            18: "243",
            19: "3",
            20: "712",
          },
          userCount: 6870,
          favoritesCount: 34,
          startDate: "2000-03-04",
          endDate: "2000-03-04",
          nextRelease: null,
          popularityRank: 1634,
          ratingRank: 3730,
          ageRating: "PG",
          ageRatingGuide: "Teens 13 or older",
          subtype: "movie",
          status: "finished",
          tba: null,
          posterImage: {
            tiny: "https://media.kitsu.io/anime/poster_images/421/tiny.jpg",
            large: "https://media.kitsu.io/anime/poster_images/421/large.jpg",
            small: "https://media.kitsu.io/anime/poster_images/421/small.jpg",
            medium: "https://media.kitsu.io/anime/poster_images/421/medium.jpg",
            original:
              "https://media.kitsu.io/anime/poster_images/421/original.jpg",
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
          youtubeVideoId: "eEApDotghec",
          showType: "movie",
          nsfw: false,
        },
        relationships: {
          genres: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/genres",
              related: "https://kitsu.io/api/edge/anime/421/genres",
            },
          },
          categories: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/categories",
              related: "https://kitsu.io/api/edge/anime/421/categories",
            },
          },
          castings: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/castings",
              related: "https://kitsu.io/api/edge/anime/421/castings",
            },
          },
          installments: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/installments",
              related: "https://kitsu.io/api/edge/anime/421/installments",
            },
          },
          mappings: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/mappings",
              related: "https://kitsu.io/api/edge/anime/421/mappings",
            },
          },
          reviews: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/reviews",
              related: "https://kitsu.io/api/edge/anime/421/reviews",
            },
          },
          mediaRelationships: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/media-relationships",
              related:
                "https://kitsu.io/api/edge/anime/421/media-relationships",
            },
          },
          characters: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/characters",
              related: "https://kitsu.io/api/edge/anime/421/characters",
            },
          },
          staff: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/staff",
              related: "https://kitsu.io/api/edge/anime/421/staff",
            },
          },
          productions: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/productions",
              related: "https://kitsu.io/api/edge/anime/421/productions",
            },
          },
          quotes: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/quotes",
              related: "https://kitsu.io/api/edge/anime/421/quotes",
            },
          },
          episodes: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/episodes",
              related: "https://kitsu.io/api/edge/anime/421/episodes",
            },
          },
          streamingLinks: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/streaming-links",
              related: "https://kitsu.io/api/edge/anime/421/streaming-links",
            },
          },
          animeProductions: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/anime-productions",
              related: "https://kitsu.io/api/edge/anime/421/anime-productions",
            },
          },
          animeCharacters: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/anime-characters",
              related: "https://kitsu.io/api/edge/anime/421/anime-characters",
            },
          },
          animeStaff: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/anime-staff",
              related: "https://kitsu.io/api/edge/anime/421/anime-staff",
            },
          },
        },
      },
      {
        id: "6827",
        type: "anime",
        links: {
          self: "https://kitsu.io/api/edge/anime/6827",
        },
        attributes: {
          createdAt: "2013-02-20T17:46:00.433Z",
          updatedAt: "2022-02-16T00:00:08.651Z",
          slug: "one-piece-film-z",
          synopsis:
            'The Straw Hat Pirates enter the rough seas of the New World in search of the hidden treasures of the Pirate King, Gol D. Roger－One Piece. On their voyage, the pirates come across a terrifying, powerful man, former Marine Admiral Z.\nZ is accused of having stolen the "Dyna Stones", weapons believed to have the power to shake up the New World. The Marine Headquarters believes Z is about to use it to end the pirate era, and with it, the lives of many innocent people. In fear of such a phenomenal event, marines start to take action against the former admiral.\nEven if it means stumbling upon marines and the navy, the Straw Hat Pirates decided to chase after Z and stop him from causing havoc. As they continue to embark on their ventures, the pirates bump into new and familiar acquaintances.',
          description:
            'The Straw Hat Pirates enter the rough seas of the New World in search of the hidden treasures of the Pirate King, Gol D. Roger－One Piece. On their voyage, the pirates come across a terrifying, powerful man, former Marine Admiral Z.\nZ is accused of having stolen the "Dyna Stones", weapons believed to have the power to shake up the New World. The Marine Headquarters believes Z is about to use it to end the pirate era, and with it, the lives of many innocent people. In fear of such a phenomenal event, marines start to take action against the former admiral.\nEven if it means stumbling upon marines and the navy, the Straw Hat Pirates decided to chase after Z and stop him from causing havoc. As they continue to embark on their ventures, the pirates bump into new and familiar acquaintances.',
          coverImageTopOffset: 0,
          titles: {
            en: "One Piece Film Z",
            en_jp: "One Piece Film: Z",
            en_us: "One Piece Film Z",
            ja_jp: "ワンピース　フィルム　﻿Ｚ",
          },
          canonicalTitle: "One Piece Film: Z",
          abbreviatedTitles: ["One Piece Movie 12"],
          averageRating: "82.06",
          ratingFrequencies: {
            2: "829",
            3: "21",
            4: "55",
            5: "6",
            6: "80",
            7: "12",
            8: "638",
            9: "9",
            10: "267",
            11: "24",
            12: "628",
            13: "73",
            14: "2713",
            15: "147",
            16: "2465",
            17: "227",
            18: "1705",
            19: "121",
            20: "8165",
          },
          userCount: 22714,
          favoritesCount: 106,
          startDate: "2012-12-15",
          endDate: "2012-12-15",
          nextRelease: null,
          popularityRank: 483,
          ratingRank: 177,
          ageRating: "PG",
          ageRatingGuide: "Teens 13 or older",
          subtype: "movie",
          status: "finished",
          tba: null,
          posterImage: {
            tiny: "https://media.kitsu.io/anime/poster_images/6827/tiny.jpg",
            large: "https://media.kitsu.io/anime/poster_images/6827/large.jpg",
            small: "https://media.kitsu.io/anime/poster_images/6827/small.jpg",
            medium:
              "https://media.kitsu.io/anime/poster_images/6827/medium.jpg",
            original:
              "https://media.kitsu.io/anime/poster_images/6827/original.jpg",
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
            tiny: "https://media.kitsu.io/anime/cover_images/6827/tiny.jpg",
            large: "https://media.kitsu.io/anime/cover_images/6827/large.jpg",
            small: "https://media.kitsu.io/anime/cover_images/6827/small.jpg",
            original:
              "https://media.kitsu.io/anime/cover_images/6827/original.jpg",
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
          youtubeVideoId: "1gGt1Mg_zSo",
          showType: "movie",
          nsfw: false,
        },
        relationships: {
          genres: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/genres",
              related: "https://kitsu.io/api/edge/anime/6827/genres",
            },
          },
          categories: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/categories",
              related: "https://kitsu.io/api/edge/anime/6827/categories",
            },
          },
          castings: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/castings",
              related: "https://kitsu.io/api/edge/anime/6827/castings",
            },
          },
          installments: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/installments",
              related: "https://kitsu.io/api/edge/anime/6827/installments",
            },
          },
          mappings: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/mappings",
              related: "https://kitsu.io/api/edge/anime/6827/mappings",
            },
          },
          reviews: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/reviews",
              related: "https://kitsu.io/api/edge/anime/6827/reviews",
            },
          },
          mediaRelationships: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/media-relationships",
              related:
                "https://kitsu.io/api/edge/anime/6827/media-relationships",
            },
          },
          characters: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/characters",
              related: "https://kitsu.io/api/edge/anime/6827/characters",
            },
          },
          staff: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/staff",
              related: "https://kitsu.io/api/edge/anime/6827/staff",
            },
          },
          productions: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/productions",
              related: "https://kitsu.io/api/edge/anime/6827/productions",
            },
          },
          quotes: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/quotes",
              related: "https://kitsu.io/api/edge/anime/6827/quotes",
            },
          },
          episodes: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/episodes",
              related: "https://kitsu.io/api/edge/anime/6827/episodes",
            },
          },
          streamingLinks: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/streaming-links",
              related: "https://kitsu.io/api/edge/anime/6827/streaming-links",
            },
          },
          animeProductions: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/anime-productions",
              related: "https://kitsu.io/api/edge/anime/6827/anime-productions",
            },
          },
          animeCharacters: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/anime-characters",
              related: "https://kitsu.io/api/edge/anime/6827/anime-characters",
            },
          },
          animeStaff: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/anime-staff",
              related: "https://kitsu.io/api/edge/anime/6827/anime-staff",
            },
          },
        },
      },
      {
        id: "11351",
        type: "anime",
        links: {
          self: "https://kitsu.io/api/edge/anime/11351",
        },
        attributes: {
          createdAt: "2015-08-29T13:45:12.287Z",
          updatedAt: "2022-02-16T00:00:08.651Z",
          slug: "one-piece-film-gold",
          synopsis:
            "The Straw Hat Pirates are taking on Gild Tesoro, one of the richest men in the world.\n(Source: IMDb)",
          description:
            "The Straw Hat Pirates are taking on Gild Tesoro, one of the richest men in the world.\n(Source: IMDb)",
          coverImageTopOffset: 250,
          titles: {
            en_jp: "One Piece Film: Gold",
            ja_jp: "ONE PIECE FILM GOLD",
          },
          canonicalTitle: "One Piece Film: Gold",
          abbreviatedTitles: ["One Piece Movie 13"],
          averageRating: "81.83",
          ratingFrequencies: {
            2: "352",
            3: "3",
            4: "16",
            5: "14",
            6: "21",
            7: "7",
            8: "252",
            9: "10",
            10: "123",
            11: "21",
            12: "314",
            13: "58",
            14: "1510",
            15: "110",
            16: "1337",
            17: "167",
            18: "704",
            19: "67",
            20: "3685",
          },
          userCount: 12645,
          favoritesCount: 37,
          startDate: "2016-07-23",
          endDate: "2016-07-23",
          nextRelease: null,
          popularityRank: 938,
          ratingRank: 278,
          ageRating: "PG",
          ageRatingGuide: "Teens 13 or older",
          subtype: "movie",
          status: "finished",
          tba: "",
          posterImage: {
            tiny: "https://media.kitsu.io/anime/poster_images/11351/tiny.jpg",
            large: "https://media.kitsu.io/anime/poster_images/11351/large.jpg",
            small: "https://media.kitsu.io/anime/poster_images/11351/small.jpg",
            medium:
              "https://media.kitsu.io/anime/poster_images/11351/medium.jpg",
            original:
              "https://media.kitsu.io/anime/poster_images/11351/original.jpg",
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
            tiny: "https://media.kitsu.io/anime/cover_images/11351/tiny.jpg",
            large: "https://media.kitsu.io/anime/cover_images/11351/large.jpg",
            small: "https://media.kitsu.io/anime/cover_images/11351/small.jpg",
            original:
              "https://media.kitsu.io/anime/cover_images/11351/original.jpg",
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
          youtubeVideoId: "BvqD6Oamf0U",
          showType: "movie",
          nsfw: false,
        },
        relationships: {
          genres: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/genres",
              related: "https://kitsu.io/api/edge/anime/11351/genres",
            },
          },
          categories: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/categories",
              related: "https://kitsu.io/api/edge/anime/11351/categories",
            },
          },
          castings: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/castings",
              related: "https://kitsu.io/api/edge/anime/11351/castings",
            },
          },
          installments: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/installments",
              related: "https://kitsu.io/api/edge/anime/11351/installments",
            },
          },
          mappings: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/mappings",
              related: "https://kitsu.io/api/edge/anime/11351/mappings",
            },
          },
          reviews: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/reviews",
              related: "https://kitsu.io/api/edge/anime/11351/reviews",
            },
          },
          mediaRelationships: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/media-relationships",
              related:
                "https://kitsu.io/api/edge/anime/11351/media-relationships",
            },
          },
          characters: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/characters",
              related: "https://kitsu.io/api/edge/anime/11351/characters",
            },
          },
          staff: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/staff",
              related: "https://kitsu.io/api/edge/anime/11351/staff",
            },
          },
          productions: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/productions",
              related: "https://kitsu.io/api/edge/anime/11351/productions",
            },
          },
          quotes: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/quotes",
              related: "https://kitsu.io/api/edge/anime/11351/quotes",
            },
          },
          episodes: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/episodes",
              related: "https://kitsu.io/api/edge/anime/11351/episodes",
            },
          },
          streamingLinks: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/streaming-links",
              related: "https://kitsu.io/api/edge/anime/11351/streaming-links",
            },
          },
          animeProductions: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/anime-productions",
              related:
                "https://kitsu.io/api/edge/anime/11351/anime-productions",
            },
          },
          animeCharacters: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/anime-characters",
              related: "https://kitsu.io/api/edge/anime/11351/anime-characters",
            },
          },
          animeStaff: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/anime-staff",
              related: "https://kitsu.io/api/edge/anime/11351/anime-staff",
            },
          },
        },
      },
      {
        id: "3492",
        type: "anime",
        links: {
          self: "https://kitsu.io/api/edge/anime/3492",
        },
        attributes: {
          createdAt: "2013-02-20T16:53:42.492Z",
          updatedAt: "2022-02-16T00:00:08.651Z",
          slug: "one-piece-strong-world",
          synopsis:
            '20 years after his escape from Impel Down, the legendary pirate Shiki "the Golden Lion" reappears causing massive upheaval to the Marines. During his long seclusion, he was able to come up with a scheme to bring the World Government to its knees. On his way to execute the plan, Shiki crosses paths with the Straw Hat Pirates and becomes so impressed with Nami\'s knowledge of meteorology that he abducts her to forcedly enlist her into his crew. Luffy and the gang end up on a strange land populated with monstrous beasts as they desperately search for Shiki and Nami.\n(Source: ANN)',
          description:
            '20 years after his escape from Impel Down, the legendary pirate Shiki "the Golden Lion" reappears causing massive upheaval to the Marines. During his long seclusion, he was able to come up with a scheme to bring the World Government to its knees. On his way to execute the plan, Shiki crosses paths with the Straw Hat Pirates and becomes so impressed with Nami\'s knowledge of meteorology that he abducts her to forcedly enlist her into his crew. Luffy and the gang end up on a strange land populated with monstrous beasts as they desperately search for Shiki and Nami.\n(Source: ANN)',
          coverImageTopOffset: 163,
          titles: {
            en: "One Piece Film Strong World",
            en_jp: "One Piece Film: Strong World",
            en_us: "One Piece Film Strong World",
            ja_jp: "ワンピース　フィルム　ストロングワールド",
          },
          canonicalTitle: "One Piece Film: Strong World",
          abbreviatedTitles: ["One Piece Movie 10"],
          averageRating: "82.09",
          ratingFrequencies: {
            2: "639",
            3: "9",
            4: "34",
            5: "2",
            6: "44",
            7: "9",
            8: "481",
            9: "9",
            10: "251",
            11: "21",
            12: "618",
            13: "31",
            14: "2247",
            15: "132",
            16: "2260",
            17: "166",
            18: "1952",
            19: "70",
            20: "6311",
          },
          userCount: 19304,
          favoritesCount: 70,
          startDate: "2009-12-12",
          endDate: "2009-12-12",
          nextRelease: null,
          popularityRank: 596,
          ratingRank: 127,
          ageRating: "PG",
          ageRatingGuide: "Teens 13 or older",
          subtype: "movie",
          status: "finished",
          tba: null,
          posterImage: {
            tiny: "https://media.kitsu.io/anime/poster_images/3492/tiny.jpg",
            large: "https://media.kitsu.io/anime/poster_images/3492/large.jpg",
            small: "https://media.kitsu.io/anime/poster_images/3492/small.jpg",
            medium:
              "https://media.kitsu.io/anime/poster_images/3492/medium.jpg",
            original:
              "https://media.kitsu.io/anime/poster_images/3492/original.png",
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
            tiny: "https://media.kitsu.io/anime/cover_images/3492/tiny.jpg",
            large: "https://media.kitsu.io/anime/cover_images/3492/large.jpg",
            small: "https://media.kitsu.io/anime/cover_images/3492/small.jpg",
            original:
              "https://media.kitsu.io/anime/cover_images/3492/original.jpg",
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
          youtubeVideoId: "3n58UPvcD7I",
          showType: "movie",
          nsfw: false,
        },
        relationships: {
          genres: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/genres",
              related: "https://kitsu.io/api/edge/anime/3492/genres",
            },
          },
          categories: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/categories",
              related: "https://kitsu.io/api/edge/anime/3492/categories",
            },
          },
          castings: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/castings",
              related: "https://kitsu.io/api/edge/anime/3492/castings",
            },
          },
          installments: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/installments",
              related: "https://kitsu.io/api/edge/anime/3492/installments",
            },
          },
          mappings: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/mappings",
              related: "https://kitsu.io/api/edge/anime/3492/mappings",
            },
          },
          reviews: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/reviews",
              related: "https://kitsu.io/api/edge/anime/3492/reviews",
            },
          },
          mediaRelationships: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/media-relationships",
              related:
                "https://kitsu.io/api/edge/anime/3492/media-relationships",
            },
          },
          characters: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/characters",
              related: "https://kitsu.io/api/edge/anime/3492/characters",
            },
          },
          staff: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/staff",
              related: "https://kitsu.io/api/edge/anime/3492/staff",
            },
          },
          productions: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/productions",
              related: "https://kitsu.io/api/edge/anime/3492/productions",
            },
          },
          quotes: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/quotes",
              related: "https://kitsu.io/api/edge/anime/3492/quotes",
            },
          },
          episodes: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/episodes",
              related: "https://kitsu.io/api/edge/anime/3492/episodes",
            },
          },
          streamingLinks: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/streaming-links",
              related: "https://kitsu.io/api/edge/anime/3492/streaming-links",
            },
          },
          animeProductions: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/anime-productions",
              related: "https://kitsu.io/api/edge/anime/3492/anime-productions",
            },
          },
          animeCharacters: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/anime-characters",
              related: "https://kitsu.io/api/edge/anime/3492/anime-characters",
            },
          },
          animeStaff: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/anime-staff",
              related: "https://kitsu.io/api/edge/anime/3492/anime-staff",
            },
          },
        },
      },
    ],
    meta: {
      count: 2440,
    },
    links: {
      first:
        "https://kitsu.io/api/edge/anime?filter%5Btext%5D=One+Piece%3A+WANO+KUNI+%28892-Current%29&page%5Blimit%5D=5&page%5Boffset%5D=0",
      next: "https://kitsu.io/api/edge/anime?filter%5Btext%5D=One+Piece%3A+WANO+KUNI+%28892-Current%29&page%5Blimit%5D=5&page%5Boffset%5D=5",
      last: "https://kitsu.io/api/edge/anime?filter%5Btext%5D=One+Piece%3A+WANO+KUNI+%28892-Current%29&page%5Blimit%5D=5&page%5Boffset%5D=2435",
    },
  },
};

const SeriesResults = {
  0: {
    data: [
      {
        id: "12",
        type: "anime",
        links: {
          self: "https://kitsu.io/api/edge/anime/12",
        },
        attributes: {
          createdAt: "2013-02-20T16:00:25.722Z",
          updatedAt: "2022-02-16T02:13:25.768Z",
          slug: "one-piece",
          synopsis:
            'Gol D. Roger was known as the "Pirate King," the strongest and most infamous being to have sailed the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece—which promises an unlimited amount of riches and fame—and quite possibly the pinnacle of glory and the title of the Pirate King.\nEnter Monkey D. Luffy, a 17-year-old boy who defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate ransacking villages for fun, Luffy’s reason for being a pirate is one of pure wonder: the thought of an exciting adventure that leads him to intriguing people and ultimately, the promised treasure. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach the most coveted of all fortunes—One Piece.\n[Written by MAL Rewrite]',
          description:
            'Gol D. Roger was known as the "Pirate King," the strongest and most infamous being to have sailed the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece—which promises an unlimited amount of riches and fame—and quite possibly the pinnacle of glory and the title of the Pirate King.\nEnter Monkey D. Luffy, a 17-year-old boy who defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate ransacking villages for fun, Luffy’s reason for being a pirate is one of pure wonder: the thought of an exciting adventure that leads him to intriguing people and ultimately, the promised treasure. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach the most coveted of all fortunes—One Piece.\n[Written by MAL Rewrite]',
          coverImageTopOffset: 50,
          titles: {
            en: "One Piece",
            en_jp: "One Piece",
            ja_jp: "ONE PIECE",
          },
          canonicalTitle: "One Piece",
          abbreviatedTitles: ["ワンピース"],
          averageRating: "83.11",
          ratingFrequencies: {
            2: "7635",
            3: "165",
            4: "562",
            5: "119",
            6: "499",
            7: "110",
            8: "8710",
            9: "143",
            10: "1617",
            11: "220",
            12: "2729",
            13: "281",
            14: "19588",
            15: "641",
            16: "7368",
            17: "1102",
            18: "7826",
            19: "1053",
            20: "82467",
          },
          userCount: 186101,
          favoritesCount: 6578,
          startDate: "1999-10-20",
          endDate: null,
          nextRelease: "2022-02-20T09:30:00.000+09:00",
          popularityRank: 14,
          ratingRank: 33,
          ageRating: "PG",
          ageRatingGuide: "Teens 13 or older",
          subtype: "TV",
          status: "current",
          tba: null,
          posterImage: {
            tiny: "https://media.kitsu.io/anime/poster_images/12/tiny.jpg",
            large: "https://media.kitsu.io/anime/poster_images/12/large.jpg",
            small: "https://media.kitsu.io/anime/poster_images/12/small.jpg",
            medium: "https://media.kitsu.io/anime/poster_images/12/medium.jpg",
            original:
              "https://media.kitsu.io/anime/poster_images/12/original.png",
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
            tiny: "https://media.kitsu.io/anime/12/cover_image/tiny-cd1b0729d5c15400bfa2441ea3751e86.jpeg",
            large:
              "https://media.kitsu.io/anime/12/cover_image/large-3e72f400a87b5241780c5082f0582611.jpeg",
            small:
              "https://media.kitsu.io/anime/12/cover_image/small-8d0cbc39cac65d5d7c4db5f5b3742ae7.jpeg",
            original:
              "https://media.kitsu.io/anime/12/cover_image/21ecb556255bd46b95aea4779d19789f.jpg",
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
          youtubeVideoId: "CmTeYj2FmRc",
          showType: "TV",
          nsfw: false,
        },
        relationships: {
          genres: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/genres",
              related: "https://kitsu.io/api/edge/anime/12/genres",
            },
          },
          categories: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/categories",
              related: "https://kitsu.io/api/edge/anime/12/categories",
            },
          },
          castings: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/castings",
              related: "https://kitsu.io/api/edge/anime/12/castings",
            },
          },
          installments: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/installments",
              related: "https://kitsu.io/api/edge/anime/12/installments",
            },
          },
          mappings: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/mappings",
              related: "https://kitsu.io/api/edge/anime/12/mappings",
            },
          },
          reviews: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/reviews",
              related: "https://kitsu.io/api/edge/anime/12/reviews",
            },
          },
          mediaRelationships: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/media-relationships",
              related: "https://kitsu.io/api/edge/anime/12/media-relationships",
            },
          },
          characters: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/characters",
              related: "https://kitsu.io/api/edge/anime/12/characters",
            },
          },
          staff: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/staff",
              related: "https://kitsu.io/api/edge/anime/12/staff",
            },
          },
          productions: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/productions",
              related: "https://kitsu.io/api/edge/anime/12/productions",
            },
          },
          quotes: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/quotes",
              related: "https://kitsu.io/api/edge/anime/12/quotes",
            },
          },
          episodes: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/episodes",
              related: "https://kitsu.io/api/edge/anime/12/episodes",
            },
          },
          streamingLinks: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/streaming-links",
              related: "https://kitsu.io/api/edge/anime/12/streaming-links",
            },
          },
          animeProductions: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/anime-productions",
              related: "https://kitsu.io/api/edge/anime/12/anime-productions",
            },
          },
          animeCharacters: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/anime-characters",
              related: "https://kitsu.io/api/edge/anime/12/anime-characters",
            },
          },
          animeStaff: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/anime-staff",
              related: "https://kitsu.io/api/edge/anime/12/anime-staff",
            },
          },
        },
      },
      {
        id: "421",
        type: "anime",
        links: {
          self: "https://kitsu.io/api/edge/anime/421",
        },
        attributes: {
          createdAt: "2013-02-20T16:06:54.084Z",
          updatedAt: "2022-02-16T00:00:08.651Z",
          slug: "one-piece-2000",
          synopsis:
            "Woonan is the legendary Great Gold Pirate, earning the nickname after accumulating about 1/3 of the gold available in the world. Even after his disappearance, the tales of his gold being stashed away in a remote island continue to persist, a juicy target that other pirates lust for.\nOne of the pirates going to great lengths to attain the treasure is El Drago. He and his crew have hunted down Woonan's former crew members one by one, and along the way, they find the map that will take them to the hidden island.\nThe map is not all they come across; they also manage to come into contact with the straw hat pirates. After a short battle, Luffy and company are robbed and separated from one another. Now they must find a way to make it to the island before El Drago does and take the legendary treasure for themselves.",
          description:
            "Woonan is the legendary Great Gold Pirate, earning the nickname after accumulating about 1/3 of the gold available in the world. Even after his disappearance, the tales of his gold being stashed away in a remote island continue to persist, a juicy target that other pirates lust for.\nOne of the pirates going to great lengths to attain the treasure is El Drago. He and his crew have hunted down Woonan's former crew members one by one, and along the way, they find the map that will take them to the hidden island.\nThe map is not all they come across; they also manage to come into contact with the straw hat pirates. After a short battle, Luffy and company are robbed and separated from one another. Now they must find a way to make it to the island before El Drago does and take the legendary treasure for themselves.",
          coverImageTopOffset: 0,
          titles: {
            en_jp: "One Piece Movie 1",
            ja_jp: "ONE PIECE",
          },
          canonicalTitle: "One Piece Movie 1",
          abbreviatedTitles: ["One Piece: The Movie"],
          averageRating: "71.07",
          ratingFrequencies: {
            2: "35",
            3: "1",
            4: "38",
            5: "0",
            6: "57",
            7: "4",
            8: "195",
            9: "5",
            10: "466",
            11: "10",
            12: "880",
            13: "32",
            14: "1422",
            15: "21",
            16: "685",
            17: "15",
            18: "243",
            19: "3",
            20: "712",
          },
          userCount: 6870,
          favoritesCount: 34,
          startDate: "2000-03-04",
          endDate: "2000-03-04",
          nextRelease: null,
          popularityRank: 1634,
          ratingRank: 3730,
          ageRating: "PG",
          ageRatingGuide: "Teens 13 or older",
          subtype: "movie",
          status: "finished",
          tba: null,
          posterImage: {
            tiny: "https://media.kitsu.io/anime/poster_images/421/tiny.jpg",
            large: "https://media.kitsu.io/anime/poster_images/421/large.jpg",
            small: "https://media.kitsu.io/anime/poster_images/421/small.jpg",
            medium: "https://media.kitsu.io/anime/poster_images/421/medium.jpg",
            original:
              "https://media.kitsu.io/anime/poster_images/421/original.jpg",
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
          youtubeVideoId: "eEApDotghec",
          showType: "movie",
          nsfw: false,
        },
        relationships: {
          genres: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/genres",
              related: "https://kitsu.io/api/edge/anime/421/genres",
            },
          },
          categories: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/categories",
              related: "https://kitsu.io/api/edge/anime/421/categories",
            },
          },
          castings: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/castings",
              related: "https://kitsu.io/api/edge/anime/421/castings",
            },
          },
          installments: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/installments",
              related: "https://kitsu.io/api/edge/anime/421/installments",
            },
          },
          mappings: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/mappings",
              related: "https://kitsu.io/api/edge/anime/421/mappings",
            },
          },
          reviews: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/reviews",
              related: "https://kitsu.io/api/edge/anime/421/reviews",
            },
          },
          mediaRelationships: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/media-relationships",
              related:
                "https://kitsu.io/api/edge/anime/421/media-relationships",
            },
          },
          characters: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/characters",
              related: "https://kitsu.io/api/edge/anime/421/characters",
            },
          },
          staff: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/staff",
              related: "https://kitsu.io/api/edge/anime/421/staff",
            },
          },
          productions: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/productions",
              related: "https://kitsu.io/api/edge/anime/421/productions",
            },
          },
          quotes: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/quotes",
              related: "https://kitsu.io/api/edge/anime/421/quotes",
            },
          },
          episodes: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/episodes",
              related: "https://kitsu.io/api/edge/anime/421/episodes",
            },
          },
          streamingLinks: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/streaming-links",
              related: "https://kitsu.io/api/edge/anime/421/streaming-links",
            },
          },
          animeProductions: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/anime-productions",
              related: "https://kitsu.io/api/edge/anime/421/anime-productions",
            },
          },
          animeCharacters: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/anime-characters",
              related: "https://kitsu.io/api/edge/anime/421/anime-characters",
            },
          },
          animeStaff: {
            links: {
              self: "https://kitsu.io/api/edge/anime/421/relationships/anime-staff",
              related: "https://kitsu.io/api/edge/anime/421/anime-staff",
            },
          },
        },
      },
      {
        id: "6827",
        type: "anime",
        links: {
          self: "https://kitsu.io/api/edge/anime/6827",
        },
        attributes: {
          createdAt: "2013-02-20T17:46:00.433Z",
          updatedAt: "2022-02-16T00:00:08.651Z",
          slug: "one-piece-film-z",
          synopsis:
            'The Straw Hat Pirates enter the rough seas of the New World in search of the hidden treasures of the Pirate King, Gol D. Roger－One Piece. On their voyage, the pirates come across a terrifying, powerful man, former Marine Admiral Z.\nZ is accused of having stolen the "Dyna Stones", weapons believed to have the power to shake up the New World. The Marine Headquarters believes Z is about to use it to end the pirate era, and with it, the lives of many innocent people. In fear of such a phenomenal event, marines start to take action against the former admiral.\nEven if it means stumbling upon marines and the navy, the Straw Hat Pirates decided to chase after Z and stop him from causing havoc. As they continue to embark on their ventures, the pirates bump into new and familiar acquaintances.',
          description:
            'The Straw Hat Pirates enter the rough seas of the New World in search of the hidden treasures of the Pirate King, Gol D. Roger－One Piece. On their voyage, the pirates come across a terrifying, powerful man, former Marine Admiral Z.\nZ is accused of having stolen the "Dyna Stones", weapons believed to have the power to shake up the New World. The Marine Headquarters believes Z is about to use it to end the pirate era, and with it, the lives of many innocent people. In fear of such a phenomenal event, marines start to take action against the former admiral.\nEven if it means stumbling upon marines and the navy, the Straw Hat Pirates decided to chase after Z and stop him from causing havoc. As they continue to embark on their ventures, the pirates bump into new and familiar acquaintances.',
          coverImageTopOffset: 0,
          titles: {
            en: "One Piece Film Z",
            en_jp: "One Piece Film: Z",
            en_us: "One Piece Film Z",
            ja_jp: "ワンピース　フィルム　﻿Ｚ",
          },
          canonicalTitle: "One Piece Film: Z",
          abbreviatedTitles: ["One Piece Movie 12"],
          averageRating: "82.06",
          ratingFrequencies: {
            2: "829",
            3: "21",
            4: "55",
            5: "6",
            6: "80",
            7: "12",
            8: "638",
            9: "9",
            10: "267",
            11: "24",
            12: "628",
            13: "73",
            14: "2713",
            15: "147",
            16: "2465",
            17: "227",
            18: "1705",
            19: "121",
            20: "8165",
          },
          userCount: 22714,
          favoritesCount: 106,
          startDate: "2012-12-15",
          endDate: "2012-12-15",
          nextRelease: null,
          popularityRank: 483,
          ratingRank: 177,
          ageRating: "PG",
          ageRatingGuide: "Teens 13 or older",
          subtype: "movie",
          status: "finished",
          tba: null,
          posterImage: {
            tiny: "https://media.kitsu.io/anime/poster_images/6827/tiny.jpg",
            large: "https://media.kitsu.io/anime/poster_images/6827/large.jpg",
            small: "https://media.kitsu.io/anime/poster_images/6827/small.jpg",
            medium:
              "https://media.kitsu.io/anime/poster_images/6827/medium.jpg",
            original:
              "https://media.kitsu.io/anime/poster_images/6827/original.jpg",
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
            tiny: "https://media.kitsu.io/anime/cover_images/6827/tiny.jpg",
            large: "https://media.kitsu.io/anime/cover_images/6827/large.jpg",
            small: "https://media.kitsu.io/anime/cover_images/6827/small.jpg",
            original:
              "https://media.kitsu.io/anime/cover_images/6827/original.jpg",
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
          youtubeVideoId: "1gGt1Mg_zSo",
          showType: "movie",
          nsfw: false,
        },
        relationships: {
          genres: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/genres",
              related: "https://kitsu.io/api/edge/anime/6827/genres",
            },
          },
          categories: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/categories",
              related: "https://kitsu.io/api/edge/anime/6827/categories",
            },
          },
          castings: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/castings",
              related: "https://kitsu.io/api/edge/anime/6827/castings",
            },
          },
          installments: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/installments",
              related: "https://kitsu.io/api/edge/anime/6827/installments",
            },
          },
          mappings: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/mappings",
              related: "https://kitsu.io/api/edge/anime/6827/mappings",
            },
          },
          reviews: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/reviews",
              related: "https://kitsu.io/api/edge/anime/6827/reviews",
            },
          },
          mediaRelationships: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/media-relationships",
              related:
                "https://kitsu.io/api/edge/anime/6827/media-relationships",
            },
          },
          characters: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/characters",
              related: "https://kitsu.io/api/edge/anime/6827/characters",
            },
          },
          staff: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/staff",
              related: "https://kitsu.io/api/edge/anime/6827/staff",
            },
          },
          productions: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/productions",
              related: "https://kitsu.io/api/edge/anime/6827/productions",
            },
          },
          quotes: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/quotes",
              related: "https://kitsu.io/api/edge/anime/6827/quotes",
            },
          },
          episodes: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/episodes",
              related: "https://kitsu.io/api/edge/anime/6827/episodes",
            },
          },
          streamingLinks: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/streaming-links",
              related: "https://kitsu.io/api/edge/anime/6827/streaming-links",
            },
          },
          animeProductions: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/anime-productions",
              related: "https://kitsu.io/api/edge/anime/6827/anime-productions",
            },
          },
          animeCharacters: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/anime-characters",
              related: "https://kitsu.io/api/edge/anime/6827/anime-characters",
            },
          },
          animeStaff: {
            links: {
              self: "https://kitsu.io/api/edge/anime/6827/relationships/anime-staff",
              related: "https://kitsu.io/api/edge/anime/6827/anime-staff",
            },
          },
        },
      },
      {
        id: "11351",
        type: "anime",
        links: {
          self: "https://kitsu.io/api/edge/anime/11351",
        },
        attributes: {
          createdAt: "2015-08-29T13:45:12.287Z",
          updatedAt: "2022-02-16T00:00:08.651Z",
          slug: "one-piece-film-gold",
          synopsis:
            "The Straw Hat Pirates are taking on Gild Tesoro, one of the richest men in the world.\n(Source: IMDb)",
          description:
            "The Straw Hat Pirates are taking on Gild Tesoro, one of the richest men in the world.\n(Source: IMDb)",
          coverImageTopOffset: 250,
          titles: {
            en_jp: "One Piece Film: Gold",
            ja_jp: "ONE PIECE FILM GOLD",
          },
          canonicalTitle: "One Piece Film: Gold",
          abbreviatedTitles: ["One Piece Movie 13"],
          averageRating: "81.83",
          ratingFrequencies: {
            2: "352",
            3: "3",
            4: "16",
            5: "14",
            6: "21",
            7: "7",
            8: "252",
            9: "10",
            10: "123",
            11: "21",
            12: "314",
            13: "58",
            14: "1510",
            15: "110",
            16: "1337",
            17: "167",
            18: "704",
            19: "67",
            20: "3685",
          },
          userCount: 12645,
          favoritesCount: 37,
          startDate: "2016-07-23",
          endDate: "2016-07-23",
          nextRelease: null,
          popularityRank: 938,
          ratingRank: 278,
          ageRating: "PG",
          ageRatingGuide: "Teens 13 or older",
          subtype: "movie",
          status: "finished",
          tba: "",
          posterImage: {
            tiny: "https://media.kitsu.io/anime/poster_images/11351/tiny.jpg",
            large: "https://media.kitsu.io/anime/poster_images/11351/large.jpg",
            small: "https://media.kitsu.io/anime/poster_images/11351/small.jpg",
            medium:
              "https://media.kitsu.io/anime/poster_images/11351/medium.jpg",
            original:
              "https://media.kitsu.io/anime/poster_images/11351/original.jpg",
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
            tiny: "https://media.kitsu.io/anime/cover_images/11351/tiny.jpg",
            large: "https://media.kitsu.io/anime/cover_images/11351/large.jpg",
            small: "https://media.kitsu.io/anime/cover_images/11351/small.jpg",
            original:
              "https://media.kitsu.io/anime/cover_images/11351/original.jpg",
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
          youtubeVideoId: "BvqD6Oamf0U",
          showType: "movie",
          nsfw: false,
        },
        relationships: {
          genres: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/genres",
              related: "https://kitsu.io/api/edge/anime/11351/genres",
            },
          },
          categories: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/categories",
              related: "https://kitsu.io/api/edge/anime/11351/categories",
            },
          },
          castings: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/castings",
              related: "https://kitsu.io/api/edge/anime/11351/castings",
            },
          },
          installments: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/installments",
              related: "https://kitsu.io/api/edge/anime/11351/installments",
            },
          },
          mappings: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/mappings",
              related: "https://kitsu.io/api/edge/anime/11351/mappings",
            },
          },
          reviews: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/reviews",
              related: "https://kitsu.io/api/edge/anime/11351/reviews",
            },
          },
          mediaRelationships: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/media-relationships",
              related:
                "https://kitsu.io/api/edge/anime/11351/media-relationships",
            },
          },
          characters: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/characters",
              related: "https://kitsu.io/api/edge/anime/11351/characters",
            },
          },
          staff: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/staff",
              related: "https://kitsu.io/api/edge/anime/11351/staff",
            },
          },
          productions: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/productions",
              related: "https://kitsu.io/api/edge/anime/11351/productions",
            },
          },
          quotes: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/quotes",
              related: "https://kitsu.io/api/edge/anime/11351/quotes",
            },
          },
          episodes: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/episodes",
              related: "https://kitsu.io/api/edge/anime/11351/episodes",
            },
          },
          streamingLinks: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/streaming-links",
              related: "https://kitsu.io/api/edge/anime/11351/streaming-links",
            },
          },
          animeProductions: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/anime-productions",
              related:
                "https://kitsu.io/api/edge/anime/11351/anime-productions",
            },
          },
          animeCharacters: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/anime-characters",
              related: "https://kitsu.io/api/edge/anime/11351/anime-characters",
            },
          },
          animeStaff: {
            links: {
              self: "https://kitsu.io/api/edge/anime/11351/relationships/anime-staff",
              related: "https://kitsu.io/api/edge/anime/11351/anime-staff",
            },
          },
        },
      },
      {
        id: "3492",
        type: "anime",
        links: {
          self: "https://kitsu.io/api/edge/anime/3492",
        },
        attributes: {
          createdAt: "2013-02-20T16:53:42.492Z",
          updatedAt: "2022-02-16T00:00:08.651Z",
          slug: "one-piece-strong-world",
          synopsis:
            '20 years after his escape from Impel Down, the legendary pirate Shiki "the Golden Lion" reappears causing massive upheaval to the Marines. During his long seclusion, he was able to come up with a scheme to bring the World Government to its knees. On his way to execute the plan, Shiki crosses paths with the Straw Hat Pirates and becomes so impressed with Nami\'s knowledge of meteorology that he abducts her to forcedly enlist her into his crew. Luffy and the gang end up on a strange land populated with monstrous beasts as they desperately search for Shiki and Nami.\n(Source: ANN)',
          description:
            '20 years after his escape from Impel Down, the legendary pirate Shiki "the Golden Lion" reappears causing massive upheaval to the Marines. During his long seclusion, he was able to come up with a scheme to bring the World Government to its knees. On his way to execute the plan, Shiki crosses paths with the Straw Hat Pirates and becomes so impressed with Nami\'s knowledge of meteorology that he abducts her to forcedly enlist her into his crew. Luffy and the gang end up on a strange land populated with monstrous beasts as they desperately search for Shiki and Nami.\n(Source: ANN)',
          coverImageTopOffset: 163,
          titles: {
            en: "One Piece Film Strong World",
            en_jp: "One Piece Film: Strong World",
            en_us: "One Piece Film Strong World",
            ja_jp: "ワンピース　フィルム　ストロングワールド",
          },
          canonicalTitle: "One Piece Film: Strong World",
          abbreviatedTitles: ["One Piece Movie 10"],
          averageRating: "82.09",
          ratingFrequencies: {
            2: "639",
            3: "9",
            4: "34",
            5: "2",
            6: "44",
            7: "9",
            8: "481",
            9: "9",
            10: "251",
            11: "21",
            12: "618",
            13: "31",
            14: "2247",
            15: "132",
            16: "2260",
            17: "166",
            18: "1952",
            19: "70",
            20: "6311",
          },
          userCount: 19304,
          favoritesCount: 70,
          startDate: "2009-12-12",
          endDate: "2009-12-12",
          nextRelease: null,
          popularityRank: 596,
          ratingRank: 127,
          ageRating: "PG",
          ageRatingGuide: "Teens 13 or older",
          subtype: "movie",
          status: "finished",
          tba: null,
          posterImage: {
            tiny: "https://media.kitsu.io/anime/poster_images/3492/tiny.jpg",
            large: "https://media.kitsu.io/anime/poster_images/3492/large.jpg",
            small: "https://media.kitsu.io/anime/poster_images/3492/small.jpg",
            medium:
              "https://media.kitsu.io/anime/poster_images/3492/medium.jpg",
            original:
              "https://media.kitsu.io/anime/poster_images/3492/original.png",
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
            tiny: "https://media.kitsu.io/anime/cover_images/3492/tiny.jpg",
            large: "https://media.kitsu.io/anime/cover_images/3492/large.jpg",
            small: "https://media.kitsu.io/anime/cover_images/3492/small.jpg",
            original:
              "https://media.kitsu.io/anime/cover_images/3492/original.jpg",
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
          youtubeVideoId: "3n58UPvcD7I",
          showType: "movie",
          nsfw: false,
        },
        relationships: {
          genres: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/genres",
              related: "https://kitsu.io/api/edge/anime/3492/genres",
            },
          },
          categories: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/categories",
              related: "https://kitsu.io/api/edge/anime/3492/categories",
            },
          },
          castings: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/castings",
              related: "https://kitsu.io/api/edge/anime/3492/castings",
            },
          },
          installments: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/installments",
              related: "https://kitsu.io/api/edge/anime/3492/installments",
            },
          },
          mappings: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/mappings",
              related: "https://kitsu.io/api/edge/anime/3492/mappings",
            },
          },
          reviews: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/reviews",
              related: "https://kitsu.io/api/edge/anime/3492/reviews",
            },
          },
          mediaRelationships: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/media-relationships",
              related:
                "https://kitsu.io/api/edge/anime/3492/media-relationships",
            },
          },
          characters: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/characters",
              related: "https://kitsu.io/api/edge/anime/3492/characters",
            },
          },
          staff: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/staff",
              related: "https://kitsu.io/api/edge/anime/3492/staff",
            },
          },
          productions: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/productions",
              related: "https://kitsu.io/api/edge/anime/3492/productions",
            },
          },
          quotes: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/quotes",
              related: "https://kitsu.io/api/edge/anime/3492/quotes",
            },
          },
          episodes: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/episodes",
              related: "https://kitsu.io/api/edge/anime/3492/episodes",
            },
          },
          streamingLinks: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/streaming-links",
              related: "https://kitsu.io/api/edge/anime/3492/streaming-links",
            },
          },
          animeProductions: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/anime-productions",
              related: "https://kitsu.io/api/edge/anime/3492/anime-productions",
            },
          },
          animeCharacters: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/anime-characters",
              related: "https://kitsu.io/api/edge/anime/3492/anime-characters",
            },
          },
          animeStaff: {
            links: {
              self: "https://kitsu.io/api/edge/anime/3492/relationships/anime-staff",
              related: "https://kitsu.io/api/edge/anime/3492/anime-staff",
            },
          },
        },
      },
    ],
    meta: {
      count: 1066,
    },
    links: {
      first:
        "https://kitsu.io/api/edge/anime?filter%5Btext%5D=One+Piece&page%5Blimit%5D=5&page%5Boffset%5D=0",
      next: "https://kitsu.io/api/edge/anime?filter%5Btext%5D=One+Piece&page%5Blimit%5D=5&page%5Boffset%5D=5",
      last: "https://kitsu.io/api/edge/anime?filter%5Btext%5D=One+Piece&page%5Blimit%5D=5&page%5Boffset%5D=1061",
    },
  },
};

const ListResults = {
  0: {
    data: [
      {
        id: "29378122",
        type: "libraryEntries",
        links: {
          self: "https://kitsu.io/api/edge/library-entries/29378122",
        },
        attributes: {
          createdAt: "2018-06-16T17:58:19.824Z",
          updatedAt: "2022-02-16T02:20:49.880Z",
          status: "current",
          progress: 1010,
          volumesOwned: 0,
          reconsuming: false,
          reconsumeCount: 0,
          notes: "Sunday(Fansub Group:Horrible Subs)",
          private: false,
          reactionSkipped: "unskipped",
          progressedAt: "2022-02-16T02:20:49.877Z",
          startedAt: null,
          finishedAt: null,
          rating: "5.0",
          ratingTwenty: 20,
        },
        relationships: {
          user: {
            links: {
              self: "https://kitsu.io/api/edge/library-entries/29378122/relationships/user",
              related:
                "https://kitsu.io/api/edge/library-entries/29378122/user",
            },
          },
          anime: {
            links: {
              self: "https://kitsu.io/api/edge/library-entries/29378122/relationships/anime",
              related:
                "https://kitsu.io/api/edge/library-entries/29378122/anime",
            },
            data: {
              type: "anime",
              id: "12",
            },
          },
          manga: {
            links: {
              self: "https://kitsu.io/api/edge/library-entries/29378122/relationships/manga",
              related:
                "https://kitsu.io/api/edge/library-entries/29378122/manga",
            },
          },
          drama: {
            links: {
              self: "https://kitsu.io/api/edge/library-entries/29378122/relationships/drama",
              related:
                "https://kitsu.io/api/edge/library-entries/29378122/drama",
            },
          },
          review: {
            links: {
              self: "https://kitsu.io/api/edge/library-entries/29378122/relationships/review",
              related:
                "https://kitsu.io/api/edge/library-entries/29378122/review",
            },
          },
          mediaReaction: {
            links: {
              self: "https://kitsu.io/api/edge/library-entries/29378122/relationships/media-reaction",
              related:
                "https://kitsu.io/api/edge/library-entries/29378122/media-reaction",
            },
          },
          media: {
            links: {
              self: "https://kitsu.io/api/edge/library-entries/29378122/relationships/media",
              related:
                "https://kitsu.io/api/edge/library-entries/29378122/media",
            },
          },
          unit: {
            links: {
              self: "https://kitsu.io/api/edge/library-entries/29378122/relationships/unit",
              related:
                "https://kitsu.io/api/edge/library-entries/29378122/unit",
            },
          },
          nextUnit: {
            links: {
              self: "https://kitsu.io/api/edge/library-entries/29378122/relationships/next-unit",
              related:
                "https://kitsu.io/api/edge/library-entries/29378122/next-unit",
            },
          },
        },
      },
    ],
    included: [
      {
        id: "12",
        type: "anime",
        links: {
          self: "https://kitsu.io/api/edge/anime/12",
        },
        attributes: {
          createdAt: "2013-02-20T16:00:25.722Z",
          updatedAt: "2022-02-16T02:55:36.129Z",
          slug: "one-piece",
          synopsis:
            'Gol D. Roger was known as the "Pirate King," the strongest and most infamous being to have sailed the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece—which promises an unlimited amount of riches and fame—and quite possibly the pinnacle of glory and the title of the Pirate King.\nEnter Monkey D. Luffy, a 17-year-old boy who defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate ransacking villages for fun, Luffy’s reason for being a pirate is one of pure wonder: the thought of an exciting adventure that leads him to intriguing people and ultimately, the promised treasure. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach the most coveted of all fortunes—One Piece.\n[Written by MAL Rewrite]',
          description:
            'Gol D. Roger was known as the "Pirate King," the strongest and most infamous being to have sailed the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece—which promises an unlimited amount of riches and fame—and quite possibly the pinnacle of glory and the title of the Pirate King.\nEnter Monkey D. Luffy, a 17-year-old boy who defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate ransacking villages for fun, Luffy’s reason for being a pirate is one of pure wonder: the thought of an exciting adventure that leads him to intriguing people and ultimately, the promised treasure. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach the most coveted of all fortunes—One Piece.\n[Written by MAL Rewrite]',
          coverImageTopOffset: 50,
          titles: {
            en: "One Piece",
            en_jp: "One Piece",
            ja_jp: "ONE PIECE",
          },
          canonicalTitle: "One Piece",
          abbreviatedTitles: ["ワンピース"],
          averageRating: "83.11",
          ratingFrequencies: {
            2: "7635",
            3: "165",
            4: "562",
            5: "119",
            6: "499",
            7: "110",
            8: "8710",
            9: "143",
            10: "1617",
            11: "220",
            12: "2729",
            13: "281",
            14: "19588",
            15: "641",
            16: "7368",
            17: "1102",
            18: "7826",
            19: "1053",
            20: "82468",
          },
          userCount: 186101,
          favoritesCount: 6578,
          startDate: "1999-10-20",
          endDate: null,
          nextRelease: "2022-02-20T09:30:00.000+09:00",
          popularityRank: 14,
          ratingRank: 33,
          ageRating: "PG",
          ageRatingGuide: "Teens 13 or older",
          subtype: "TV",
          status: "current",
          tba: null,
          posterImage: {
            tiny: "https://media.kitsu.io/anime/poster_images/12/tiny.jpg",
            large: "https://media.kitsu.io/anime/poster_images/12/large.jpg",
            small: "https://media.kitsu.io/anime/poster_images/12/small.jpg",
            medium: "https://media.kitsu.io/anime/poster_images/12/medium.jpg",
            original:
              "https://media.kitsu.io/anime/poster_images/12/original.png",
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
            tiny: "https://media.kitsu.io/anime/12/cover_image/tiny-cd1b0729d5c15400bfa2441ea3751e86.jpeg",
            large:
              "https://media.kitsu.io/anime/12/cover_image/large-3e72f400a87b5241780c5082f0582611.jpeg",
            small:
              "https://media.kitsu.io/anime/12/cover_image/small-8d0cbc39cac65d5d7c4db5f5b3742ae7.jpeg",
            original:
              "https://media.kitsu.io/anime/12/cover_image/21ecb556255bd46b95aea4779d19789f.jpg",
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
          youtubeVideoId: "CmTeYj2FmRc",
          showType: "TV",
          nsfw: false,
        },
        relationships: {
          genres: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/genres",
              related: "https://kitsu.io/api/edge/anime/12/genres",
            },
            data: [
              {
                type: "genres",
                id: "1",
              },
              {
                type: "genres",
                id: "2",
              },
              {
                type: "genres",
                id: "3",
              },
              {
                type: "genres",
                id: "11",
              },
              {
                type: "genres",
                id: "23",
              },
              {
                type: "genres",
                id: "4",
              },
              {
                type: "genres",
                id: "63",
              },
            ],
          },
          categories: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/categories",
              related: "https://kitsu.io/api/edge/anime/12/categories",
            },
          },
          castings: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/castings",
              related: "https://kitsu.io/api/edge/anime/12/castings",
            },
          },
          installments: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/installments",
              related: "https://kitsu.io/api/edge/anime/12/installments",
            },
          },
          mappings: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/mappings",
              related: "https://kitsu.io/api/edge/anime/12/mappings",
            },
          },
          reviews: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/reviews",
              related: "https://kitsu.io/api/edge/anime/12/reviews",
            },
          },
          mediaRelationships: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/media-relationships",
              related: "https://kitsu.io/api/edge/anime/12/media-relationships",
            },
          },
          characters: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/characters",
              related: "https://kitsu.io/api/edge/anime/12/characters",
            },
          },
          staff: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/staff",
              related: "https://kitsu.io/api/edge/anime/12/staff",
            },
          },
          productions: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/productions",
              related: "https://kitsu.io/api/edge/anime/12/productions",
            },
          },
          quotes: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/quotes",
              related: "https://kitsu.io/api/edge/anime/12/quotes",
            },
          },
          episodes: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/episodes",
              related: "https://kitsu.io/api/edge/anime/12/episodes",
            },
          },
          streamingLinks: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/streaming-links",
              related: "https://kitsu.io/api/edge/anime/12/streaming-links",
            },
            data: [
              {
                type: "streamingLinks",
                id: "3696",
              },
              {
                type: "streamingLinks",
                id: "3697",
              },
              {
                type: "streamingLinks",
                id: "3698",
              },
              {
                type: "streamingLinks",
                id: "4263",
              },
            ],
          },
          animeProductions: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/anime-productions",
              related: "https://kitsu.io/api/edge/anime/12/anime-productions",
            },
          },
          animeCharacters: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/anime-characters",
              related: "https://kitsu.io/api/edge/anime/12/anime-characters",
            },
          },
          animeStaff: {
            links: {
              self: "https://kitsu.io/api/edge/anime/12/relationships/anime-staff",
              related: "https://kitsu.io/api/edge/anime/12/anime-staff",
            },
          },
        },
      },
      {
        id: "1",
        type: "genres",
        links: {
          self: "https://kitsu.io/api/edge/genres/1",
        },
        attributes: {
          createdAt: "2013-02-20T16:00:15.623Z",
          updatedAt: "2016-07-17T19:30:56.164Z",
          name: "Action",
          slug: "action",
          description: "",
        },
      },
      {
        id: "2",
        type: "genres",
        links: {
          self: "https://kitsu.io/api/edge/genres/2",
        },
        attributes: {
          createdAt: "2013-02-20T16:00:15.657Z",
          updatedAt: "2017-04-22T16:11:16.077Z",
          name: "Adventure",
          slug: "adventure",
          description: "",
        },
      },
      {
        id: "3",
        type: "genres",
        links: {
          self: "https://kitsu.io/api/edge/genres/3",
        },
        attributes: {
          createdAt: "2013-02-20T16:00:15.671Z",
          updatedAt: "2013-02-20T16:00:15.671Z",
          name: "Comedy",
          slug: "comedy",
          description: null,
        },
      },
      {
        id: "11",
        type: "genres",
        links: {
          self: "https://kitsu.io/api/edge/genres/11",
        },
        attributes: {
          createdAt: "2013-02-20T16:00:19.973Z",
          updatedAt: "2016-01-10T12:27:18.443Z",
          name: "Fantasy",
          slug: "fantasy",
          description: "",
        },
      },
      {
        id: "23",
        type: "genres",
        links: {
          self: "https://kitsu.io/api/edge/genres/23",
        },
        attributes: {
          createdAt: "2013-02-20T16:00:25.609Z",
          updatedAt: "2013-02-20T16:00:25.609Z",
          name: "Super Power",
          slug: "super-power",
          description: null,
        },
      },
      {
        id: "4",
        type: "genres",
        links: {
          self: "https://kitsu.io/api/edge/genres/4",
        },
        attributes: {
          createdAt: "2013-02-20T16:00:15.686Z",
          updatedAt: "2016-06-10T11:23:00.431Z",
          name: "Drama",
          slug: "drama",
          description: "",
        },
      },
      {
        id: "63",
        type: "genres",
        links: {
          self: "https://kitsu.io/api/edge/genres/63",
        },
        attributes: {
          createdAt: "2017-03-12T06:24:28.657Z",
          updatedAt: "2017-03-21T15:25:24.849Z",
          name: "Friendship",
          slug: "friendship",
          description: "",
        },
      },
      {
        id: "3696",
        type: "streamingLinks",
        links: {
          self: "https://kitsu.io/api/edge/streaming-links/3696",
        },
        attributes: {
          createdAt: "2019-07-18T19:08:28.510Z",
          updatedAt: "2019-07-18T19:09:33.816Z",
          url: "https://www.funimation.com/shows/one-piece/#videos",
          subs: ["en"],
          dubs: ["ja", "en"],
        },
        relationships: {
          streamer: {
            links: {
              self: "https://kitsu.io/api/edge/streaming-links/3696/relationships/streamer",
              related:
                "https://kitsu.io/api/edge/streaming-links/3696/streamer",
            },
          },
          media: {
            links: {
              self: "https://kitsu.io/api/edge/streaming-links/3696/relationships/media",
              related: "https://kitsu.io/api/edge/streaming-links/3696/media",
            },
          },
        },
      },
      {
        id: "3697",
        type: "streamingLinks",
        links: {
          self: "https://kitsu.io/api/edge/streaming-links/3697",
        },
        attributes: {
          createdAt: "2019-07-18T19:09:27.864Z",
          updatedAt: "2019-07-18T19:09:33.879Z",
          url: "https://www.crunchyroll.com/one-piece",
          subs: ["en"],
          dubs: ["ja", "en"],
        },
        relationships: {
          streamer: {
            links: {
              self: "https://kitsu.io/api/edge/streaming-links/3697/relationships/streamer",
              related:
                "https://kitsu.io/api/edge/streaming-links/3697/streamer",
            },
          },
          media: {
            links: {
              self: "https://kitsu.io/api/edge/streaming-links/3697/relationships/media",
              related: "https://kitsu.io/api/edge/streaming-links/3697/media",
            },
          },
        },
      },
      {
        id: "3698",
        type: "streamingLinks",
        links: {
          self: "https://kitsu.io/api/edge/streaming-links/3698",
        },
        attributes: {
          createdAt: "2019-07-18T19:10:59.730Z",
          updatedAt: "2019-07-18T19:11:06.778Z",
          url: "https://www.hulu.com/series/one-piece-c7a08df6-d0d5-4dd3-afff-d1f90133cd4e",
          subs: ["en"],
          dubs: ["ja"],
        },
        relationships: {
          streamer: {
            links: {
              self: "https://kitsu.io/api/edge/streaming-links/3698/relationships/streamer",
              related:
                "https://kitsu.io/api/edge/streaming-links/3698/streamer",
            },
          },
          media: {
            links: {
              self: "https://kitsu.io/api/edge/streaming-links/3698/relationships/media",
              related: "https://kitsu.io/api/edge/streaming-links/3698/media",
            },
          },
        },
      },
      {
        id: "4263",
        type: "streamingLinks",
        links: {
          self: "https://kitsu.io/api/edge/streaming-links/4263",
        },
        attributes: {
          createdAt: "2020-04-08T22:19:26.627Z",
          updatedAt: "2020-04-08T22:19:31.201Z",
          url: "https://vrv.co/series/GRMG8ZQZR/One-Piece",
          subs: ["en"],
          dubs: ["ja"],
        },
        relationships: {
          streamer: {
            links: {
              self: "https://kitsu.io/api/edge/streaming-links/4263/relationships/streamer",
              related:
                "https://kitsu.io/api/edge/streaming-links/4263/streamer",
            },
          },
          media: {
            links: {
              self: "https://kitsu.io/api/edge/streaming-links/4263/relationships/media",
              related: "https://kitsu.io/api/edge/streaming-links/4263/media",
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
      first:
        "https://kitsu.io/api/edge/library-entries?filter%5BanimeId%5D=12&filter%5Bkind%5D=anime&filter%5BuserId%5D=32602&include=anime%2Canime.streamingLinks%2Canime.genres&page%5Blimit%5D=10&page%5Boffset%5D=0",
      last: "https://kitsu.io/api/edge/library-entries?filter%5BanimeId%5D=12&filter%5Bkind%5D=anime&filter%5BuserId%5D=32602&include=anime%2Canime.streamingLinks%2Canime.genres&page%5Blimit%5D=10&page%5Boffset%5D=0",
    },
  },
};

const Expected = {
  0: {
    calledTimes: 2,
    animeId: "12",
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
