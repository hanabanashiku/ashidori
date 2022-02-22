import browser from "webextension-polyfill";
import _ from "lodash";
import { LIST_STATUS } from "../enums";
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

data.listStatuses = {};
data.listStatuses[LIST_STATUS.COMPLETED] = data.completed;
data.listStatuses[LIST_STATUS.CURRENT] = data.watchingLong;
data.listStatuses[LIST_STATUS.DROPPED] = data.dropped;
data.listStatuses[LIST_STATUS.NOT_WATCHING] = data.completed;
data.listStatuses[LIST_STATUS.ON_HOLD] = data.onHold;
data.listStatuses[LIST_STATUS.PLANNED] = data.plannedLong;
data.listStatuses[LIST_STATUS.NOT_WATCHING] = data.notWatching;

export default data;
