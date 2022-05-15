import fs from "fs";

describe("language file", () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it("renders Japanese for Japanese browsers", () => {
    browser.i18n.getUILanguage.mockReturnValueOnce("ja");

    const lang = require("../index.js").default;
    expect(lang.title).toBe("タイトル");
  });

  it("renders English for English browsers", () => {
    browser.i18n.getUILanguage.mockReturnValueOnce("en");

    const lang = require("../index.js").default;
    expect(lang.title).toBe("Title");
  });

  it("renders English by default", () => {
    browser.i18n.getUILanguage.mockReturnValueOnce("test");

    const lang = require("../index.js").default;
    expect(lang.title).toBe("Title");
  });

  it("has no missing keys between files", () => {
    const files = fs.readdirSync("..").filter((fn) => fn.endsWith(".json"));

    const keyLists = [];
    for (const file in files) {
      const json = require(`../${file}`);
      keyLists.push(Object.keys(json));
    }

    for (let i = 1; i < keyLists.length; i++)
      expect(keyLists[0]).toEqual(keyLists[i]);
  });
});
