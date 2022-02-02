import LibraryEntry from "../../../../models/LibraryEntry";
import AnimeSeries from "../../../../models/AnimeSeries";
import { LIST_STATUS, ANIME_STATUS } from "enums";

export default new LibraryEntry({
  _id: "12345",
  _status: LIST_STATUS.CURRENT,
  _progress: 1008,
  _notes: "note",
  _startDate: new Date("Jan 30, 2022"),
  _rating: 8,
  _anime: new AnimeSeries({
    _id: "12",
    _title: "ONE PIECE",
    _description:
      'Gol D. Roger was known as the "Pirate King," the strongest and most infamous being to have sailed the Grand Line.',
    _startDate: new Date("Oct 20 1999"),
    _status: ANIME_STATUS.AIRING,
    _episodeCount: 1008,
    _episodeLength: 24,
    _genres: ["Adventure", "Drama", "Piracy"],
    _streamingLinks: {
      0: "https://www.crunchyroll.com/one-piece",
      1: "https://www.funimation.com/shows/one-piece/#videos",
      2: "https://www.hulu.com/series/one-piece-c7a08df6-d0d5-4dd3-afff-d1f90133cd4e",
      3: "https://netflix.com/one-piece",
      4: "https://amazon.com/one-piece",
      5: "https://hidive.com/one-piece",
      6: "https://tubitv.com/one-piece",
      7: "https://vrv.co/series/GRMG8ZQZR/One-Piece",
    },
    _link: "https://kitsu.io/anime/12",
  }),
});
