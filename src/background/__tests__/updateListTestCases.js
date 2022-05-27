import { LIST_STATUS } from "../../enums";

export const updatedPopupTestCases = ["chrome", "firefox"]
  .map((browser) => [
    [
      "completed",
      browser,
      {
        episodeData: {
          _number: 115,
        },
        listEntry: {
          _progress: 114,
          _status: LIST_STATUS.CURRENT,
          _anime: {
            _episodeCount: 115,
          },
        },
      },
      "My Hero Academia has been marked finished.",
    ],
    [
      "on hold",
      browser,
      {
        episodeData: {
          _number: 115,
        },
        listEntry: {
          _progress: 114,
          _status: LIST_STATUS.ON_HOLD,
          _anime: {
            _episodeCount: 120,
          },
        },
      },
      "My Hero Academia has been marked as currently watching.",
    ],
    [
      "planned",
      browser,
      {
        episodeData: {
          _number: 1,
        },
        listEntry: {
          _progress: 0,
          _status: LIST_STATUS.PLANNED,
          _anime: {
            _episodeCount: 120,
          },
        },
      },
      "My Hero Academia has been marked as currently watching.",
    ],
    [
      "current",
      browser,
      {
        episodeData: {
          _number: 115,
        },
        listEntry: {
          _progress: 114,
          _status: LIST_STATUS.CURRENT,
          _anime: {
            _episodeCount: 120,
          },
        },
      },
      "My Hero Academia has been updated to episode 115.",
    ],
  ])
  .flat(1);
