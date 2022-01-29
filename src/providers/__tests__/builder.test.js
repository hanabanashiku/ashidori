import { getApiInstance } from "../builder";
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

  it("getApiInstance returns null by default", async () => {
    expect(await getApiInstance()).toBeNull();
  });

  it("getApiInstance returns Kitsu provider for kitsu", async () => {
    browser.storage.local.set({
      selected_provider: PROVIDERS.KITSU,
    });
    expect(await getApiInstance()).toBeInstanceOf(KitsuProvider);
  });

  it("getApiInstance does not call constructor twice", async () => {
    browser.storage.local.set({
      selected_provider: PROVIDERS.KITSU,
    });

    const instance = await getApiInstance();

    expect(await getApiInstance()).toStrictEqual(instance);
  });
});
