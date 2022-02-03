import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Rating from "../Rating";
import MockApiProvider from "../../../__mocks__/MockApiProvider";

describe("Rating cell", () => {
  const value = {
    id: "12345",
    rating: 8,
    api: new MockApiProvider(),
    refresh: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("dispalys the rating", () => {
    const { getByText } = render(<Rating value={value} />);

    expect(getByText("8")).toBeInTheDocument();
  });

  it("does not display an empty rating", () => {
    const { getByText } = render(
      <Rating
        value={{
          ...value,
          rating: null,
        }}
      />
    );

    expect(getByText("Rate")).toBeInTheDocument();
  });

  it("clicking switches to edit mode", () => {
    const { container, getByLabelText } = render(<Rating value={value} />);

    act(() => userEvent.click(container.firstChild));

    expect(getByLabelText("Series rating")).toBeInTheDocument();
  });

  it("typing the escape button cancels the operation", () => {
    const { container, getByLabelText } = render(<Rating value={value} />);

    act(() => userEvent.click(container.firstChild));
    const textBox = getByLabelText("Series rating").querySelector("input");
    userEvent.type(textBox, "9{esc}");

    expect(value.api.updateLibraryItem).not.toHaveBeenCalled();
    expect(textBox).not.toBeInTheDocument();
  });

  it("submitting the change updates the anime", () => {
    const { container, getByLabelText } = render(<Rating value={value} />);

    act(() => userEvent.click(container.firstChild));
    const textBox = getByLabelText("Series rating").querySelector("input");
    userEvent.type(textBox, "{backspace}10{enter}");

    expect(value.api.updateLibraryItem).toHaveBeenCalled();
    expect(value.api.updateLibraryItem).toHaveBeenLastCalledWith("12345", {
      rating: 10,
    });
  });

  it("blurring the field updates the anime", () => {
    const { container, getByLabelText } = render(<Rating value={value} />);

    act(() => userEvent.click(container.firstChild));
    const textBox = getByLabelText("Series rating").querySelector("input");
    userEvent.type(textBox, "{backspace}7");
    fireEvent.blur(textBox);

    expect(value.api.updateLibraryItem).toHaveBeenCalled();
    expect(value.api.updateLibraryItem).toHaveBeenLastCalledWith("12345", {
      rating: 7,
    });
  });
});
