import AnimeSeason from "../AnimeSeason";

describe("Anime season model", () => {
  it("loads default values from the constructor", () => {
    const actual = new AnimeSeason();

    expect(actual.id).toBe(0);
    expect(actual.name).toBe("");
    expect(actual.number).toBe(0);
  });

  it("loads data correctly from the constructor", () => {
    const data = {
      id: 5,
      name: "Season 1",
      number: 1,
    };

    const actual = new AnimeSeason(data);

    expect(actual.id).toBe(data.id);
    expect(actual.name).toBe(data.name);
    expect(actual.number).toBe(data.number);
  });
});
