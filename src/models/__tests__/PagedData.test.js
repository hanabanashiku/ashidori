import PagedData from "../PagedData";

describe("Paged data model", () => {
  it("loads default values by default", () => {
    const actual = new PagedData();

    expect(actual.data).toStrictEqual([]);
    expect(actual.page).toBe(0);
    expect(actual.limit).toBe(0);
    expect(actual.total).toBe(0);
  });

  it("loads data from constructor", () => {
    const data = ["hello", "world"];
    const actual = new PagedData({
      data,
      page: 1,
      limit: 25,
      total: 2,
    });

    expect(actual.data).toStrictEqual(data);
    expect(actual.page).toBe(1);
    expect(actual.limit).toBe(25);
    expect(actual.total).toBe(2);
  });
});
