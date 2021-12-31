import axios from "axios";
import ApiProvider from "./ApiProvider";
import PROVIDERS from './providers';

const KITSU_BASE_URL = "https://kitsu.io/api/edge";
const KITSU_AUTH_URL = "https://kitsu.io/api/oauth";

export default class KitsuProvider extends ApiProvider {
    constructor() {
        this.#client = axios.create({
            baseURL: KITSU_BASE_URL,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json'
            }
        });
        this._setProvider(PROVIDERS.KITSU);
    }

    async authorize(username, password) {
        const params = new URLSearchParams();
        params.append('grant_type', 'password');
        params.append('username', username);
        params.append('password', password);
        params.append('scope', '');
        
        try {
            const response = await axios.post(`${KITSU_AUTH_URL}/token`, params);
            await this.#setTokenResponse(response);
            return true;
        }
        catch(e) {
            throw "Unable to authenticate. Check username/password";
        }
    }

    async refresh() {
        const token = this.refreshToken;
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', await token);

        try {
            const response = await axios.post(`${KITSU_AUTH_URL}/token`, params);
            await this.#setTokenResponse(response);
            return true;
        }
        catch {
            throw "Unable to authenticate. Check refresh token.";
        }
    }

    async #setTokenResponse(response) {
        this._setAuthToken(response.data["access_token"], response.data["created_at"] + response.data["expires_in"]);
        this._setRefreshToken(response.data["refresh_token"]);
    }
};