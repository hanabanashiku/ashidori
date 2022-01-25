import UserData from "../UserData";
import { PROVIDERS } from "../../enums";

// mock data
import kitsu_user from "../../__mocks__/kitsu/user.json";

describe("User data model", () => {
  it("loads default values from constructor", () => {
    const actual = new UserData();

    expect(actual.id).toBe(0);
    expect(actual.username).toBe("");
    expect(actual.url).toBe("");
    expect(actual.avatarUrl).toBe("");
    expect(actual.apiSource).toBeNull();
  });

  it("loads values provided from local storage", () => {
    const data = {
      _id: 5,
      _name: "testAccount",
      _url: "https://kitsu.io/users/test",
      _avatarUrl: "about:blank",
      _provider: 1,
    };
    const actual = new UserData(data);

    expect(actual.id).toBe(5);
    expect(actual.username).toBe("testAccount");
    expect(actual.url).toBe("https://kitsu.io/users/test");
    expect(actual.avatarUrl).toBe("about:blank");
    expect(actual.apiSource).toBe(1);
  });

  it("loads values from kitsu", () => {
    const actual = new UserData({
      ...kitsu_user,
      provider: PROVIDERS.KITSU,
    });

    expect(actual.id).toBe("30000");
    expect(actual.username).toBe("TestAccount");
    expect(actual.url).toBe("https://kitsu.io/users/testaccount");
    expect(actual.avatarUrl).toBe(
      "https://media.kitsu.io/users/avatars/30000/small.jpeg"
    );
    expect(actual.apiSource).toBe(PROVIDERS.KITSU);
  });
});
