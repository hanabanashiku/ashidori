import browser from 'webextension-polyfill';
import util from 'util';
import Settings from '../options/Settings';
import MESSAGE_TYPES from '../messageTypes';
import { getApiInstance } from '../providers/builder';
import {
    sendNotification,
    getBrowserType,
    sendNotificationWithClick,
    openLink,
} from '../helpers/extensionHelpers';
import {
    showCurrentWatchingAlertOnPopup,
    resetCurrentWatchingAlert,
} from '../helpers/storageHelpers';
import UserData from '../models/UserData';
import AnimeEpisode from '../models/AnimeEpisode';
import LibraryEntry from '../models/LibraryEntry';
import lang from '../lang';
import { LIST_STATUS, PROVIDER_NAMES, BROWSER } from '../enums';

browser.runtime.onMessage.addListener(onEpisodeStarted);
browser.runtime.onMessage.addListener(onUpdateRequest);

/**
 * Event handler when the user first opens an anime episode.
 * @param {object} message The message payload.
 * @param {browser.runtime.MessageSender} sender The message sender.
 */
async function onEpisodeStarted(message, sender) {
    if (message.type !== MESSAGE_TYPES.ANIME_EPISODE_STARTED) {
        return;
    }

    const episodeTab = sender.tab.id;
    const loadTime = message.payload.loadTime;
    const userData = new UserData(message.payload.userData);
    const episodeData = new AnimeEpisode(message.payload.episodeData);
    const listEntry = new LibraryEntry(message.payload.listEntry);
    let episodeUrl = (await browser.tabs.get(episodeTab)).url;

    showCurrentWatchingAlertOnPopup(listEntry, episodeData);

    // register event to update the list when the tab is closed or the url is changed
    async function onTabClose(tabId) {
        if (tabId !== episodeTab) {
            return;
        }

        browser.tabs.onRemoved.removeListener(onTabClose);
        browser.tabs.onUpdated.removeListener(onTabUpdated);
        return startUpdate(loadTime, userData, episodeData, listEntry);
    }

    async function onTabUpdated(tabId) {
        const tabUrl = (await browser.tabs.get(tabId)).url;

        if (
            tabId !== episodeTab ||
            (await browser.tabs.get(tabId)).url === episodeUrl
        ) {
            return;
        }

        // Fixes bug that causes the popup to show multiple times
        episodeUrl = tabUrl;

        browser.tabs.onRemoved.removeListener(onTabClose);
        browser.tabs.onUpdated.removeListener(onTabUpdated);
        return startUpdate(loadTime, userData, episodeData, listEntry);
    }

    browser.tabs.onRemoved.addListener(onTabClose);
    browser.tabs.onUpdated.addListener(onTabUpdated);

    const currentTabs =
        (await browser.storage.local.get('CURRENT_TABS').CURRENT_TABS) ?? {};
    currentTabs[sender.tab.id] = {
        episodeData,
        listener: onTabClose,
    };
    await browser.storage.local.set({ CURRENT_TABS: currentTabs });
}

/**
 * Event handler when the the content script sends a request to update (e.g. from a SPA page)
 * @param {object} message The message payload.
 * @param {browser.runtime.MessageSender} sender The message sender.
 */
function onUpdateRequest(message, sender) {
    if (message.type !== MESSAGE_TYPES.UPDATE_EPISODE) {
        return false;
    }

    const loadTime = message.payload.loadTime;
    const userData = new UserData(message.payload.userData);
    const episodeData = new AnimeEpisode(message.payload.episodeData);
    const listEntry = new LibraryEntry(message.payload.listEntry);

    removeTabOnRemovedHook(sender.tab.id);
    startUpdate(loadTime, userData, episodeData, listEntry);
}

/**
 * Begin updating the anime episode.
 * @param {Date} loadTime The time at which the user began watching.
 * @param {UserData} userData Data about the user.
 * @param {EpisodeData} episodeData Episode data extracted from the video page.
 * @param {LibraryEntry} listEntry The current library entry record to update.
 * @returns {Promise<void>}
 */
async function startUpdate(loadTime, userData, episodeData, listEntry) {
    resetCurrentWatchingAlert();
    const shouldUpdate = await canUpdateAsync(loadTime, listEntry, episodeData);
    if (!shouldUpdate) {
        return;
    }

    const shouldShowUpdatePopup =
        listEntry.status === LIST_STATUS.NOT_WATCHING
            ? await Settings.shouldShowAddPopup()
            : await Settings.shouldShowUpdatePopup();

    if (shouldShowUpdatePopup) {
        await showUpdatePopupAsync(episodeData, listEntry, userData);
    } else {
        await updateAnimeAsync(episodeData, listEntry, userData);
    }
}

