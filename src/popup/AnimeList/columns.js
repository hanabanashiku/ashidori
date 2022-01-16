import { LIST_STATUS } from "../../enums";

export default function buildColumns(status) {
  switch (status) {
    case LIST_STATUS.CURRENT:
      return [
        {
          field: "title",
          headerName: "Title",
          width: 220,
        },
        {
          field: "progress",
          headerName: "Progress",
          width: 90,
        },
        {
          field: "rating",
          headerName: "Rating",
          width: 80,
        },
      ];

    case LIST_STATUS.COMPLETED:
      return [
        {
          field: "title",
          headerName: "Title",
          width: 220,
        },
        {
          field: "episodeCount",
          headerName: "Episodes",
          width: 70,
        },
        {
          field: "rating",
          headerName: "Rating",
          width: 70,
        },
        {
          field: "startSeason",
          headerName: "Season",
          width: 100,
        },
      ];

    case LIST_STATUS.DROPPED:
    case LIST_STATUS.ON_HOLD:
    case LIST_STATUS.PLANNED:
      return [
        {
          field: "title",
          headerName: "Title",
          width: 220,
        },
        {
          field: "episodeCount",
          headerName: "EpisodeCount",
          width: 70,
        },
        {
          field: "startSeason",
          headerName: "Season",
          width: 100,
        },
      ];

    default:
      return [];
  }
}
