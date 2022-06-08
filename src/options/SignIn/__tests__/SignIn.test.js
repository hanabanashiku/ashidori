import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import SignIn from "..";
import * as builder from "../../../providers/builder";
import MockApiProvider from "../../../__mocks__/MockApiProvider";
import UserData from "../../../models/UserData";
import { PROVIDERS } from "../../../enums";

describe("Sign In component", () => {
  const api = new MockApiProvider();
  const mockNavigate = jest.fn();

  const userData = new UserData({
    _id: "12345",
    _name: "test",
    _provider: PROVIDERS.KITSU,
  });

  beforeEach(() => {
    jest.spyOn(builder, "getApiInstance").mockResolvedValue(api);
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const Component = () => {
    return (
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );
  };

  it("returns loading spinner while getting data", async () => {
    render(<Component />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    await waitFor(() => expect(api.getUserData).toHaveBeenCalled());
  });

  it("shows signin buttons when the user is not logged in", async () => {
    api.getUserData.mockResolvedValue(null);

    render(<Component />);
    await waitFor(() => expect(api.getUserData).toHaveBeenCalled());

    expect(screen.getAllByRole("button", { name: /sign in/i })).toHaveLength(2);
  });

  it("shows authenticated view when the user is logged in", async () => {
    api.getUserData.mockResolvedValue(userData);

    render(<Component />);
    await waitFor(() => expect(api.getUserData).toHaveBeenCalled);

    expect(
      screen.getByText(/you are logged in using kitsu/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign out/i })
    ).toBeInTheDocument();
  });

  it("signing out will cause the signin buttons to show", async () => {
    api.getUserData.mockResolvedValue(userData);

    render(<Component />);
    await waitFor(() => expect(api.getUserData).toHaveBeenCalled);

    userEvent.click(screen.getByRole("button", { name: /sign out/i }));

    await waitFor(() =>
      expect(
        screen.getAllByRole("button", { name: /sign in/i })
      ).not.toBeFalsy()
    );
    expect(screen.queryByText(/you are logged in using kitsu/i)).toBeFalsy();
  });
});
