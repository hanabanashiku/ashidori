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
});
