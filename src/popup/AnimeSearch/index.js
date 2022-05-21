import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { css } from "@emotion/react";
import { Box, Stack, Button, TextField } from "@mui/material";
import { Search as SearchIcon, ChevronLeft } from "@mui/icons-material";
import SearchResults from "./SearchResults";
import ApiProvider from "../../providers/ApiProvider";
import {
  resetSearchPage,
  cacheSearchPage,
  getCachedSearchPage,
} from "../../helpers/storageHelpers";

const AnimeSearch = ({ api, toggleSearch, showAnime }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [page, setPage] = useState(0);

  function onBack() {
    resetSearchPage();
    toggleSearch();
  }

  const search = useMemo(
    () =>
      _.throttle(async (text, page) => {
        try {
          setLoading(true);
          const data = await api.findAnime(text, page, 20);
          setResults(data);
        } catch {
          setResults("error");
        } finally {
          setLoading(false);
        }
      }, 500),
    []
  );

  // restore state between popup clicks
  useEffect(() => {
    const [q, p] = getCachedSearchPage();

    if (q) {
      setQuery(q);
    }
    if (p) {
      setPage(parseInt(p));
    }
  }, []);

  useEffect(() => {
    if (query === "") {
      return;
    }

    search(query, page);
  }, [query, page]);

  return (
    <Box>
      <Stack direction="row" spacing={1}>
        <Button
          variant="text"
          startIcon={<ChevronLeft />}
          onClick={onBack}
          css={css`
            padding-top: 20px;
          `}
        >
          Back
        </Button>
        <Box
          css={css`
            display: flex;
            align-items: flex-end;
            flex-grow: 1;
            padding-right: 36px;
          `}
        >
          <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            label="Search"
            variant="standard"
            value={query}
            onChange={(e) => {
              setPage(0);
              setQuery(e.target.value);
              cacheSearchPage(e.target.value, 0);
            }}
            css={css`
              flex-grow: 1;
            `}
            autoFocus
          />
        </Box>
      </Stack>
      <SearchResults
        results={results}
        showAnime={showAnime}
        page={page}
        setPage={(value) => {
          setPage(value);
          cacheSearchPage(query, value);
        }}
        loading={loading}
      />
    </Box>
  );
};
AnimeSearch.propTypes = {
  api: PropTypes.instanceOf(ApiProvider).isRequired,
  toggleSearch: PropTypes.func.isRequired,
  showAnime: PropTypes.func.isRequired,
};

export default AnimeSearch;
