import React from "react";
import Title from "./Title";
import Progress from "./Progress";
import Rating from "./Rating";
import { LIST_STATUS } from "../../enums";

export default function buildColumns(status) {
  switch (status) {
    case LIST_STATUS.CURRENT:
      return [
        {
          field: "title",
          headerName: "Title",
          width: 220,
          renderCell: ({ value }) => <Title value={value} />,
        },
        {
          field: "progress",
          headerName: "Progress",
          width: 90,
          renderCell: ({ value }) => <Progress value={value} />,
        },
        {
          field: "rating",
          headerName: "Rating",
          width: 80,
          renderCell: ({ value }) => <Rating value={value} />,
        },
      ];

    case LIST_STATUS.COMPLETED:
      return [
        {
          field: "title",
          headerName: "Title",
          width: 220,
          renderCell: ({ value }) => <Title value={value} />,
        },
        {
          field: "episodeCount",
          headerName: "Episodes",
          width: 90,
        },
        {
          field: "rating",
          headerName: "Rating",
          width: 70,
          renderCell: ({ value }) => <Rating value={value} />,
        },
        {
          field: "startSeason",
          headerName: "Season",
          width: 110,
        },
      ];

    case LIST_STATUS.ON_HOLD:
      return [
        {
          field: "title",
          headerName: "Title",
          width: 280,
          renderCell: ({ value }) => <Title value={value} />,
        },
        {
          field: "progress",
          headerName: "Progress",
          width: 90,
          renderCell: ({ value }) => <Progress value={value} />,
        },
        {
          field: "startSeason",
          headerName: "Season",
          width: 100,
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
        },
        {
          field: "episodeCount",
          headerName: "Episodes",
          width: 90,
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
