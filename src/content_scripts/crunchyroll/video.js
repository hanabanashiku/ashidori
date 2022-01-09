// import browser from "webextension-polyfill";
import $ from "jquery";
import Settings from "../../options/Settings";
import { SERVICES } from "../../enums";
import CrunchyrollService from "../../services/Crunchyroll";
import { getApiInstance } from "../../providers/builder";

let client;
let episodeData;
let loadTime;

Settings.getEnabledServices().then((enabledServices) => {
  if (!enabledServices.includes(SERVICES.CRUNCHYROLL)) {
    return;
  }

  $(() => {
    loadTime = new Date();
    client = new CrunchyrollService();
    client.authenticate().then(() =>
      getEpisodeData().then((data) => {
        episodeData = data;
      })
    );

    $(window).on("beforeunload", () => {
      (async () => {
        const api = await getApiInstance();
        const userData = api.getUserData();

        browser.runtime.sendMessage({
          type: "episode_needs_updating",
          payload: {
            episodeData,
            loadTime,
            userData: await userData,
          },
        });
      })();
    });
  });
});

async function getEpisodeData() {
  const episodeId = /watch\/(.+?)\/.+/g.exec(window.location.href)[1];
  return await client.getEpisodeData(episodeId);
}
