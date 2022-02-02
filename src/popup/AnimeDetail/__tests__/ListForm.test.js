import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import ListForm from "../ListForm";
import MockApiProvider from "../../../__mocks__/MockApiProvider";
import libraryEntry from "./__mocks__/libraryItem";
import { LIST_STATUS } from "enums";

describe("Anime list form", () => {
  const props = {
    entry: libraryEntry,
    api: new MockApiProvider(),
    close: jest.fn(),
  };

  function getFields() {
    const status = screen.getByLabelText("Library status").nextSibling;
    const progress = screen.getByLabelText("Progress");
    const rating = document.querySelector("input[name=rating]");
    const startDate = screen.getByLabelText("Started");
    const finishedDate = screen.getByLabelText("Finished");
    const notes = screen.getByLabelText("Notes");

    return {
      status,
      progress,
      rating,
      startDate,
      finishedDate,
      notes,
    };
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders fields with default values", () => {
    const { getByLabelText } = render(<ListForm {...props} />);

    const { status, progress, rating, startDate, finishedDate, notes } =
      getFields(getByLabelText);

    expect(status).toHaveValue(`${LIST_STATUS.CURRENT}`);
    expect(progress).toHaveValue(1008);
    expect(rating).toHaveValue("8");
    expect(startDate).toHaveValue("01/30/2022");
    expect(finishedDate).toHaveValue("");
    expect(notes).toHaveValue("note");
  });

  it("hitting the cancel button closes the window", () => {
    const { getByText } = render(<ListForm {...props} />);

    const button = getByText("Cancel");
    userEvent.click(button);
    expect(props.close).toHaveBeenCalledTimes(1);
  });

  it("hitting save when no fields are dirty does not call the api", async () => {
    const { getByText } = render(<ListForm {...props} />);

    const button = getByText("Save");
    act(() => userEvent.click(button));
    await waitFor(() => expect(props.close).toHaveBeenCalledTimes(1));
    expect(props.api.updateLibraryItem).not.toHaveBeenCalled();
  });

  it("has no aXe violations", async () => {
    const { container } = render(<ListForm {...props} />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
