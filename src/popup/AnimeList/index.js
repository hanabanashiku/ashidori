import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { DataGrid } from "@mui/x-data-grid";
import LoadingOverlay from "./LoadingOverlay";
import { getApiInstance } from "../../providers/builder";
import buildColumns from "./columns";
import { LIST_STATUS } from "../../enums";

const DEFAULT_PAGE_SIZE = 25;

const AnimeList = ({ status, hide }) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [apiState, setApiState] = useState("loading");
  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    setApiState("loading");
    (async () => {
      const api = await getApiInstance();
      try {
        const data = await api.getAnimeListByStatus(status, page, pageSize);
        setApiState("done");
        setItems(data.data);
        setItemCount(data.total);
      } catch {
        setApiState("error");
      }
    })();
  }, [page, pageSize, status, setItems, setPage, setApiState]);

  const columns = useMemo(() => buildColumns(status), [status]);

  /**
   *
   * @param {LibraryEntry} item
   * @returns
   */
  const buildRow = (item) => {
    return {
      id: item.id,
      title: item.anime.title,
      episodeCount: item.anime.episodeCount,
      progress: `${item.progress}/${item.anime?.episodeCount}`,
      startSeason: item.anime.startSeason,
      rating: `${item.rating}`,
    };
  };
  const rows = items.map((item) => buildRow(item));

  if (hide) {
    return null;
  }

  // TODO
  // Add an argument for the number of rows so there aren't scrollbars
  // Sorting based on hidden columns? ideally last updated
  // Make the cells look prettier
  return (
    <DataGrid
      css={css`
        border: none;
        margin: 0 -4px;
      `}
      loading={apiState === "loading"}
      columns={columns}
      rows={rows}
      rowCount={itemCount}
      pageSize={pageSize}
      onPageSizeChange={(size) => setPageSize(size)}
      paginationMode="server"
      onPageChange={(p) => setPage(p)}
      page={page}
      rowsPerPageOptions={[10, 25, 30, 50, 100]}
      disableSelectionOnClick
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
