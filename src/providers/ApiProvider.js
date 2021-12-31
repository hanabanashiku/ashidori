import PROVIDERS from './providers';

export default class ApiProvider {
    /**
     * @returns {Promise<number>} The selected provider.
     * @see providers enum
     */
    async get selectedProvider() {
        const result = await browser.storage.local.get({'selected_provider': PROVIDERS.UNSELECTED});
        return result['selected_provider'];
    };

    /**
     * Authorize with the API.
     * @param username {string} The username to use.
     * @param password {string} The password to use.
     * @returns {bool} True on success.
     */
    authorize() {
        throw 'Not Implemented';
    }

    /**
     * Refreshes the bearer token using the token saved in storage.
     * @returns {bool} True on success.
     * @throws
     */
    refresh() {
        throw 'Not Implemented';
    }

    /**
     * @returns {Promise<string>} The bearer token used to authenticate.
     */
     async get authToken() {
        const result = await browser.storage.local.get({ 'access_token': null });
        return result['access_token'];
    }   
    


    /**
     * @returns {Promise<string>} The current refresh token.
     */
    async get refreshToken() {
        const result = await browser.storage.local.get({ 'refresh_token': null });
        return result['refresh_token'];
    }

    /**
     * Sets the api provider to use.
     * @param {number} provider The provider from the providers enum.
     * @see providers enum.
     */
    async _setProvider(provider) {
        await browser.storage.local.set('selected_provider', provider);
    };

    /**
     * Sets the auth token data to local storage.
     * @param {string} token The auth token to set.
     * @param {number} expirationTick The time, in ticks, when the token will expire and need to be refreshed.
     */
    async _setAuthToken(token, expirationTick) {
        await browser.storage.local.set({
            'access_token': token,
            'access_token_expires_on': expirationTick,
        });
    }
        
    /**
     * Sets the refresh token to local storage.
     * @param {string} token The refresh token to set.
     */
    async set _setRefreshToken(token) {
        await browser.storage.local.set('refresh_token', token);
    }
};