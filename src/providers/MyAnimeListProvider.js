import browser from "webextension-polyfill";
import axios from "axios";
import ApiProvider from "./ApiProvider";
import Settings from "../options/Settings";
import UserData from "../models/UserData";
import { PROVIDERS, LIST_STATUS } from "../enums";
import { getHttpAdapter } from "./helper";
import { openLink } from "../helpers/extensionHelpers";

const MAL_BASE_URL = "https://api.myanimelist.net/v2";
const MAL_AUTH_URL = "https://myanimelist.net/v1/oauth2/authorize";
const CLIENT_ID = "e62f583191ca06e8a96bd8fc66769c09";
const REDIRECT_URL = "";

export default class KitsuProvider extends ApiProvider {
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

  authorize() {
    return openLink(
      `${MAL_AUTH_URL}?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=write:users`
    );
  }

  async authorizeCallback(bearer, refresh) {
    await Promise.all([
      this._setAuthToken(bearer),
      this._setRefreshToken(refresh),
    ]);
    return this.fetchUserData();
  }
}
