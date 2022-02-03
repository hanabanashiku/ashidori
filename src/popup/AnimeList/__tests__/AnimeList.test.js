import React from "react";
import { render } from "@testing-library/react";
import MockApiProvider from "../../../__mocks__/MockApiProvider";
import library from "../../../__mocks__/library";
import { LIST_STATUS } from "../../../enums";
import AnimeList from "..";

describe("Anime list viewer", () => {
  const props = {
    hide: false,
    showAnime: jest.fn(),
    api: new MockApiProvider(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("hide flag hides the list", () => {
    const { container } = render(
      <AnimeList {...props} status={LIST_STATUS.CURRENT} hide={true} />
    );

    expect(container).toStrictEqual(render(null).container);
    expect(props.api.getAnimeListByStatus).not.toHaveBeenCalled();
  });

  it('grabs data for current list', () => {
    props.api.getAnimeListByStatus.mockResolvedValueOnce(library);

    const { container } = render(<AnimeList {...props} status={LIST_STATUS.CURRENT} />})
  });
});
