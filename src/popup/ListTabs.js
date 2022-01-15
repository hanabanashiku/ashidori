import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@mui/material";
import Loading from "./Loading";
import { getApiInstance } from "../providers/builder";
import { LIST_STATUS } from "../enums";

export const TABS = {
  ...LIST_STATUS,
};

const ListTabs = () => {
  const [value, setValue] = useState(TABS.CURRENT);
  const [list, setList] = useState(null);

  useEffect(() => {
    (async () => {
      const api = await getApiInstance();
      if (!api) return;
      try {
        const result = await api.getAnimeList();
        setList(result);
      } catch (e) {
        setList("error");
      }
    })();
  }, []);

  if (!list) {
    return <Loading />;
  }

  if (list === "error") {
    return "An error occurred";
  }

  return (
    <>
      <Tabs
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
        variant="scrollable"
        scrollButtons
      >
        <Tab value={TABS.CURRENT} label="Watching" />
        <Tab value={TABS.COMPLETED} label="Completed" />
        <Tab value={TABS.PLANNED} label="Planned" />
        <Tab value={TABS.ON_HOLD} label="On hold" />
        <Tab value={TABS.DROPPED} label="Dropped" />
      </Tabs>
    </>
  );
};

export default ListTabs;
