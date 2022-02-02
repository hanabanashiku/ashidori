import React from "react";
import { render } from "@testing-library/react";
import StreamingLinks from "../StreamingLinks";

describe("Streaming links", () => {
  it("Renders links", () => {
    const links = {
      0: "https://crunchyroll.com/one-piece",
      1: "https://funimation.com/one-piece",
      2: "https://hulu.com/one-piece",
      3: "https://netflix.com/one-piece",
      4: "https://amazon.com/one-piece",
      5: "https://hidive.com/one-piece",
      6: "https://tubitv.com/one-piece",
      7: "https://vrv.co/one-piece",
    };
    const { getByText } = render(<StreamingLinks links={links} />);

    expect(getByText("Crunchyroll").parentElement).toHaveAttribute(
      "href",
      links[0]
    );
    expect(getByText("Funimation").parentElement).toHaveAttribute(
      "href",
      links[1]
    );
    expect(getByText("Hulu").parentElement).toHaveAttribute("href", links[2]);
    expect(getByText("Netflix").parentElement).toHaveAttribute(
      "href",
      links[3]
    );
    expect(getByText("Prime Video").parentElement).toHaveAttribute(
      "href",
      links[4]
    );
    expect(getByText("Hidive").parentElement).toHaveAttribute("href", links[5]);
    expect(getByText("TubiTV").parentElement).toHaveAttribute("href", links[6]);
    expect(getByText("VRV").parentElement).toHaveAttribute("href", links[7]);
  });

  it("does not render links for missing services", () => {
    const links = {
      0: "https://crunchyroll.com/one-piece",
      3: "https://netflix.com/one-piece",
    };
    const { getByText, queryByText } = render(<StreamingLinks links={links} />);

    expect(getByText("Crunchyroll").parentElement).toHaveAttribute(
      "href",
      links[0]
    );
    expect(queryByText("Funimation")).toBeFalsy();
    expect(queryByText("Hulu")).toBeFalsy();
    expect(getByText("Netflix").parentElement).toHaveAttribute(
      "href",
      links[3]
    );
    expect(queryByText("Prime Video")).toBeFalsy();
    expect(queryByText("Hidive")).toBeFalsy();
    expect(queryByText("TubiTV")).toBeFalsy();
    expect(queryByText("VRV")).toBeFalsy();
  });
});
