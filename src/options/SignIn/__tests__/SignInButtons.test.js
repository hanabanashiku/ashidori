import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import * as extensionHelpers from "../../../helpers/extensionHelpers";
import SignInButtons from "../SignInButtons";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Sign in buttons", () => {
  const openLinkSpy = jest.spyOn(extensionHelpers, "openLink");

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

    expect(screen.getByRole("img", { name: /kitsu/i })).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /my anime list/i })
    ).toBeInTheDocument();
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

  it("clicking the MyAnimeList sign in button starts the MAL OAuth2 redirect", () => {
    render(<Component />);

    userEvent.click(
      within(
        screen.getByRole("img", { name: /my anime list/i }).parentElement
      ).getByRole("button", /sign in/i)
    );

    expect(openLinkSpy).toHaveBeenCalledTimes(1);
    const actualUrlParts = openLinkSpy.mock.calls[0][0].split("?");
    const params = new URLSearchParams(actualUrlParts[1]);

    expect(actualUrlParts[0]).toBe(
      "https://myanimelist.net/v1/oauth2/authorize"
    );
    expect(params.get("response_type")).toBe("token");
    expect(params.get("client_id")).toBeDefined();
    expect(params.get("redirect_uri")).toBeDefined();
    expect(params.get("scope")).toBe("write:users");
  });
});
