import React from "react";
import { render, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListDisplay from "..";
import MockApiProvider from "../../../../__mocks__/MockApiProvider";
import LibraryEntry from "../../../../models/LibraryEntry";
import { LIST_STATUS } from "../../../../enums";
import AnimeSeries from "../../../../models/AnimeSeries";

describe("List display component", () => {
  const api = new MockApiProvider();
  const entry = new LibraryEntry({
    _id: "12345",
    _status: LIST_STATUS.CURRENT,
    _rating: 8,
    _progress: 1010,
    _anime: new AnimeSeries({
      _title: "One Piece",
      _episodeCount: 0,
    }),
  });

  it("renders the anime title", () => {
    const { getByText } = render(
      <ListDisplay libraryEntry={entry} api={api} />
    );
    expect(getByText("One Piece")).toBeInTheDocument();
  });

  it("renders the anime status", () => {
    const { getByText } = render(
      <ListDisplay libraryEntry={entry} api={api} />
    );
    expect(getByText("Currently watching")).toBeInTheDocument();
  });

  it("renders the current progress", () => {
    const { getByText } = render(
      <ListDisplay libraryEntry={entry} api={api} />
    );
    expect(getByText("1010")).toBeInTheDocument();
  });

  it("renders the total number of episodes", () => {
    let newEntry = new LibraryEntry({
      ...entry,
      _anime: {
        ...entry.anime,
        _episodeCount: 1011,
      },
    });
    const { getByText } = render(
      <ListDisplay libraryEntry={newEntry} api={api} />
    );
    expect(getByText("/ 1011")).toBeInTheDocument();
  });

  it("renders the rating widget", () => {
    const { getByTestId, getByLabelText } = render(
      <ListDisplay libraryEntry={entry} api={api} />
    );

    const rating = getByTestId("ashidori-anime-rating");
    expect(rating).not.toBeNull();
    expect(getByLabelText("8 Stars")).toBeChecked();
  });

  it.skip("calls api on rating change", async () => {
    const { getByLabelText } = render(
      <ListDisplay libraryEntry={entry} api={api} />
    );

    act(() => userEvent.click(getByLabelText("9 Stars")));
    await waitFor(() => expect(api.updateLibraryItem).toHaveBeenCalledTimes(1));
    expect(api.updateLibraryItem).toHaveBeenLastCalledWith("12345", {
      rating: 9,
    });
  });
});
