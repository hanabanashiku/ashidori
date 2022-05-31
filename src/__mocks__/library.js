import AnimeSeries from "../models/AnimeSeries";
import LibraryEntry from "../models/LibraryEntry";
import { LIST_STATUS, ANIME_STATUS } from "../enums";

export default [
  new LibraryEntry({
    _id: "1",
    _status: LIST_STATUS.CURRENT,
    _progress: 500,
    _notes: "note",
    _startDate: new Date("October 1 1999"),
    _completedDate: new Date("Jan 2 2022"),
    _lastUpdated: new Date("Jan 2 2022"),
    _rating: 8,
    _anime: new AnimeSeries({
      _id: "12",
      _title: "ONE PIECE",
      _description:
        'Gol D. Roger was known as the "Pirate King," the strongest and most infamous being to have sailed the Grand Line.',
      _startDate: new Date("Oct 20 1999"),
      _status: ANIME_STATUS.AIRING,
      _episodeCount: null,
      _episodeLength: 24,
      _genres: ["Adventure", "Drama", "Piracy"],
      _streamingLinks: {
        0: "https://www.crunchyroll.com/one-piece",
      },
      _link: "https://kitsu.io/anime/12",
    }),
  }),
  new LibraryEntry({
    _id: "2",
    _status: LIST_STATUS.CURRENT,
    _progress: 4,
    _notes: "note1",
    _startDate: new Date("Dec 30 2021"),
    _completedDate: new Date("Jan 2 2022"),
    _lastUpdated: new Date("Jan 1 2022"),
    _rating: 9,
    _anime: new AnimeSeries({
      _id: "13",
      _title: "SONO BISQUE DOLL WA KOI WO SURU",
      _description:
        "Wakana Gojo is a high school boy who wants to become a kashirashi--a master craftsman who makes traditional Japanese Hina dolls",
      _startDate: new Date("Jan 8 2022"),
      _status: ANIME_STATUS.AIRING,
      _episodeCount: 4,
      _episodeLength: 24,
      _genres: ["Drama", "Cosplay"],
      _streamingLinks: {
        0: "https://www.crunchyroll.com/sono-bisque",
      },
      _link: "https://kitsu.io/anime/13",
    }),
  }),
];