/**
 * Check if the current episode can be updated
 * @param {Date} loadTime The time at which the user began watching.
 * @param {LibraryEntry} listEntry The current library entry record to update.
 * @param {EpisodeData} episodeData Episode data extracted from the video page.
 * @returns {Promise<boolean>} True if the list can be updated.
 */
async function canUpdateAsync(loadTime, listEntry, episodeData) {
    if (!(await Settings.listUpdatingEnabled())) {
        return false;
    }

    const delayInMinutes = await Settings.shouldUpdateAfterMinutes();
    const meetsDelay =
        new Date() - new Date(loadTime) > delayInMinutes * 60 * 1000;

    const isValidStatus = [
        LIST_STATUS.NOT_WATCHING,
        LIST_STATUS.CURRENT,
        LIST_STATUS.ON_HOLD,
        LIST_STATUS.PLANNED,
    ].includes(listEntry.status);
    const isValidEpisodeNumber = episodeData.number > listEntry.progress;

    return meetsDelay && isValidStatus && isValidEpisodeNumber;
}

/**
 * Shows a push notification requesting the user to confirm the update.
 * @param {EpisodeData} episodeData Episode data extracted from the video page.
 * @param {LibraryEntry} listEntry The current library entry record to update.
 * @param {UserData} userData Data about the user.
 * @returns {Promise<void>}
 */
async function showUpdatePopupAsync(episodeData, listEntry, userData) {
    switch (getBrowserType()) {
        case BROWSER.FIREFOX:
            return showUpdatePopupAsyncFirefox(
                episodeData,
                listEntry,
                userData
            );
        case BROWSER.CHROMIUM:
            return showUpdatePopupAsyncChrome(episodeData, listEntry, userData);
    }
}

async function showUpdatePopupAsyncChrome(episodeData, listEntry, userData) {
    function listener(buttonIndex) {
        if (buttonIndex !== 0) {
            // Clicked no
            return;
        }

        updateAnimeAsync(episodeData, listEntry, userData);
    }

    const body =
        listEntry.status === LIST_STATUS.NOT_WATCHING
            ? lang.newAnimeEpisodeCompletedPopupBody
            : lang.episodeCompletedPopupBody;

    await sendNotification(
        lang.episodeCompletedPopupTitle,
        util.format(
            body,
            episodeData.number,
            listEntry.anime.title,
            userData.username
        ),
        [
            {
                title: lang.update,
            },
            {
                title: lang.noThanks,
            },
        ],
        listener
    );
}

async function showUpdatePopupAsyncFirefox(episodeData, listEntry, userData) {
    function listener() {
        updateAnimeAsync(episodeData, listEntry, userData);
    }

    const body =
        listEntry.status === LIST_STATUS.NOT_WATCHING
            ? lang.newAnimeEpisodeCompletedPopupClickBody
            : lang.episodeCompletedPopupClickBody;

    await sendNotificationWithClick(
        lang.episodeCompletedPopupTitle,
        util.format(
            body,
            episodeData.number,
            listEntry.anime.title,
            userData.username
        ),
        listener
    );
}

/**
 * Shows a push notification to tell the user that the anime was updated successfully.
 * @param {LibraryEntry} listEntry The current library entry record to update.
 * @param {EpisodeData} episodeData Episode data extracted from the video page.
 * @param {UserData} userData Data about the user.
 * @param {boolean} isCompleted Whether the user finished watching the series.
 * @returns {Promise<void>}
 */
async function showUpdatedPopupAsync(
    listEntry,
    episodeData,
    userData,
    isComplete
) {
    let message;

    if (isComplete) {
        message = util.format(
            lang.episodeUpdatedCompleteBody,
            listEntry.anime.title
        );
    } else if (listEntry.status === LIST_STATUS.NOT_WATCHING) {
        message = util.format(
            lang.episodeUpdatedNewBody,
            listEntry.anime.title
        );
    } else if (
        listEntry.status === LIST_STATUS.ON_HOLD ||
        listEntry.status === LIST_STATUS.PLANNED ||
        listEntry.status == LIST_STATUS.DROPPED
    ) {
        message = util.format(
            lang.episodeUpdatedCurrentBody,
            listEntry.anime.title
        );
    } else {
        message = util.format(
            lang.episodeUpdatedPopupBody,
            listEntry.anime.title,
            episodeData.number
        );
    }

    switch (getBrowserType()) {
        case BROWSER.CHROMIUM:
            return sendNotification(
                lang.episodeUpdatedPopupTitle,
                message,
                [
                    {
                        title: util.format(
                            lang.seeAnime,
                            PROVIDER_NAMES[userData.apiSource]
                        ),
                    },
                    {
                        title: lang.undo,
                    },
                ],
                (buttonIndex) => {
                    switch (buttonIndex) {
                        case 0:
                            return openAnimePage(listEntry);

                        case 1:
                            return revertAnimeAsync(listEntry, userData);

                        default:
                            return Promise.reject('Invalid button');
                    }
                }
            );

        case BROWSER.FIREFOX:
            return sendNotificationWithClick(
                lang.episodeUpdatedPopupTitle,
                message,
                () => openAnimePage(listEntry)
            );
    }
}

