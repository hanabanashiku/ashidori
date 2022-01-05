import browser from "webextension-polyfill";
import $ from "jquery";
import Settings from "../../options/Settings";
import { SERVICES } from "../../enums";
import CrunchyrollService from "../../services/Crunchyroll";

let client;
let episodeData;

Settings.getEnabledServices().then((enabledServices) => {
  if (!enabledServices.includes(SERVICES.CRUNCHYROLL)) {
    return;
  }

  $(() => {
    client = new CrunchyrollService();
    client.authenticate().then(() =>
      getEpisodeData().then((data) => {
        episodeData = data;
        console.log(data);
      })
    );

    $(window).on("unload", async () => {
      await onEpisodeCompleted();
    });
  });
});

async function getEpisodeData() {
  const episodeId = /watch\/(.+?)\/.+/g.exec(window.location.href)[1];

  return await client.getEpisodeData(episodeId);
}

async function onEpisodeCompleted() {
  alert(episodeData);
}
