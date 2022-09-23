import browser from 'webextension-polyfill';
import Settings from "../../options/Settings";
import NetflixService from "../../services/Netflix";
import { getApiInstance } from '../../providers/builder';
import { waitForElm } from '../common';
import { SERVICES } from "../../enums";
import MESSAGE_TYPES from "../../messageTypes";

let episodeData;
let loadTime;
let userData;
let listEntry;

Settings.getEnabledServices().then((enabledServices) => {
  if (!enabledServices.includes(SERVICES.NETFLIX)) {
    return;
  }

  init();

  // unload if the user clicks a link in the SPA
  browser.runtime.onMessage.addListener((message) => {
    if (message.type !== MESSAGE_TYPES.HISTORY_STATE_UPDATED) {
      return false;
    }

    onUnload();
    resetPage();

    if (message.payload.url.includes("https://www.netflix.com/watch/")) {
      init();
    }
    return true;
  });
});

function injectScript() {
  const script = browser.runtime.getURL("static/scripts/inject_netflix.js");
  const scriptEl = document.createElement("script");
  scriptEl.setAttribute('src', script);
  scriptEl.setAttribute('type', 'text/javascript');
  scriptEl.onload = () => { document.body.removeChild(scriptEl); }
  document.body.appendChild(scriptEl);
}

function init() {
  loadTime = new Date();
  let api;
  getApiInstance()
  .then((value) => {
    api = value;
    injectScript();
    return waitForElm('input[name=ashidori-observer]');
  })
  .then((hiddenInput) => {
    const baseUrl = hiddenInput.getAttribute('value');
    document.body.removeChild(hiddenInput);

    const netflixService = new NetflixService(baseUrl);
    return netflixService.getEpisodeMetadata(getMovieId());
  })
  .then((episode) => {
    episodeData = episode;
    return api.getUserData();
  })
  .then((data) => {
    userData = data;
    return api.resolveLibraryEntryFromAnimeEpisode(episodeData);
  })
  .then((data) => {
    listEntry = data;
    browser.runtime.sendMessage({
      type: MESSAGE_TYPES.ANIME_EPISODE_STARTED,
      payload: {
        loadTime,
        userData,
        listEntry,
        episodeData,
      }
    });
  })
}

function onUnload() {
  // Tell the service worker to update the episode.
  if (listEntry && userData) {
    browser.runtime.sendMessage({
      type: MESSAGE_TYPES.UPDATE_EPISODE,
      payload: {
        episodeData,
        loadTime,
        userData,
        listEntry,
      },
    });
  }
}

function resetPage() {
  episodeData = null;
  loadTime = null;
  listEntry = null;
}

function getMovieId() {
  const regex = /https?:\/\/(?:www\.)?netflix.com\/watch\/(\d+)/;
  const groups = regex.exec(window.location.href);
  return parseInt(groups[1]);
}
