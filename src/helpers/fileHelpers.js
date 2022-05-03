import manifest from "../manifest.json";
import { SERVICES } from "../enums";

export function getVideoScript(service) {
  switch (service) {
    case SERVICES.CRUNCHYROLL:
      return manifest.content_scripts.find((cs) =>
        cs.matches.includes("*://beta.crunchyroll.com/watch/**")
      ).js;
    default:
      return "";
  }
}
