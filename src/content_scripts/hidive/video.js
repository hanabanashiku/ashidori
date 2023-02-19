import React from 'react';
import ReactDOM from 'react-dom';
import browser from 'webextension-polyfill';
import $ from 'jquery';
import Settings from '../../options/Settings';
import { getApiInstance } from '../../providers/builder';
import { waitForElm } from '../common';
import { SERVICES } from '../../enums';
import MESSAGE_TYPES from '../../messageTypes';
import AnimeEpisode from '../../models/AnimeEpisode';
import AnimeSeries from '../../models/AnimeSeries';
import AnimeSeason from '../../models/AnimeSeason';
import ListDisplay from './ListDisplay';

let episodeData;
let loadTime;
let userData;
let listEntry;

Settings.getEnabledServices().then((enabledServices) => {
    if (!enabledServices.includes(SERVICES.HIDIVE)) {
        return;
    }

    waitForElm('.rmp-duration').then(init);
});

function init() {
    loadTime = new Date();
    let api;

    episodeData = buildEpisodeMetadata();

    getApiInstance()
        .then((value) => {
            api = value;
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
                },
            });

            insertListDisplay(listEntry, api, userData);
        });
}

function buildEpisodeMetadata() {
    const path = window.location.pathname.split('/');
    const desc = $('div#StreamTitleDescription > h2:nth-child(1)')
        .text()
        .split(/\s*\|\s*/);
    const [, episode] = /episode\s*(\d+)/gi.exec(desc);
    const seasonDesc = $('div.episodes > h2')
        .text()
        .split(/\s*\|\s*/);
    const season = parseInt(/(\d+)/.exec(seasonDesc[0])[1]);

    return new AnimeEpisode({
        _id: path.at(-1),
        _title: $('div#StreamTitleDescription > h2:nth-child(2)').text().trim(),
        _description: $('div#StreamTitleDescription > p')
            .text()
            .trim()
            .replace(/[\r\n]+/gm, '')
            .replace(/\s{2,}/g, ' '),
        _number: parseInt(episode),
        _duration: parseInt($('div.rmp-duration').text().split(':')[0]),
        _series: new AnimeSeries({
            _id: path.at(-2),
            _title: $('a#TitleDetails').text().trim(),
            _englishTitle: $('a#TitleDetails').text().trim(),
            _seasonCount: $('li.seasonTab').filter((el) =>
                /season \d+$/i.test(el.textContent)
            ).length,
        }),
        _season: new AnimeSeason({
            _name: $('li.seasonTab.active')?.text().trim() ?? seasonDesc[0],
            _number: season,
        }),
    });
}

function insertListDisplay(libraryEntry, api, userData) {
    $('div#StreamTitleDescription').after('<div id="ashidori-root" />');

    ReactDOM.render(
        <ListDisplay
            libraryEntry={libraryEntry}
            api={api}
            userData={userData}
        />,
        $('div#ashidori-root').get(0)
    );
}
