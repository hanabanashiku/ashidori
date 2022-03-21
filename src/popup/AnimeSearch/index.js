import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Box, Stack, Button, TextField } from "@mui/material";
import { Search as SearchIcon, ChevronLeft } from "@mui/icons-material";
import SearchResults from "./SearchResults";
import ApiProvider from "../../providers/ApiProvider";

const AnimeSearch = ({ api, toggleSearch, showAnime }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [page, setPage] = useState(0);

  function cacheState(q, p) {
    window.sessionStorage.setItem("search_query", q);
    window.sessionStorage.setItem("search_page", p);
  }

  function onBack() {
    cacheState("", 0);
    toggleSearch();
  }

  useEffect(() => {
    const q = window.sessionStorage.getItem("search_query");
    const p = window.sessionStorage.getItem("search_page");

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

    const timeoutId = setTimeout(() => {
      (async () => {
        try {
          setLoading(true);
          const data = await api.findAnime(query, page, 20);
          setResults(data);
        } catch {
          setResults("error");
        } finally {
          setLoading(false);
        }
      })();
    }, 1000);
    return () => clearTimeout(timeoutId);
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
            padding-right: 16px;
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
              cacheState(e.target.value, 0);
            }}
            css={css`
              flex-grow: 1;
            `}
          />
        </Box>
      </Stack>
      <SearchResults
        results={results}
        showAnime={showAnime}
        page={page}
        setPage={(value) => {
          setPage(value);
          cacheState(query, value);
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
