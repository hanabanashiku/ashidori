import React from "react";
import Title from "./Title";
import Progress from "./Progress";
import Rating from "./Rating";
import { LIST_STATUS } from "../../enums";

export const editableColumns = ["progress", "rating"];

export function buildColumns(status) {
  switch (status) {
    case LIST_STATUS.CURRENT:
      return [
        {
          field: "title",
          headerName: "Title",
          width: 220,
          renderCell: ({ value }) => <Title value={value} />,
          sortable: false,
        },
        {
          field: "progress",
          headerName: "Progress",
          width: 90,
          renderCell: ({ value }) => <Progress value={value} />,
          sortable: false,
        },
        {
          field: "rating",
          headerName: "Rating",
          width: 80,
          renderCell: ({ value }) => <Rating value={value} />,
          sortable: false,
        },
        {
          field: "startSeason",
          headerName: "Season",
          width: 110,
          sortable: false,
        },
      ];

    case LIST_STATUS.COMPLETED:
      return [
        {
          field: "title",
          headerName: "Title",
          width: 220,
          renderCell: ({ value }) => <Title value={value} />,
          sortable: false,
        },
        {
          field: "episodeCount",
          headerName: "Episodes",
          width: 90,
          sortable: false,
        },
        {
          field: "rating",
          headerName: "Rating",
          width: 70,
          renderCell: ({ value }) => <Rating value={value} />,
          sortable: false,
        },
        {
          field: "startSeason",
          headerName: "Season",
          width: 110,
          sortable: false,
        },
      ];

    case LIST_STATUS.ON_HOLD:
      return [
        {
          field: "title",
          headerName: "Title",
          width: 280,
          renderCell: ({ value }) => <Title value={value} />,
          sortable: false,
        },
        {
          field: "progress",
          headerName: "Progress",
          width: 90,
          renderCell: ({ value }) => <Progress value={value} />,
          sortable: false,
        },
        {
          field: "startSeason",
          headerName: "Season",
          width: 100,
          sortable: false,
        },
      ];
    case LIST_STATUS.DROPPED:
    case LIST_STATUS.PLANNED:
      return [
        {
          field: "title",
          headerName: "Title",
          width: 280,
          renderCell: ({ value }) => <Title value={value} />,
          sortable: false,
        },
        {
          field: "episodeCount",
          headerName: "Episodes",
          width: 90,
          sortable: false,
        },
        {
          field: "startSeason",
          headerName: "Season",
          width: 100,
          sortable: false,
        },
      ];

    default:
      return [];
  }
}
