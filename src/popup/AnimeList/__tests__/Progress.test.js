import React from "react";
import { render, act, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Progress from "../Progress";
import MockApiProvider from "../../../__mocks__/MockApiProvider";
import { LIST_STATUS } from "../../../enums";

describe("Progress cell", () => {
  const value = {
    id: "12345",
    current: 25,
    total: 50,
    api: new MockApiProvider(),
    refresh: jest.fn(),
  };

  let dateSpy;
  const now = new Date("Feb 2 2022 10:00 pm");

  beforeEach(() => {
    dateSpy = jest.spyOn(global, "Date").mockImplementation(() => now);
    value.api.updateLibraryItem.mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
    dateSpy.mockRestore();
  });

  it("renders the value", () => {
    const { getByText } = render(<Progress value={value} />);

    expect(getByText("25/50")).toBeInTheDocument();
  });

  it("does not render the total when the total is null", () => {
    const { getByText } = render(
      <Progress
        value={{
          ...value,
          total: null,
        }}
      />
    );

    expect(getByText("25")).toBeInTheDocument();
  });

  it("clicking switches to edit mode", () => {
    const { container, getByText, getByLabelText } = render(
      <Progress value={value} />
    );

    act(() => userEvent.click(container.firstChild));

    expect(getByText("/ 50")).toBeInTheDocument();
    expect(getByLabelText("Current episode")).toBeInTheDocument();
  });

  it("typing the escape button cancels the operation", () => {
    const { container, getByLabelText } = render(<Progress value={value} />);

    act(() => userEvent.click(container.firstChild));
    const textBox = getByLabelText("Current episode").querySelector("input");
    userEvent.type(textBox, "15{esc}");

    expect(value.api.updateLibraryItem).not.toHaveBeenCalled();
    expect(textBox).not.toBeInTheDocument();
  });

  it("submitting the change updates the anime", () => {
    const { container, getByLabelText } = render(<Progress value={value} />);

    act(() => userEvent.click(container.firstChild));
    const textBox = getByLabelText("Current episode").querySelector("input");
    userEvent.type(textBox, "{backspace}{backspace}15{enter}");

    expect(value.api.updateLibraryItem).toHaveBeenCalled();
    expect(value.api.updateLibraryItem).toHaveBeenLastCalledWith("12345", {
      progress: 15,
    });
  });

  it("blurring the field updates the anime", () => {
    const { container, getByLabelText } = render(<Progress value={value} />);

    act(() => userEvent.click(container.firstChild));
    const textBox = getByLabelText("Current episode").querySelector("input");
    userEvent.type(textBox, "{backspace}{backspace}15");
    fireEvent.blur(textBox);

    expect(value.api.updateLibraryItem).toHaveBeenCalled();
    expect(value.api.updateLibraryItem).toHaveBeenLastCalledWith("12345", {
      progress: 15,
    });
  });

  it("completing the anime sets the status and calls refresh", async () => {
    const { container, getByLabelText } = render(<Progress value={value} />);
    act(() => userEvent.click(container.firstChild));
    const textBox = getByLabelText("Current episode").querySelector("input");
    userEvent.type(textBox, "{backspace}{backspace}50{enter}");

    expect(value.api.updateLibraryItem).toHaveBeenCalled();
    expect(value.api.updateLibraryItem).toHaveBeenLastCalledWith("12345", {
      progress: 50,
      status: LIST_STATUS.COMPLETED,
      completedDate: now,
    });
    await waitFor(() => expect(value.refresh).toHaveBeenCalled());
  });
});
