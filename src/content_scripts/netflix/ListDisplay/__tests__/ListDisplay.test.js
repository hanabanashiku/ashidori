import React from "react";
import {
  render,
  act,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListDisplay from "..";
import MockApiProvider from "../../../../__mocks__/MockApiProvider";
import LibraryEntry from "../../../../models/LibraryEntry";
import AnimeSeries from "../../../../models/AnimeSeries";
import UserData from "../../../../models/UserData";
import { LIST_STATUS, PROVIDERS } from "../../../../enums";
import MESSAGE_TYPES from "../../../../messageTypes";

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
      _link: "https://kitsu.io/one-piece",
    }),
  });
  const userData = new UserData({
    _provider: PROVIDERS.KITSU,
  });
  let playerWindow;
  let controls;

  function showListDisplay() {
    const button = screen.getByRole("button", { name: /ashidori data/i });
    fireEvent.mouseEnter(button);
  }

  // Setup DOM
  beforeEach(() => {
    document.body.innerHTML = "";
    playerWindow = document.createElement("div");
    playerWindow.setAttribute("data-uia", "player");
    controls = document.createElement("div");
    controls.setAttribute("data-uia", "controls-standard");

    playerWindow.appendChild(controls);
    document.body.appendChild(playerWindow);
  });

  it("renders the ashidori button", () => {
    render(<ListDisplay libraryEntry={entry} api={api} userData={userData} />);

    expect(
      screen.getByRole("button", { name: /ashidori data/i })
    ).toBeInTheDocument();
  });

  it("renders the list display on hover", () => {
    render(<ListDisplay libraryEntry={entry} api={api} userData={userData} />);

    showListDisplay();
    expect(
      document.querySelector("div[data-uia=ashidori-display]")
    ).toBeInTheDocument();
  });

  it("hides the list display on mouse exit", () => {
    render(<ListDisplay libraryEntry={entry} api={api} userData={userData} />);

    showListDisplay();
    fireEvent.mouseLeave(
      document.querySelector("div[data-uia=ashidori-display]")
    );
    expect(
      document.querySelector("div[data-uia=ashidori-display]")
    ).not.toBeTruthy();
  });

  it("hides the list display when the control footer closes", async () => {
    render(<ListDisplay libraryEntry={entry} api={api} userData={userData} />);

    showListDisplay();

    playerWindow.removeChild(controls);
    await waitFor(() =>
      expect(
        document.querySelector("div[data-uia=ashidori-display]")
      ).not.toBeTruthy()
    );
  });

  it("renders the anime title", () => {
    render(<ListDisplay libraryEntry={entry} api={api} userData={userData} />);

    showListDisplay();
    expect(screen.getByText("One Piece")).toBeInTheDocument();
  });

  it("renders the anime status", () => {
    render(<ListDisplay libraryEntry={entry} api={api} userData={userData} />);

    showListDisplay();
    expect(screen.getByText("Currently watching")).toBeInTheDocument();
  });

  it("renders the current progress", () => {
    render(<ListDisplay libraryEntry={entry} api={api} userData={userData} />);

    showListDisplay();
    expect(screen.getByText("1010")).toBeInTheDocument();
  });

  it("renders the total number of episodes", () => {
    let newEntry = new LibraryEntry({
      ...entry,
      _anime: {
        ...entry.anime,
        _episodeCount: 1011,
      },
    });

    render(
      <ListDisplay libraryEntry={newEntry} api={api} userData={userData} />
    );

    showListDisplay();
    expect(screen.getByText("/ 1011")).toBeInTheDocument();
  });

  test.each([
    LIST_STATUS.COMPLETED,
    LIST_STATUS.DROPPED,
    LIST_STATUS.NOT_WATCHING,
  ])(
    `does not render the progress widget if the show is not in progress - %d`,
    (status) => {
      const newEntry = new LibraryEntry({
        _id: "12345",
        _status: status,
        _rating: 8,
        _progress: 1010,
        _anime: new AnimeSeries({
          _title: "One Piece",
          _episodeCount: 0,
        }),
      });

      render(
        <ListDisplay libraryEntry={newEntry} api={api} userData={userData} />
      );

      showListDisplay();
      expect(screen.queryByText("1010")).toBeFalsy();
    }
  );

  it("renders the rating widget", () => {
    render(<ListDisplay libraryEntry={entry} api={api} userData={userData} />);

    showListDisplay();
    const rating = screen.getByTestId("ashidori-anime-rating");
    expect(rating).not.toBeNull();
    expect(screen.getByLabelText("8 Stars")).toBeChecked();
  });

  it("calls api on rating change", () => {
    render(<ListDisplay libraryEntry={entry} api={api} userData={userData} />);

    showListDisplay();
    act(() => userEvent.click(screen.getByLabelText("9 Stars")));
    expect(api.updateLibraryItem).toHaveBeenCalledTimes(1);
    expect(api.updateLibraryItem).toHaveBeenLastCalledWith("12345", {
      rating: 9,
    });
  });

  it("reverts the rating widget if the update fails", () => {
    api.updateLibraryItem.mockRejectedValueOnce({
      response: {
        status: 400,
      },
    });
    render(<ListDisplay libraryEntry={entry} api={api} userData={userData} />);

    showListDisplay();
    act(() => userEvent.click(screen.getByLabelText("9 Stars")));
    expect(api.updateLibraryItem).toHaveBeenCalled();
    expect(screen.getByLabelText("9 Stars")).not.toBeChecked();
  });

  it("does not render the rating widget if the show is not in the list", () => {
    const newEntry = new LibraryEntry({
      _status: LIST_STATUS.NOT_WATCHING,
      _anime: new AnimeSeries({
        _title: "One Piece",
        _episodeCount: 0,
      }),
    });

    render(
      <ListDisplay libraryEntry={newEntry} api={api} userData={userData} />
    );

    showListDisplay();
    expect(screen.queryByTestId("ashidori-anime-rating")).toBeFalsy();
  });

  it("Clicking the view on provider button opens the external link", () => {
    render(<ListDisplay libraryEntry={entry} api={api} userData={userData} />);

    showListDisplay();
    const button = screen.getByRole("link", { name: /View on Kitsu/i });
    expect(button).toBeInTheDocument();
    expect(button.getAttribute("href")).toBe("https://kitsu.io/one-piece");
  });

  it("Clicking the open in ashidori button opens the anime detail in a popup window on chrome", () => {
    render(<ListDisplay libraryEntry={entry} api={api} userData={userData} />);

    showListDisplay();
    const button = screen.getByRole("button", { name: /Open in Ashidori/i });
    expect(button).toBeInTheDocument();
    act(() => userEvent.click(button));

    expect(browser.runtime.sendMessage).toHaveBeenCalledTimes(1);
    expect(browser.runtime.sendMessage).toHaveBeenLastCalledWith({
      type: MESSAGE_TYPES.SHOW_ANIME_DETAIL_POPUP,
      payload: {
        libraryEntryId: "12345",
      },
    });
  });
});
