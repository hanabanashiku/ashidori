import AnimeEpisode from "../AnimeEpisode";
import AnimeSeason from "../AnimeSeason";
import AnimeSeries from "../AnimeSeries";
import { SERVICES } from "../../enums";

// mock data
import crunchyroll_episode from "../../__mocks__/crunchyroll/epsiode.json";
import crunchyroll_season from "../../__mocks__/crunchyroll/season.json";
import crunchyroll_series from "../../__mocks__/crunchyroll/series.json";

describe("Anime episode model", () => {
  it("has default values by default", () => {
    const actual = new AnimeEpisode();

    expect(actual.id).toBe("");
    expect(actual.title).toBe("");
    expect(actual.description).toBe("");
    expect(actual.number).toBe(0);
    expect(actual.duration).toBe(0);
    expect(actual.season).toStrictEqual(new AnimeSeason());
    expect(actual.series).toStrictEqual(new AnimeSeries());
    expect(actual.airDate).toBeNull();
  });

  it("maps data from Crunchyroll", () => {
    const actual = new AnimeEpisode({
      ...crunchyroll_episode,
      season: new AnimeSeason({
        ...crunchyroll_season,
        service: SERVICES.CRUNCHYROLL,
      }),
      series: new AnimeSeries({
        ...crunchyroll_series,
        service: SERVICES.CRUNCHYROLL,
      }),
      service: SERVICES.CRUNCHYROLL,
    });

    expect(actual.id).toBe("GX9UQK711");
    expect(actual.title).toBe("The High, Deep Blue Sky");
    expect(actual.description).toBe(
      "Both sides prepare for the confrontation between the heroes and the Paranormal Liberation Front as Class 1-A finishes their first year of high school."
    );
    expect(actual.number).toBe(113);
    expect(actual.airDate).toStrictEqual(new Date("2021-09-25T17:30:00+09:00"));
    expect(actual.season.id).toBe("GR2PCVZEW");
    expect(actual.series.id).toBe("G6NQ5DWZ6");
  });
});
