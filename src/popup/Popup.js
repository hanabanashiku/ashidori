import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { getApiInstance } from "../providers/builder";
import Header from "./Header";
import LogInNotice from "./LogInNotice";
import ListTabs from './ListTabs';

const Popup = () => {
  const [authState, setAuthState] = useState(null);

  useEffect(() => {
    getApiInstance().then(async (api) => {
      if (!api) {
        setAuthState(false);
        return;
      }

      setAuthState(await api.isAuthenticated());
    });
  }, [setAuthState]);

  const Body = () => {
    if (authState === null) {
      return <CircularProgress />;
    }

    if (!authState) {
      return <LogInNotice />;
    }

    return <ListTabs />;
  };

  return (
    <>
      <Header />
      <Body />
    </>
  );
};

export default Popup;
