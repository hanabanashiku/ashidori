/* istanbul ignore file */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getApiInstance } from "../providers/builder";
import AnimeDetail from "./AnimeDetail";

function Popup() {
  const [api, setApi] = useState(null);
  const { id } = useParams();

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
    return <div>hello</div>;
  }
  return (
    <AnimeDetail
      selectedAnime={id}
      isListEntryId
      close={close}
      api={api}
      isPopup={false}
    />
  );
}

export default Popup;
