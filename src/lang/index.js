import browser from "webextension-polyfill";
import _ from "lodash";

// languages
import en from "./en.json";
import ja from "./ja.json";

const language = browser.i18n.getUILanguage();

let data;

switch (language) {
  case "ja":
    data = _.defaults({}, ja, en);
    break;

  case "en":
  case "en_US":
  default:
    data = en;
    break;
}

export default data;
