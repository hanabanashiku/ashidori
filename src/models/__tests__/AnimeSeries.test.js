import { ANIME_STATUS, PROVIDERS } from "../../enums";
import AnimeSeries from "../AnimeSeries";

// mock data
import kitsu_anime from "../../__mocks__/kitsu/anime.json";

describe("Anime series model", () => {
  it("loads default values from constructor", () => {
    const actual = new AnimeSeries();

    expect(actual.id).toBe(0);
    expect(actual.title).toBe("");
    expect(actual.englishTitle).toBe("");
    expect(actual.description).toBe("");
    expect(actual.coverImageUrl).toBe("data:,");
    expect(actual.startDate).toBeNull();
    expect(actual.endDate).toBeNull();
    expect(actual.startSeason).toBe("");
    expect(actual.status).toBe(ANIME_STATUS.ANNOUNCED),
      expect(actual.episodeCount).toBe(0);
    expect(actual.episodeLength).toBe(0);
    expect(actual.seasonCount).toBe(0);
    expect(actual.genres).toStrictEqual([]);
    expect(actual.streamingLinks).toStrictEqual({}),
      expect(actual.externalLink).toBe("about:blank");
  });

  it("loads data from Kitsu", () => {
    const data = {
      ...kitsu_anime.data,
      included: kitsu_anime.included,
      provider: PROVIDERS.KITSU,
    };
    const actual = new AnimeSeries(data);

    expect(actual.id).toBe("12");
    expect(actual.title).toBe("One Piece");
    expect(actual.englishTitle).toBe("One Piece");
    expect(actual.description).toBe(kitsu_anime.data.attributes.description);
    expect(actual.coverImageUrl).toBe(
      kitsu_anime.data.attributes.posterImage.tiny
    );
    expect(actual.startDate).toStrictEqual(
      new Date(kitsu_anime.data.attributes.startDate)
    );
    expect(actual.endDate).toBeNull();
    expect(actual.status).toBe(ANIME_STATUS.AIRING);
    expect(actual.episodeCount).toBeNull();
    expect(actual.episodeLength).toBe(24);
    expect(actual.genres).toStrictEqual([
      "Action",
      "Adventure",
      "Comedy",
      "Fantasy",
      "Super Power",
      "Drama",
      "Friendship",
    ]);
    expect(actual.externalLink).toBe("https://kitsu.io/anime/12");
    expect(actual.streamingLinks).toStrictEqual({
      0: "https://www.crunchyroll.com/one-piece",
      1: "https://www.funimation.com/shows/one-piece/#videos",
      2: "https://www.hulu.com/series/one-piece-c7a08df6-d0d5-4dd3-afff-d1f90133cd4e",
      3: "https://netflix.com/one-piece",
      4: "https://amazon.com/one-piece",
      5: "https://hidive.com/one-piece",
      6: "https://tubitv.com/one-piece",
      7: "https://vrv.co/series/GRMG8ZQZR/One-Piece",
    });
  });

  describe("start season property", () => {
    it("returns empty string by default", () => {
      const actual = new AnimeSeries();
      expect(actual.startSeason).toBe("");
    });

    it("returns winter for winter season", () => {
      let actual = new AnimeSeries({ _startDate: new Date(2022, 0, 1) });
      expect(actual.startSeason).toBe("Winter 2022");
      actual = new AnimeSeries({ _startDate: new Date(2021, 2, 1) });
      expect(actual.startSeason).toBe("Winter 2021");
    });

    it("returns spring for spring season", () => {
      let actual = new AnimeSeries({ _startDate: new Date(2020, 3, 1) });
      expect(actual.startSeason).toBe("Spring 2020");
      actual = new AnimeSeries({ _startDate: new Date(2019, 5, 1) });
      expect(actual.startSeason).toBe("Spring 2019");
    });

    it("returns summer for summer season", () => {
      let actual = new AnimeSeries({ _startDate: new Date(2018, 6, 1) });
      expect(actual.startSeason).toBe("Summer 2018");
      actual = new AnimeSeries({ _startDate: new Date(2017, 8, 1) });
      expect(actual.startSeason).toBe("Summer 2017");
    });

    it("returns fall for fall season", () => {
      let actual = new AnimeSeries({ _startDate: new Date(2016, 9, 1) });
      expect(actual.startSeason).toBe("Fall 2016");
      actual = new AnimeSeries({ _startDate: new Date(2015, 11, 1) });
      expect(actual.startSeason).toBe("Fall 2015");
    });
  });
});
