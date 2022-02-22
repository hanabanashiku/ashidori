import React, { useEffect, useState } from "react";
import browser from "webextension-polyfill";
import { CircularProgress } from "@mui/material";
import { getApiInstance } from "../providers/builder";
import Header from "./Header";
import LogInNotice from "./LogInNotice";
import AnimeDetail from "./AnimeDetail";
import ListTabs from "./ListTabs";
import MESSAGE_TYPES from "../messageTypes";

const Popup = () => {
  const [authState, setAuthState] = useState(null);
  const [selectedAnime, setSelectedAnime] = useState();
  const [api, setApi] = useState(null);

  // Used to show an anime detail by clicking a button on a streaming video page.
  function onMessage(message) {
    if (message.type !== MESSAGE_TYPES.SHOW_ANIME_DETAIL) {
      return;
    }
    setSelectedAnime(message.payload.libraryEntryId);
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
      return <CircularProgress />;
    }

    if (!authState) {
      return <LogInNotice />;
    }

    if (selectedAnime) {
      return (
        <AnimeDetail
          selectedAnime={selectedAnime}
          api={api}
          close={() => setSelectedAnime(null)}
        />
      );
    }

    return <ListTabs showAnime={(id) => setSelectedAnime(id)} api={api} />;
  };

  return (
    <>
      <Header />
      <Body />
    </>
  );
};

export default Popup;
