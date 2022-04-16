/* istanbul ignore file */
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getApiInstance } from "../providers/builder";
import AnimeDetail from "./AnimeDetail";

function Popup() {
  const [api, setApi] = useState(null);
  const id = new URLSearchParams(window.location.search).get("id");

  useEffect(() => {
    (async () => {
      const api = await getApiInstance();
      // Wait for data to arrive
      setTimeout(() => setApi(api), 200);
    })();
  }, []);

  function close() {
    window.open("", "_self").close();
  }

  if (!api) {
    return null;
  }
  return <AnimeDetail selectedAnime={id} close={close} api={api} />;
}

const root = document.getElementById("root");

ReactDOM.render(<Popup />, root);
