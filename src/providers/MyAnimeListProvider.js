import browser from "webextension-polyfill";
import axios from "axios";
import ApiProvider from "./ApiProvider";
import { createApiInstance } from "./builder";
import Settings from "../options/Settings";
import UserData from "../models/UserData";
import { PROVIDERS, LIST_STATUS } from "../enums";
import { getHttpAdapter, generateRandomString } from "./helper";
import { openLink, getRootPath } from "../helpers/extensionHelpers";
import { getPkce, setPkce } from "../helpers/storageHelpers";

const MAL_BASE_URL = "https://api.myanimelist.net/v2";
const MAL_AUTH_URL = "https://myanimelist.net/v1/oauth2/authorize";
const MAL_TOKEN_URL = "https://myanimelist.net/v1/oauth2/token";
const CLIENT_ID = "e62f583191ca06e8a96bd8fc66769c09";

export default class MyAnimeListProvider extends ApiProvider {
  #client = null;
  #userId;

  constructor() {
    super();

    this.#client = axios.create({
      baseURL: MAL_BASE_URL,
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      },
      adapter: getHttpAdapter(),
    });
    this.#client.interceptors.request.use(async (config) => {
      return this._requestInterceptor(config);
    });
    this._setProvider(PROVIDERS.KITSU);

    this.getUserData().then((data) => {
      const userId = data?.id ?? null;
      this.#userId = userId;
    });
  }

  static async authorize() {
    const pkce = generateRandomString(128);
    await setPkce(pkce);
    let url = MAL_AUTH_URL;
    url += "?response_type=code";
    url += `&client_id=${CLIENT_ID}`;
    url += "&scope=write:users";
    url += `&redirect_uri=${browser.identity.getRedirectURL()}`;
    url += `&code_challenge=${pkce}`;
    url += "&code_challenge_method=plain";

    const href = await browser.identity.launchWebAuthFlow({
      interactive: true,
      url,
    });

    const api = createApiInstance(PROVIDERS.MY_ANIME_LIST);

    return api.authorizeCallback(href);
  }

  async authorizeCallback(href) {
    const recievedParams = new URLSearchParams(href.split("?")[1]);

    const params = new URLSearchParams();
    params.append("client_id", CLIENT_ID);
    params.append("code", recievedParams.get("code"));
    params.append("code_verifier", await getPkce());
    params.append("grant_type", "authorization_code");
    params.append("redirect_uri", browser.identity.getRedirectURL());

    let response;
    try {
      response = await axios.post(MAL_TOKEN_URL, params);
    } catch (e) {
      return Promise.reject();
    }

    const token = response.data.access_token;
    const refresh = response.data.refresh_token;
    const expiresAt =
      ((new Date().getTime() / 1000) | 0) + Number(response.data.expires_in);

    await Promise.all([
      this._setAuthToken(token, expiresAt),
      this._setRefreshToken(refresh),
    ]);

    return this.fetchUserData();
  }

  async fetchUserData() {
    try {
      const response = await this.#client.get("/users/@me");
      const userData = new UserData({
        ...response.data,
        provider: PROVIDERS.MY_ANIME_LIST,
      });
      await super.fetchUserData(userData);
      this.#userId = response.data.id;
      return userData;
    } catch (e) {
      throw new Error("Unable to get user info.");
    }
  }
}
