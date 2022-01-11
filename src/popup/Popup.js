import React, { useEffect, useState } from "react";
import { getApiInstance } from "../providers/builder";
import Header from "./Header";
import LogInNotice from "./LogInNotice";

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
      return null;
    }

    if (!authState) {
      return <LogInNotice />;
    }

    return "Logged in";
  };

  return (
    <>
      <Header />
      <Body />
    </>
  );
};

export default Popup;
