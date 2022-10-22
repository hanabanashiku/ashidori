import browser from 'webextension-polyfill'
import { SERVICES } from '../enums'

export function getVideoScript(service) {
    const manifest = browser.runtime.getManifest()
    switch (service) {
        case SERVICES.CRUNCHYROLL:
            return manifest.content_scripts.find((cs) =>
                cs.matches.includes('*://beta.crunchyroll.com/watch/**')
            ).js
        default:
            return ''
    }
}
