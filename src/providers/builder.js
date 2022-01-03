import ApiProvider from "./ApiProvider";
import KitsuProvider from "./KitsuProvider";
import { PROVIDERS } from "../enums";

let instance = null;

/**
 * Get the current instance of the api provider, or build a new one.
 * @returns {ApiProvider} The provider instance.
 */
function buildApiInstance(provider) {
  switch (provider) {
    case PROVIDERS.KITSU:
      return new KitsuProvider();

    case PROVIDERS.UNSELECTED:
    default:
      return null;
  }
}

/**
 * Gets the current api instance or returns a new one.
 * @returns {ApiProvider} The provider instance.
 */
export const getApiInstance = async () => {
  if (instance) {
    return instance;
  }

  const provider = ApiProvider.getSelectedProvider();
  instance = buildApiInstance(await provider);

  return instance;
};

export const resetApiInstance = () => {
  instance = null;
};

/**
 * Creates a new api instance.
 * @param {number} provider The provider type.
 * @returns {ApiProvider} The requested api provider.
 */
export const createApiInstance = (provider) => {
  instance = buildApiInstance(provider);
  return instance;
};
