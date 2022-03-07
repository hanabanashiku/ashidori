import React from "react";
import ReactDOM from "react-dom";
import browser from "webextension-polyfill";
import $ from "jquery";
import { showCurrentWatchingAlertOnPopup } from "../../helpers/storageHelpers";
import ListDisplay from "./ListDisplay";
import Settings from "../../options/Settings";
import CrunchyrollService from "../../services/Crunchyroll";
import { getApiInstance } from "../../providers/builder";
import { SERVICES } from "../../enums";
import MESSAGE_TYPES from "../../messageTypes";

let episodeData;
let loadTime;
let userData;
let listEntry;

Settings.getEnabledServices().then((enabledServices) => {
  if (!enabledServices.includes(SERVICES.CRUNCHYROLL)) {
    return;
  }

  init();

  // unload if the user clicks a link in the Crunchyroll SPA
  browser.runtime.onMessage.addListener((message) => {
    if (message.type !== MESSAGE_TYPES.HISTORY_STATE_UPDATED) {
      return false;
    }

    onUnload();

    if (message.payload.url.includes("https://beta.crunchyroll.com/watch")) {
      init();
    }
    return true;
  });
  // todo fix this scenario - unload if the user closes the tab
  $(window).on("beforeunload", () => {
    onUnload();
  });
});

function init() {
  loadTime = new Date();
  let api;

  getApiInstance()
    .then((value) => {
      api = value;
      return getEpisodeData();
    })
    .then((data) => {
      episodeData = data;
      return api.getUserData();
    })
    .then((data) => {
      userData = data;
      return api.resolveLibraryEntryFromAnimeEpisode(episodeData);
    })
    .then((data) => {
      listEntry = data;
      showCurrentWatchingAlertOnPopup(listEntry, episodeData);
      renderListDisplay(listEntry, api);
    });
}

function renderListDisplay(listEntry, api) {
  if (!listEntry || !api) {
    return;
  }
  const container = $("<div/>", {
    id: "ashidori-list-info",
  }).appendTo(".erc-current-media-info");

  ReactDOM.render(
    <ListDisplay libraryEntry={listEntry} api={api} userData={userData} />,
    container[0]
  );
}

async function onUnload() {
  let promise;
  if (!listEntry || !userData) {
    promise = browser.runtime.sendMessage({
      type: MESSAGE_TYPES.CLEAR_NOW_WATCHING,
    });
  }

  // Tell the service worker to update the episode.
  else {
    promise = browser.runtime.sendMessage({
      type: MESSAGE_TYPES.UPDATE_EPISODE,
      payload: {
        episodeData,
        loadTime,
        userData,
        listEntry,
      },
    });
  }

  episodeData = null;
  loadTime = null;
  listEntry = null;
  $("#ashidori-list-info").remove();
  return promise;
}

async function getEpisodeData() {
  const episodeId = /watch\/(.+?)\/.+/g.exec(window.location.href)[1];
  var client = new CrunchyrollService();
  await client.authenticate();
  return client.getEpisodeData(episodeId);
}
