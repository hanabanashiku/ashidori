import axios from "axios";
import AnimeEpisode from "../models/AnimeEpisode";
import { SERVICES } from "../enums";

const AUTH_URL = "https://beta-api.crunchyroll.com/auth/v1/token";
const BASE_URL = "https://beta-api.crunchyroll.com";

export default class CrunchyrollService {
  #cf_cookie;
  #account_id;
  #bearer;
  #bucket;
  #key_pair_id;
  #policy;
  #signature;

  async authenticate() {
    const request = new URLSearchParams();
    request.append("grant_type", "etp_rt_cookie");

    const tokenResponse = await axios.post(AUTH_URL, request, {
      withCredentials: true,
      headers: {
        authorization: "Basic bm9haWhkZXZtXzZpeWcwYThsMHE6",
      },
    });

    this.#bearer = tokenResponse.data["access_token"];
    this.#account_id = tokenResponse.data["account_id"];

    const keyResponse = await axios.get(`${BASE_URL}/index/v2`, {
      headers: {
        authorization: `Bearer ${this.#bearer}`,
        accept: "application/json, text/plain, */*",
      },
    });

    this.#key_pair_id = keyResponse.data.cms.key_pair_id;
    this.#policy = keyResponse.data.cms.policy;
    this.#signature = keyResponse.data.cms.signature;
    this.#bucket = keyResponse.data.cms.bucket;
    this.#cf_cookie = keyResponse.headers["set-cookie"];
    return true;
  }

  async getEpisodeData(episodeId) {
    const response = await axios.get(
      `${BASE_URL}/cms/v2${this.#bucket}/objects/${episodeId}`,
      {
        params: {
          locale: "en-US",
          Signature: this.#signature,
          Policy: this.#policy,
          "Key-Pair-Id": this.#key_pair_id,
        },
      }
    );

    const item = response.data.items[0];

    return new AnimeEpisode({
      ...item,
      service: SERVICES.CRUNCHYROLL,
    });
  }
}
