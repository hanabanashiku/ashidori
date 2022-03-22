import React, { useEffect, useState } from "react";
import browser from "webextension-polyfill";
import { css } from "@emotion/react";
import { Box, CircularProgress } from "@mui/material";
import { getApiInstance } from "../providers/builder";
import Header from "./Header";
import LogInNotice from "./LogInNotice";
import AnimeDetail from "./AnimeDetail";
import ListTabs from "./ListTabs";
import AnimeSearch from "./AnimeSearch";
import MESSAGE_TYPES from "../messageTypes";

const Popup = () => {
  const [authState, setAuthState] = useState(null);
  const [selectedAnime, setSelectedAnime] = useState();
  const [search, setSearch] = useState(false);

  const [api, setApi] = useState(null);

  // Used to show an anime detail by clicking a button on a streaming video page.
  function onMessage(message) {
    if (message.type !== MESSAGE_TYPES.SHOW_ANIME_DETAIL) {
      return;
    }
    setSelectedAnime(message.payload.libraryEntryId);
  }

  function showAnime(id, isListEntry = true) {
    setSelectedAnime({ id, isListEntry });
  }

  function toggleSearch() {
    setSearch(!search);
  }

  useEffect(() => {
    browser.runtime.onMessage.addListener(onMessage);
  }, [onMessage]);

  useEffect(() => {
    (async () => {
      const apiInstance = await getApiInstance();
      setApi(apiInstance);
      if (!apiInstance) {
        setAuthState(false);
        return;
      }
      setAuthState(await apiInstance.isAuthenticated());
    })();
  }, [setAuthState, setApi]);

  const Body = () => {
    if (authState === null) {
      return (
        <Box
          css={css`
            display: flex;
            height: 100%;
            justify-content: center;
            align-items: center;
          `}
        >
          <CircularProgress />
        </Box>
      );
    }

    if (!authState) {
      return <LogInNotice />;
    }

    if (selectedAnime) {
      return (
        <AnimeDetail
          selectedAnime={selectedAnime?.id}
          api={api}
          isListEntryId={selectedAnime?.isListEntry}
          close={() => setSelectedAnime(null)}
        />
      );
    }

    if (search) {
      return (
        <AnimeSearch
          api={api}
          toggleSearch={toggleSearch}
          showAnime={showAnime}
        />
      );
    }

    return (
      <ListTabs showAnime={showAnime} api={api} toggleSearch={toggleSearch} />
    );
  };

  return (
    <>
      <Header />
      <Body />
    </>
  );
};

export default Popup;
