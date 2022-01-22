import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { getApiInstance } from "../providers/builder";
import Header from "./Header";
import LogInNotice from "./LogInNotice";
import AnimeDetail from "./AnimeDetail";
import ListTabs from "./ListTabs";

const Popup = () => {
  const [authState, setAuthState] = useState(null);
  const [selectedAnime, setSelectedAnime] = useState();
  const [api, setApi] = useState(null);

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
