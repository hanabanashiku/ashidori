import React from "react";
import { render, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import AnimeDetail from "..";
import ApiProvider from "../../../__mocks__/MockApiProvider";
import libraryItem from "../../../__mocks__/libraryItem";

describe("Anime detail display", () => {
  const entryId = "12345";
  const api = new ApiProvider();
  const close = jest.fn();

  const props = {
    selectedAnime: entryId,
    api,
    close,
    isListEntryId: true,
    isPopup: true,
  };

  beforeEach(() => {
    api.getSingleLibraryEntry.mockResolvedValue(libraryItem);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  async function waitForData(container) {
    return waitFor(() =>
      expect(container.querySelector(".MuiCircularProgress-root")).toBeFalsy()
    );
  }

  it("fetches data on launch", () => {
    render(<AnimeDetail {...props} />);

    expect(api.getSingleLibraryEntry).toHaveBeenCalledTimes(1);
    expect(api.getSingleLibraryEntry).toHaveBeenCalledWith(entryId);
  });

  it("fetches data for anime id on launch", () => {
    render(<AnimeDetail {...props} isListEntryId={false} />);

    expect(api.getSingleLibraryEntry).not.toHaveBeenCalled();
    expect(api.getSingleLibraryEntryByAnime).toHaveBeenCalledTimes(1);
    expect(api.getSingleLibraryEntryByAnime).toHaveBeenCalledWith(entryId);
  });

  it("shows loading spinner while loading", () => {
    api.getSingleLibraryEntry.mockReturnValue(new Promise(() => {}));
    const { container } = render(<AnimeDetail {...props} />);

    expect(
      container.querySelector(".MuiCircularProgress-root")
    ).toBeInTheDocument();
  });

  it("shows error alert when an error occurs pulling data", async () => {
    api.getSingleLibraryEntry.mockRejectedValueOnce({});

    const { getByText } = render(<AnimeDetail {...props} />);

    await waitFor(() =>
      expect(
        getByText(
          "An error has occurred. Please check your internet connection and try again."
        )
      ).toBeInTheDocument()
    );
  });

  it("renders the page on success", async () => {
    const { container, getByText, getByTestId } = render(
      <AnimeDetail {...props} />
    );

    await waitForData(container);
    expect(getByText("Back")).toBeInTheDocument();
    expect(getByTestId("detail-staticdata")).toBeInTheDocument();
    expect(getByTestId("detail-form")).toBeInTheDocument();
  });

  it("clicking the back button closes the detail view", async () => {
    const { container, getByText } = render(<AnimeDetail {...props} />);

    await waitForData(container);
    const button = getByText("Back");
    expect(button).toBeDefined();
    act(() => userEvent.click(button));

    expect(close).toHaveBeenCalledTimes(1);
  });

  it("has no aXe violations", async () => {
    const { container } = render(<AnimeDetail {...props} />);

    await waitForData(container);
    expect(await axe(container)).toHaveNoViolations();
  }, 20000);

  it("matches snapshot", async () => {
    const { container } = render(<AnimeDetail {...props} />);

    await waitForData(container);
    expect(container).toMatchSnapshot();
  });
});
