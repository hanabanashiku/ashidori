import CrunchyrollService from "../Crunchyroll";
import axios from "../../__mocks__/axios";
import episode from "../../__mocks__/crunchyroll/epsiode.json";
import series from "../../__mocks__/crunchyroll/series.json";
import season from "../../__mocks__/crunchyroll/season.json";

describe("Crunchyroll service", () => {
  let service;

  beforeEach(async () => {
    service = new CrunchyrollService();
    mockAuth();
    await service.authenticate();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  function mockAuth() {
    axios.post.mockResolvedValueOnce({
      data: {
        access_token: "abc12345",
        account_id: 12345,
      },
    });
    axios.get.mockResolvedValueOnce({
      data: {
        cms: {
          key_pair_id: "keyid",
          policy: "policy",
          signature: "dfgsdlfkg",
          bucket: "MI",
        },
      },
      headers: {
        "set-cookie": "abdfgadgf",
      },
    });
  }

  it("authenticate gets a token", async () => {
    mockAuth();

    const actual = await new CrunchyrollService().authenticate();

    const expectedParams = new URLSearchParams();
    expectedParams.append("grant_type", "etp_rt_cookie");

    expect(actual).toBeTruthy();
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenLastCalledWith(
      "https://beta-api.crunchyroll.com/auth/v1/token",
      expectedParams,
      {
        withCredentials: true,
        headers: {
          authorization: "Basic bm9haWhkZXZtXzZpeWcwYThsMHE6",
        },
      }
    );
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenLastCalledWith(
      "https://beta-api.crunchyroll.com/index/v2",
      {
        headers: {
          authorization: "Bearer abc12345",
          accept: "application/json, text/plain, */*",
        },
      }
    );
  });

  it("returns episode data for episode", async () => {
    axios.get
      .mockRejectedValue({
        response: {
          status: 404,
        },
      })
      .mockResolvedValueOnce({
        data: episode,
      })
      .mockResolvedValueOnce({
        data: series,
      })
      .mockResolvedValueOnce({
        data: season,
      });

    const actual = await service.getEpisodeData("GX9UQK711");
    expect(axios.get).toHaveBeenCalledTimes(3);
    expect(actual.id).toBe("GX9UQK711");
    expect(actual.title).toBe("The High, Deep Blue Sky");
    expect(actual.description).toBe(
      "Both sides prepare for the confrontation between the heroes and the Paranormal Liberation Front as Class 1-A finishes their first year of high school."
    );
    expect(actual.number).toBe(113);
    expect(actual.duration).toBe(23);
    expect(actual.airDate).toStrictEqual(new Date("2021-09-25T17:30:00+09:00"));
    expect(actual.season.id).toBe("GR2PCVZEW");
    expect(actual.season.name).toBe("My Hero Academia Season 5");
    expect(actual.season.number).toBe(5);
    expect(actual.season.isAiring).toBe(false);
    expect(actual.series.id).toBe("G6NQ5DWZ6");
    expect(actual.series.title).toBe("My Hero Academia");
    expect(actual.series.description).toBe(
      "Izuku has dreamt of being a hero all his life—a lofty goal for anyone, but especially challenging for a kid with no superpowers. That’s right, in a world where eighty percent of the population has some kind of super-powered “quirk,” Izuku was unlucky enough to be born completely normal. But that’s not enough to stop him from enrolling in one of the world’s most prestigious hero academies."
    );
    expect(actual.series.episodeCount).toBe(116);
    expect(actual.series.genres).toStrictEqual([
      "my hero academia",
      "boku no hero academia",
      "action",
      "fantasy",
      "shonen",
    ]);
  });
});
