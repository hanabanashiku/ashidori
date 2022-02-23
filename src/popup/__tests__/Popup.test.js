import React from "react";
import { render, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Popup from "../Popup";
import * as builder from "../../providers/builder";
import MockApiProvider from "../../__mocks__/MockApiProvider";
import PagedData from "../../models/PagedData";

describe("Popup window", () => {
  let apiInstanceSpy;
  const api = new MockApiProvider();

  beforeEach(() => {
    apiInstanceSpy = jest
      .spyOn(builder, "getApiInstance")
      .mockResolvedValue(api);
    api.isAuthenticated.mockResolvedValue(true);
    api.getAnimeListByStatus.mockResolvedValue(new PagedData());
  });

  afterEach(() => {
    jest.clearAllMocks();
    apiInstanceSpy.mockRestore();
    browser.storage.local.clear();
  });

  it("shows loading spinner on launch", () => {
    const { getByRole } = render(<Popup />);

    expect(getByRole("progressbar")).toBeInTheDocument();
  });

  it("clicking the settings cog opens the options page", async () => {
    const { queryByRole, getByLabelText } = render(<Popup />);

    await waitFor(() =>
      expect(queryByRole("progressbar")).not.toBeInTheDocument()
    );

    userEvent.click(getByLabelText("Settings"));
    expect(browser.runtime.openOptionsPage).toHaveBeenCalledTimes(1);
  });

  it("shows login page when the user is not logged in", async () => {
    apiInstanceSpy.mockResolvedValueOnce(null);

    const { getByText, queryByRole } = render(<Popup />);

    await waitFor(() =>
      expect(queryByRole("progressbar")).not.toBeInTheDocument()
    );

    const loginButton = getByText("Log In");
    expect(loginButton).toBeInTheDocument();
    userEvent.click(loginButton);
    expect(browser.runtime.openOptionsPage).toHaveBeenCalledTimes(1);
  });

  describe("currently watching alert", () => {
    it("is rendered when an anime is being watched", async () => {
      browser.storage.local.set({
        current_anime: {
          libraryEntryId: "12345",
          title: "My Hero Academia",
          episodeNumber: 5,
        },
      });

      const { getByText, queryByRole } = render(<Popup />);

      await waitFor(() =>
        expect(queryByRole("progressbar")).not.toBeInTheDocument()
      );

      expect(
        getByText("You are currently watching episode 5 of My Hero Academia.")
      ).toBeInTheDocument();
      const link = getByText("See details.");
      expect(link).not.toBeNull();
    });

    it("is not rendered by default", async () => {
      const { queryByTestId, queryByRole } = render(<Popup />);

      await waitFor(() =>
        expect(queryByRole("progressbar")).not.toBeInTheDocument()
      );

      expect(queryByTestId("current-watching-alert")).toBeNull();
    });
  });

  it("renders the list tabs", async () => {
    const { getByText, queryByRole } = render(<Popup />);

    await waitFor(() =>
      expect(queryByRole("progressbar")).not.toBeInTheDocument()
    );

    expect(getByText("Watching")).toBeInTheDocument();
    expect(getByText("Completed")).toBeInTheDocument();
    expect(getByText("Planned")).toBeInTheDocument();
    expect(getByText("On hold")).toBeInTheDocument();
    expect(getByText("Dropped")).toBeInTheDocument();
  });

  it("clicking a tab selects it", async () => {
    const shouldBeSelected = (element) =>
      expect(element).toHaveAttribute("aria-selected", "true");

    const { getByText, queryByRole } = render(<Popup />);

    await waitFor(() =>
      expect(queryByRole("progressbar")).not.toBeInTheDocument()
    );

    const watching = getByText("Watching");
    const completed = getByText("Completed");
    const planned = getByText("Planned");
    const hold = getByText("On hold");
    const dropped = getByText("Dropped");

    shouldBeSelected(watching);

    act(() => userEvent.click(completed));
    shouldBeSelected(completed);

    act(() => userEvent.click(planned));
    shouldBeSelected(planned);

    act(() => userEvent.click(hold));
    shouldBeSelected(hold);

    act(() => userEvent.click(dropped));
    shouldBeSelected(dropped);

    act(() => userEvent.click(watching));
    shouldBeSelected(watching);
  });
});
