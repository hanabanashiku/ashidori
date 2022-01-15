import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import AnimeList from "./AnimeList";
import { LIST_STATUS } from "../enums";

export const TABS = {
  ...LIST_STATUS,
};

const ListTabs = () => {
  const [value, setValue] = useState(TABS.CURRENT);

  const tabProps = (tab) => ({
    hide: tab !== value,
  });

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
      <AnimeList
        {...tabProps(TABS.CURRENT)}
        status={LIST_STATUS.CURRENT}
      />
      <AnimeList
        {...tabProps(TABS.COMPLETED)}
        status={LIST_STATUS.COMPLETED}
      />
      <AnimeList
        {...tabProps(TABS.PLANNED)}
        status={LIST_STATUS.PLANNED}
      />
      <AnimeList
        {...tabProps(TABS.ON_HOLD)}
        status={LIST_STATUS.ON_HOLD}
      />
      <AnimeList
        {...tabProps(TABS.DROPPED)}
        status={LIST_STATUS.DROPPED}
      />
    </>
  );
};

export default ListTabs;
