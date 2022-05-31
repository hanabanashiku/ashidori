import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import SignInButtons from "../SignInButtons";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Sign in buttons", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  function Component() {
    return (
      <MemoryRouter>
        <SignInButtons />
      </MemoryRouter>
    );
  }

  it("renders buttons for services", () => {
    render(<Component />);

    expect(screen.getByRole("img", { name: "Kitsu" })).toBeInTheDocument();
    // expect(
    //   screen.getByRole("img", { name: "My Anime List" })
    // ).toBeInTheDocument();
    // expect(screen.getByRole("img", { name: "AniList" })).toBeInTheDocument();
  });

  it("clicking the Kitsu sign in button navigates to the sign in page", () => {
    render(<Component />);

    userEvent.click(
      within(
        screen.getByRole("img", { name: /kitsu/i }).parentElement
      ).getByRole("button", /sign in/i)
    );

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("signin/kitsu");
  });
});
