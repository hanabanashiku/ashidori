import { getApiInstance, resetApiInstance } from "../builder";
import KitsuProvider from "../KitsuProvider";
import MyAnimeListProvider from "../MyAnimeListProvider";
import { PROVIDERS } from "../../enums";
import userData from "../../__mocks__/userData.json";

describe("Api instance builder", () => {
  beforeEach(() => {
    browser.storage.local.set({
      userData,
    });
  });

  afterEach(() => {
    browser.storage.local.clear();
    resetApiInstance();
  });

  describe("getApiInstance", () => {
    it("returns null by default", async () => {
      expect(await getApiInstance()).toBeNull();
    });

    it("returns Kitsu provider for kitsu", async () => {
      browser.storage.local.set({
        selected_provider: PROVIDERS.KITSU,
      });
      expect(await getApiInstance()).toBeInstanceOf(KitsuProvider);
    });

    it("returns MyAnimeList provider for MyAnimeList", async () => {
      // The browser mock refuses to set 0 so we override the mock
      browser.storage.local.get.mockResolvedValueOnce({
        selected_provider: PROVIDERS.MY_ANIME_LIST,
      });

      expect(await getApiInstance()).toBeInstanceOf(MyAnimeListProvider);
    });

    it("does not call constructor twice", async () => {
      browser.storage.local.set({
        selected_provider: PROVIDERS.KITSU,
      });

      const instance = await getApiInstance();

      expect(await getApiInstance()).toStrictEqual(instance);
    });
  });

  it("reset resets the instance", async () => {
    browser.storage.local.set({
      selected_provider: PROVIDERS.KITSU,
    });
    const instance = await getApiInstance();
    resetApiInstance();
    expect(await getApiInstance()).not.toBe(instance);
  });
});
