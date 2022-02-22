import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab } from "@mui/material";
import ApiProvider from "../providers/ApiProvider";
import AnimeList from "./AnimeList";
import CurrentAnimeDisplay from "./CurrentAnimeDisplay";
import { LIST_STATUS } from "../enums";
import lang from "lang";

export const TABS = {
  ...LIST_STATUS,
};

const ListTabs = ({ showAnime, api }) => {
  const [value, setValue] = useState(TABS.CURRENT);

  const tabProps = (tab) => ({
    hide: tab !== value,
    showAnime,
    api,
  });

  return (
    <>
      <CurrentAnimeDisplay showAnime={showAnime} />
      <Tabs
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
        variant="scrollable"
        scrollButtons
      >
        <Tab value={TABS.CURRENT} label={lang.watching} />
        <Tab value={TABS.COMPLETED} label={lang.completed} />
        <Tab value={TABS.PLANNED} label={lang.planned} />
        <Tab value={TABS.ON_HOLD} label={lang.onHold} />
        <Tab value={TABS.DROPPED} label={lang.dropped} />
      </Tabs>
      <AnimeList {...tabProps(TABS.CURRENT)} status={LIST_STATUS.CURRENT} />
      <AnimeList {...tabProps(TABS.COMPLETED)} status={LIST_STATUS.COMPLETED} />
      <AnimeList {...tabProps(TABS.PLANNED)} status={LIST_STATUS.PLANNED} />
      <AnimeList {...tabProps(TABS.ON_HOLD)} status={LIST_STATUS.ON_HOLD} />
      <AnimeList {...tabProps(TABS.DROPPED)} status={LIST_STATUS.DROPPED} />
    </>
  );
};
ListTabs.propTypes = {
  showAnime: PropTypes.func.isRequired,
  api: PropTypes.instanceOf(ApiProvider).isRequired,
};

export default ListTabs;
