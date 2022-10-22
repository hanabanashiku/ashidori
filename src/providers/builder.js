import ApiProvider from './ApiProvider'
import MyAnimeListProvider from './MyAnimeListProvider'
import KitsuProvider from './KitsuProvider'
import { PROVIDERS } from '../enums'

let instance = null

/**
 * Get the current instance of the api provider, or build a new one.
 * @returns {ApiProvider} The provider instance.
 */
function buildApiInstance(provider) {
    switch (provider) {
        case PROVIDERS.MY_ANIME_LIST:
            return new MyAnimeListProvider()
        case PROVIDERS.KITSU:
            return new KitsuProvider()

        case PROVIDERS.UNSELECTED:
        default:
            return null
    }
}

/**
 * Gets the current api instance or returns a new one.
 * @returns {Promise<ApiProvider>} The provider instance.
 */
export async function getApiInstance() {
    if (instance) {
        return instance
    }

    const provider = ApiProvider.getSelectedProvider()
    return createApiInstance(await provider)
}

export function resetApiInstance() {
    instance = null
}

/**
 * Creates a new api instance.
 * @param {number} provider The provider type.
 * @returns {ApiProvider} The requested api provider.
 */
export function createApiInstance(provider) {
    instance = buildApiInstance(provider)
    return instance
}
