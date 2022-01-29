import React from "react";
import { render } from "@testing-library/react";
import AnimeDetail from "..";
import ApiProvider from "../../../__mocks__/MockApiProvider";

describe("Anime detail display", () => {
  const entryId = "12345";
  const api = new ApiProvider();
  const close = jest.fn();

  const props = {
    selectedAnime: entryId,
    api,
    close,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches data on launch", () => {
    render(<AnimeDetail {...props} />);

    expect(api.getSingleLibraryEntry).toHaveBeenCalledTimes(1);
    expect(api.getSingleLibraryEntry).toHaveBeenCalledWith(entryId);
  });

  it("shows loading spinner while loading", () => {
    api.getSingleLibraryEntry.mockReturnValue(new Promise());

    const { container } = render(<AnimeDetail {...props} />);

    expect(
      container.querySelector(".MuiCircularProgress-root")
    ).toBeInTheDocument();
  });
});
