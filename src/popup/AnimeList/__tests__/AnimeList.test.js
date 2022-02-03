import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockApiProvider from "../../../__mocks__/MockApiProvider";
import library from "../../../__mocks__/library";
import PagedData from "../../../models/PagedData";
import { LIST_STATUS } from "../../../enums";
import AnimeList from "..";

describe("Anime list viewer", () => {
  const props = {
    hide: false,
    showAnime: jest.fn(),
    api: new MockApiProvider(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("hide flag hides the list", () => {
    const { container } = render(
      <AnimeList {...props} status={LIST_STATUS.CURRENT} hide={true} />
    );

    expect(container).toStrictEqual(render(null).container);
    expect(props.api.getAnimeListByStatus).not.toHaveBeenCalled();
  });

  it("grabs data for current list", async () => {
    props.api.getAnimeListByStatus.mockResolvedValueOnce(
      new PagedData({
        data: library,
        page: 0,
        limit: 100,
        total: library.length,
      })
    );

    const { getByText, queryByTestId } = render(
      <AnimeList {...props} status={LIST_STATUS.CURRENT} />
    );

    expect(props.api.getAnimeListByStatus).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(queryByTestId("loading-overlay")).toBeFalsy());

    expect(getByText("Title")).toBeInTheDocument();
    expect(getByText("Progress")).toBeInTheDocument();
    expect(getByText("Rating")).toBeInTheDocument();

    expect(getByText("ONE PIECE")).toBeInTheDocument();
    expect(getByText("500")).toBeInTheDocument();
    expect(getByText("8")).toBeInTheDocument();
    // expect(getByText("Fall 1999")).toBeInTheDocument();
    expect(getByText("SONO BISQUE DOLL WA KOI WO SURU")).toBeInTheDocument();
    expect(getByText("4/4")).toBeInTheDocument();
    expect(getByText("9")).toBeInTheDocument();
    // expect(getByText("Winter 2022")).toBeInTheDocument();
  });

  it("clicking an anime entry displays the anime detail", async () => {
    props.api.getAnimeListByStatus.mockResolvedValueOnce(
      new PagedData({
        data: library,
        page: 0,
        limit: 100,
        total: library.length,
      })
    );

    const { getByText, queryByTestId } = render(
      <AnimeList {...props} status={LIST_STATUS.CURRENT} />
    );

    await waitFor(() => expect(queryByTestId("loading-overlay")).toBeFalsy());

    userEvent.click(getByText("ONE PIECE"));
    expect(props.showAnime).toHaveBeenCalledWith("1");
  });
});
