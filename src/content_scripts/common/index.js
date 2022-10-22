import browser from 'webextension-polyfill';
import MESSAGE_TYPES from '../../messageTypes';

export function waitForElm(selector) {
    return new Promise((resolve) => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(() => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    });
}

export async function onOpenDetail(libraryEntry) {
    return browser.runtime.sendMessage({
        type: MESSAGE_TYPES.SHOW_ANIME_DETAIL_POPUP,
        payload: {
            libraryEntryId: libraryEntry.id,
        },
    });
}
