import LibraryEntry from "../LibraryEntry";
import AnimeSeries from "../AnimeSeries";
import { LIST_STATUS, PROVIDERS } from "../../enums";

// mock data
import kitsu_library_entry from "../../__mocks__/kitsu/libraryEntry.json";

describe("Library entry model", () => {
  it("default constructor loads default values", () => {
    const actual = new LibraryEntry();

    expect(actual.id).toBe(0);
    expect(actual.status).toBe(LIST_STATUS.NOT_WATCHING);
    expect(actual.progress).toBe(0);
    expect(actual.notes).toBe("");
    expect(actual.startDate).toBeNull();
    expect(actual.completedDate).toBeNull();
    expect(actual.rewatchCount).toBe(0);
    expect(actual.lastUpdated).toBeNull();
    expect(actual.rating).toBe(0);
    expect(actual.anime).toStrictEqual(new AnimeSeries());
  });

  it("loads data from kitsu", () => {
    const actual = new LibraryEntry({
      ...kitsu_library_entry.data,
      included: kitsu_library_entry.included,
      provider: PROVIDERS.KITSU,
    });

    expect(actual.id).toBe("29377736");
    expect(actual.status).toBe(LIST_STATUS.CURRENT);
    expect(actual.progress).toBe(38);
    expect(actual.notes).toBe("note");
    expect(actual.startDate.toDateString()).toBe("Sun Oct 08 2017");
    expect(actual.completedDate).toBeNull();
    expect(actual.rewatchCount).toBe(0);
    expect(actual.lastUpdated.toDateString()).toBe("Sat Jan 22 2022");
    expect(actual.rating).toBe(0);
    expect(actual.anime).not.toBeNull();
    expect(actual.anime.title).toBe("Black Clover");
    expect(actual.anime.id).toBe("13209");
  });
});
