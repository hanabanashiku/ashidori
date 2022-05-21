import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import {
  getByTextContent,
  queryByTextContent,
} from "../../../utils/testFunctions";
import AnimeData from "../AnimeData";
import libraryEntry from "../../../__mocks__/libraryItem";
import AnimeSeries from "../../../models/AnimeSeries";
import { ANIME_STATUS } from "../../../enums";

describe("Anime data", () => {
  const props = {
    anime: libraryEntry.anime,
  };

  it("renders header", () => {
    const { getByText, getByLabelText } = render(<AnimeData {...props} />);

    expect(getByText(props.anime.title)).toBeInTheDocument();
    expect(getByLabelText("External page")).toHaveAttribute(
      "href",
      props.anime.externalLink
    );
  });

  it("renders content", () => {
    const { getByTestId } = render(<AnimeData {...props} />);

    const cover = getByTestId("detail-cover");
    expect(cover).toBeInTheDocument();
    expect(cover).toHaveAttribute("src", props.anime.coverImageUrl);
    expect(getByTextContent("Status Airing")).toBeInTheDocument();
    expect(getByTextContent("Episodes 1008")).toBeInTheDocument();
    expect(getByTextContent("Airing Wed Oct 20 1999")).toBeInTheDocument();
    expect(getByTextContent("Length 24 minutes")).toBeInTheDocument();
    expect(getByTextContent("AdventureDramaPiracy")).toBeInTheDocument();
  });

  it("hides undefined content", () => {
    const anime = new AnimeSeries();
    render(<AnimeData anime={anime} />);

    expect(queryByTextContent("Episodes")).not.toBeInTheDocument();
    expect(queryByTextContent("Aired")).not.toBeInTheDocument();
    expect(queryByTextContent("Length")).not.toBeInTheDocument();
  });

  it("shows finished date for finished shows", () => {
    const anime = new AnimeSeries({
      _status: ANIME_STATUS.FINISHED,
      _startDate: new Date("Jan 30 2022"),
      _endDate: new Date("Feb 1 2022"),
    });

    render(<AnimeData anime={anime} />);

    expect(
      getByTextContent("Aired Sun Jan 30 2022 to Tue Feb 01 2022")
    ).toBeInTheDocument();
  });

  describe("description", () => {
    it("renders the full text when the text is short", () => {
      const { getByText, queryByText } = render(<AnimeData {...props} />);

      expect(getByText(props.anime.description)).toBeInTheDocument();
      expect(queryByText("See more")).toBeFalsy();
    });

    it("allows toggling when the text is long", () => {
      const anime = new AnimeSeries({
        _description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porttitor leo a diam sollicitudin tempor. Ac feugiat sed lectus vestibulum mattis ullamcorper. Vestibulum rhoncus est pellentesque elit ullamcorper. Arcu dui vivamus arcu felis bibendum ut tristique. Nisl pretium fusce id velit ut tortor pretium viverra suspendisse. Elit at imperdiet dui accumsan sit. Nulla malesuada pellentesque elit eget gravida cum sociis natoque. Massa sed elementum tempus egestas sed sed risus. Mi quis hendrerit dolor magna eget est. Mattis pellentesque id nibh tortor id. Elit ut aliquam purus sit amet luctus venenatis lectus magna. Sit amet massa vitae tortor.",
      });

      const { getByTestId, getByText } = render(<AnimeData anime={anime} />);

      const synopsis = getByTestId("detail-synopsis");
      let button = getByText("See more");
      expect(synopsis).toHaveStyle("overflow: hidden");
      expect(button).toBeInTheDocument();
      act(() => userEvent.click(button));
      button = getByText("See less");
      expect(button).toBeInTheDocument();
      expect(synopsis).not.toHaveStyle("overflow: hidden");
      act(() => userEvent.click(button));
      expect(synopsis).toHaveStyle("overflow: hidden");
    });
  });

  it("renders streaming links", () => {
    const { getByText } = render(<AnimeData {...props} />);

    expect(getByText("Crunchyroll")).toBeInTheDocument();
    expect(getByText("Funimation")).toBeInTheDocument();
  });

  test.each([
    [ANIME_STATUS.AIRING, "Airing"],
    [ANIME_STATUS.ANNOUNCED, "Announced"],
    [ANIME_STATUS.FINISHED, "Finished"],
    [ANIME_STATUS.UNRELEASED, "Unreleased"],
    [ANIME_STATUS.UPCOMING, "Upcoming"],
  ])("Anime status %p renders correct text", (status, expected) => {
    const anime = new AnimeSeries({
      ...props.anime,
      _status: status,
    });

    render(<AnimeData anime={anime} />);

    expect(screen.getAllByText(expected)).toBeTruthy();
  });

  it("has no aXe violations", async () => {
    const { container } = render(<AnimeData {...props} />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
