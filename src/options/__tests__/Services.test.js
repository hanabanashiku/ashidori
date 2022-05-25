import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import Services from "../Services";
import Settings from "../Settings";
import { SERVICES } from "../../enums";

describe("Services enabler", () => {
  async function waitForLoad() {
    return waitFor(() =>
      expect(screen.getByText(/enable integrations on/i)).toBeInTheDocument()
    );
  }

  it("renders the checkboxes", async () => {
    render(<Services />);

    await waitForLoad();
    expect(
      screen.getByRole("checkbox", { name: /crunchyroll/i })
    ).toBeInTheDocument();
    // expect(
    //     screen.getByRole("checkbox", { name: /funimation/i })
    //   ).toBeInTheDocument();
    //   expect(
    //     screen.getByRole("checkbox", { name: /hulu/i })
    //   ).toBeInTheDocument();
    //   expect(
    //     screen.getByRole("checkbox", { name: /netflix/i })
    //   ).toBeInTheDocument();
    //   expect(
    //     screen.getByRole("checkbox", { name: /amazon prime/i })
    //   ).toBeInTheDocument();
    //   expect(
    //     screen.getByRole("checkbox", { name: /hidive/i })
    //   ).toBeInTheDocument();
  });

  test.each([["Crunchyroll", SERVICES.CRUNCHYROLL]])(
    "clicking the %p checkbox toggles the service",
    async function (name, value) {
      await Settings.setEnabledServices([]);
      expect(await Settings.isServiceEnabled(value)).toBeFalsy();

      render(<Services />);
      await waitForLoad();

      screen.getByRole("checkbox", { name }).click();
      expect(await Settings.isServiceEnabled(value)).toBeTruthy();

      screen.getByRole("checkbox", { name }).click();
      expect(await Settings.isServiceEnabled(value)).toBeFalsy();
    }
  );

  it("enable all button enables all services", async () => {
    await Settings.setEnabledServices([]);

    render(<Services />);
    await waitForLoad();

    screen.getByRole("button", { name: /enable all/i }).click();
    expect(await Settings.getEnabledServices()).toStrictEqual(
      Object.values(SERVICES)
    );
  });

  it("disable all button disables all services", async () => {
    await Settings.setEnabledServices(Object.values(SERVICES));

    render(<Services />);
    await waitForLoad();

    screen.getByRole("button", { name: /disable all/i }).click();
    expect(await Settings.getEnabledServices()).toStrictEqual([]);
  });

  it("has no aXe violations", async () => {
    const { container } = render(<Services />);

    await waitForLoad();
    expect(await axe(container)).toHaveNoViolations();
  });
});