/**
 * Shows a push notification to tell the user that the anime was not able to be updated.
 * @param {LibraryEntry} listEntry The current library entry record to update.
 * @param {UserData} userData Data about the user.
 * @returns {Promise<void>}
 */
async function showErrorPopupAsync(listEntry, userData) {
    function listener() {
        return openAnimePage(listEntry);
    }

    switch (getBrowserType()) {
        case BROWSER.CHROMIUM:
            return sendNotification(
                lang.errorOccurredTitle,
                lang.errorOccurredOnUpdateBody,
                [
                    {
                        title: util.format(
                            lang.seeAnime,
                            PROVIDER_NAMES[userData.apiSource]
                        ),
                    },
                ],
                listener
            );

        case BROWSER.FIREFOX:
            return sendNotificationWithClick(
                lang.errorOccurredTitle,
                lang.errorOccurredOnUpdateBody,
                listener
            );
    }
}

/**
 * Shows a push notification to tell the user that the anime was not able to be updated.
 * @param {LibraryEntry} listEntry The current library entry record to update.
 * @returns {Promise<void>}
 */
async function showRevertedPopupAsync(listEntry) {
    return sendNotification(
        lang.episodeUpdatedPopupTitle,
        util.format(lang.episodeRevertedPopupBody, listEntry.anime.title)
    );
}

/**
 * Updates the list entry to the current episode.
 * @param {EpisodeData} episodeData Episode data extracted from the video page.
 * @param {LibraryEntry} listEntry The current library entry record to update.
 * @param {UserData} userData Data about the user.
 * @returns {Promise<void>}
 */
async function updateAnimeAsync(episodeData, listEntry, userData) {
    const api = await getApiInstance();
    if (!api) {
        return;
    }

    let episode = episodeData.number;
    let lastEpisode = listEntry.anime.episodeCount;
    let isComplete = lastEpisode && episode === lastEpisode;

    let patch = {
        progress: episode,
    };

    if (
        [LIST_STATUS.NOT_WATCHING, LIST_STATUS.PLANNED].includes(
            listEntry.status
        )
    ) {
        patch = {
            ...patch,
            status: LIST_STATUS.CURRENT,
            startedAt: new Date(),
        };
    } else if (listEntry.status === LIST_STATUS.ON_HOLD) {
        patch = {
            ...patch,
            status: LIST_STATUS.CURRENT,
        };
    }

    if (isComplete) {
        patch = {
            ...patch,
            status: LIST_STATUS.COMPLETED,
        };

        if (listEntry.rewatchCount > 0 || listEntry.completedDate) {
            patch.rewatchCount = listEntry.rewatchCount + 1;
        } else {
            patch.finishedAt = new Date();
        }
    }

    try {
        if (listEntry.status === LIST_STATUS.NOT_WATCHING) {
            const createdId = await api.createLibraryItem(
                listEntry.anime.id,
                patch
            );
            listEntry.updateId(createdId);
        } else {
            await api.updateLibraryItem(listEntry.id, patch);
        }
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        await showErrorPopupAsync(listEntry, userData);
        return;
    }

    showUpdatedPopupAsync(listEntry, episodeData, userData, isComplete);
}

/**
 * Reverts the list entry to the previous state.
 * @param {LibraryEntry} listEntry The current library entry record to update.
 * @param {UserData} userData Data about the user.
 * @returns {Promise<void>}
 */
async function revertAnimeAsync(listEntry, userData) {
    const api = await getApiInstance();

    if (!api) {
        return;
    }

    try {
        if (listEntry.status === LIST_STATUS.NOT_WATCHING) {
            await api.removeLibraryItem(listEntry.id);
        } else {
            const patch = {
                progress: listEntry.progress,
                status: listEntry.status,
                finishedAt: listEntry.completedDate,
                rewatchCount: listEntry.rewatchCount,
            };
            await api.updateLibraryItem(listEntry.id, patch);
        }
    } catch {
        return showErrorPopupAsync(listEntry, userData);
    }

    return showRevertedPopupAsync(listEntry);
}

async function openAnimePage(listEntry) {
    return openLink(listEntry.anime.externalLink);
}

/**
 * Removes the onRemoved tab listener for a closed anime episode.
 * @param {number} tabId The id of the current tab
 */
async function removeTabOnRemovedHook(tabId) {
    const currentTabs = (await browser.storage.local.get('CURRENT_TABS'))
        .CURRENT_TABS;
    const data = currentTabs?.[tabId];
    if (!data) {
        return;
    }

    browser.tabs.onRemoved.removeListener(data.listener);
    delete currentTabs[tabId];
    await browser.storage.local.set({ CURRENT_TABS: currentTabs });
}
