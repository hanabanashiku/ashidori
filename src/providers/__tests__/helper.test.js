import { generateRandomString } from "../helper";

describe("Api provider helpers", () => {
  it("gemerateRandomString generates a random string of given length", () => {
    const string = generateRandomString(128);

    expect(typeof string).toBe("string");
    expect(string).toHaveLength(128);
  });
});
