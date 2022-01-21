import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { DataGrid } from "@mui/x-data-grid";
import ApiProvider from "../../providers/ApiProvider";
import LoadingOverlay from "./LoadingOverlay";
import buildColumns from "./columns";
import { LIST_STATUS } from "../../enums";

const DEFAULT_PAGE_SIZE = 25;

const AnimeList = ({ status, hide, showAnime, api }) => {
  const [page, setPage] = useState(0);
  const [listRefresher, refreshList] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [apiState, setApiState] = useState("loading");
  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    setApiState("loading");
    (async () => {
      if (!api) {
        return;
      }

      try {
        const data = await api.getAnimeListByStatus(status, page, pageSize);
        setApiState("done");
        setItems(data.data);
        setItemCount(data.total);
      } catch {
        setApiState("error");
      }
    })();
  }, [
    api,
    page,
    pageSize,
    status,
    listRefresher,
    setItems,
    setPage,
    setApiState,
  ]);

  function refresh() {
    refreshList((v) => v + 1);
  }

  const columns = useMemo(() => buildColumns(status), [status]);

  /**
   *
   * @param {LibraryEntry} item
   * @returns
   */
  const buildRow = (item) => {
    const common = {
      id: item.id,
      api,
      refresh,
    };

    return {
      id: item.id,
      title: item.anime.title,
      episodeCount: item.anime.episodeCount,
      progress: {
        ...common,
        current: item.progress,
        total: item.anime.episodeCount,
      },
      startSeason: item.anime.startSeason,
      rating: {
        ...common,
        rating: item.rating,
      },
    };
  };
  const rows = items.map((item) => buildRow(item));

  if (hide) {
    return null;
  }

  // TODO
  // Sorting based on hidden columns? ideally last updated
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
      onRowClick={(row) => showAnime(row.id)}
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
  showAnime: PropTypes.func.isRequired,
  api: PropTypes.instanceOf(ApiProvider).isRequired,
};

export default AnimeList;
