import { getApiInstance, resetApiInstance } from "../builder";
import KitsuProvider from "../KitsuProvider";
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

    it("does not call constructor twice", async () => {
      browser.storage.local.set({
        selected_provider: PROVIDERS.KITSU,
      });

      const instance = await getApiInstance();

      expect(await getApiInstance()).toStrictEqual(instance);
    });
  });

  it("reset resets the instance", async () => {
    const instance = await getApiInstance();
    resetApiInstance();
    expect(await getApiInstance()).not.toBe(instance);
  });
});
