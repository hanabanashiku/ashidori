import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import LoadingOverlay from "./LoadingOverlay";
import { getApiInstance } from "../../providers/builder";
import { LIST_STATUS } from "../../enums";

const AnimeList = ({ status, hide }) => {
  const [page, setPage] = useState(0);
  const [apiState, setApiState] = useState("loading");
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (page === -1) {
      return;
    }

    (async () => {
      const api = await getApiInstance();
      try {
        const data = await api.getAnimeListByStatus(status, page);
        setApiState("done");
        if (data.length === 0) {
          setPage(-1);
          return;
        }
        setItems((i) => [...i, ...data]);
      } catch {
        setApiState("error");
      }
    })();
  }, [page, status, setItems, setPage]);

  const onRowsScrolledEnd = () => {
    if (page === -1) {
      return;
    }
    setPage((p) => p + 1);
  };

  const buildColumns = () => {
    return [
      {
        field: "title",
        headerName: "Title",
        width: 240,
      },
      {
        field: "progress",
        headerName: "Progress",
        width: 80,
      },
      {
        field: "rating",
        headerName: "Rating",
        width: 80,
      },
    ];
  };
  const columns = useMemo(() => buildColumns(), [status]);

  /**
   *
   * @param {LibraryEntry} item
   * @returns
   */
  const buildRow = (item) => {
    return {
      id: item.id,
      title: item.anime.title,
      progress: `${item.progress}/${item.anime?.episodeCount}`,
      rating: `${item.rating}`,
    };
  };
  const rows = items.map((item) => buildRow(item));

  if (hide) {
    return null;
  }

  // TODO
  // Implement server pagination
  // The function we're using needs to return an object that contains
  // the total number of objects for the given status and the new data.
  // Add an argument for the number of rows so there aren't scrollbars
  // Sorting based on hidden columns? ideally last updated
  // Make the cells look prettier
  return (
    <DataGrid
      loading={apiState === "loading"}
      columns={columns}
      rows={rows}
      pageSize={30}
      paginationMode="server"
      onPageChange={(p) => setPage((prev) => Math.max(prev, p))}
      components={{
        LoadingOverlay: LoadingOverlay,
      }}
    />
  );
};
AnimeList.propTypes = {
  status: PropTypes.oneOf(Object.values(LIST_STATUS)).isRequired,
  hide: PropTypes.bool.isRequired,
};

export default AnimeList;
