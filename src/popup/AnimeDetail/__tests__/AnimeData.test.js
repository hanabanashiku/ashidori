import React from "react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import AnimeData from "../AnimeData";
import libraryEntry from "./__mocks__/libraryItem";

describe("Anime data", () => {
  const props = {
    anime: libraryEntry.anime,
  };

  it("has no aXe violations", async () => {
    const { container } = render(<AnimeData {...props} />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
