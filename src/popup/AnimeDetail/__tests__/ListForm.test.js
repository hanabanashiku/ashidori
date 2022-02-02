import React from "react";
import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
} from "@testing-library/react";
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
    render(<ListForm {...props} />);

    const { status, progress, rating, startDate, finishedDate, notes } =
      getFields();

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

  it.skip('hitting save patches thte entry and closes the view', async () => {
    const { getByText } = render(<ListForm {...props} />);
    
    const { status, progress, rating, startDate, finishedDate, notes } =
      getFields();
    const button = getByText("Save");

    fireEvent.change(status, { target: { value: `${LIST_STATUS.ON_HOLD}`}})
    
    userEvent.clear(progress);
    userEvent.type(progress, "1005");

    fireEvent.change(rating, {
      target: {
        value: '9.5'
      }
    });

    fireEvent.change(startDate, { target: { value: '01/01/2018' }});
    fireEvent.blur(startDate);

    fireEvent.change(finishedDate, { target: { value: '01/02/2019' }});
    fireEvent.blur(finishedDate);

    userEvent.clear(notes);
    userEvent.type(notes, 'hello world');

    act(() => userEvent.click(button));

    await waitFor(() => expect(props.api.updateLibraryItem).toHaveBeenCalledTimes(1));
    expect(props.api.updateLibraryItem).toHaveBeenLastCalledWith(props.entry.id, {
      status: `${LIST_STATUS.ON_HOLD}`,
      progress: 1005,
      rating: 9.5,
      startDate: "01/01/2018",
      finishedDate: "01/02/2019",
      notes: "hello world"
    });
    expect(props.close).toHaveBeenCalledTimes(1);
  });

  it("hitting save patches dirty fields only", async () => {
    const { getByText } = render(<ListForm {...props} />);

    const { progress, notes } =
      getFields();

    const button = getByText("Save");

    userEvent.clear(progress);
    userEvent.type(progress, "1006");

    userEvent.clear(notes);
    userEvent.type(notes, "notes are good");

    act(() => userEvent.click(button));

    await waitFor(() => expect(props.api.updateLibraryItem).toHaveBeenCalledTimes(1));
    expect(props.api.updateLibraryItem).toHaveBeenLastCalledWith(
      props.entry.id,
      {
        progress: 1006,
        notes: "notes are good",
      }
    );
    expect(props.close).toHaveBeenCalledTimes(1);
  });

  it('clicking the delete button shows the delete modal', () => {
    const { getByText, getByLabelText } = render(<ListForm {...props} />);

    const button = getByLabelText("Remove from list");
    act(() => userEvent.click(button));

    expect(getByText("Delete this library entry?")).toBeInTheDocument();
  });

  it("clicking cancel on the delete modal closes the delete modal", async () => {
    const { queryByText, getByTestId, getByLabelText } = render(<ListForm {...props} />);

    const button = getByLabelText("Remove from list");
    act(() => userEvent.click(button));
    userEvent.click(getByTestId("delete-modal-cancel"));

    await waitFor(() => expect(queryByText("Delete this library entry?")).toBeFalsy());
    expect(props.api.removeLibraryItem).not.toHaveBeenCalled();
  });

  it("clicking delete on the delete modal callse the delete endpoint", async () => {
    const { getByText, getByLabelText } = render(<ListForm {...props} />);

    const button = getByLabelText("Remove from list");
    act(() => userEvent.click(button));
    userEvent.click(getByText("Delete"));

    await waitFor(() => expect(props.close).toHaveBeenCalledTimes(1));
    expect(props.api.removeLibraryItem).toHaveBeenCalledTimes(1);
    expect(props.api.removeLibraryItem).toHaveBeenCalledWith(props.entry.id);
  });

  it("has no aXe violations", async () => {
    const { container } = render(<ListForm {...props} />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
