import _ from "lodash";
import AnimeSeries from "./AnimeSeries";
import { LIST_STATUS, PROVIDERS } from "../enums";

export default class LibraryEntry {
  constructor(data = {}) {
    switch (data.service) {
      case PROVIDERS.KITSU:
        this.#mapFromKitsu(data);
        break;

      default:
        _.defaultsDeep(this, data, DEFAULT_VALUES);
        break;
    }
  }

  #mapFromKitsu(data) {
    _.defaultsDeep(
      this,
      {
        _id: data.id,
        _status: KITSU_STATUSES[data.attributes.status],
        _progress: data.attributes.progress,
        _notes: data.attributes.notes,
        _startDate: data.attributes.startedAt
          ? new Date(data.attributes.startedAt)
          : null,
        _completedDate: data.attributes.finishedAt
          ? new Date(data.attributes.finishedAt)
          : null,
        _lastUpdated: data.pattributes.rogressedAt
          ? new Date(data.attributes.progressedAt)
          : null,
        _rating: parseFloat(data.attributes.rating) / 2,
        _anime: new AnimeSeries({
          ...data.anime,
          provider: PROVIDERS.KITSU,
        }),
      },
      DEFAULT_VALUES
    );
  }
}

const DEFAULT_VALUES = {
  _id: 0,
  _status: LIST_STATUS.NOT_WATCHING,
  _progress: 0,
  _notes: "",
  _startDate: null,
  _completionDate: null,
  _lastUpdated: null,
  _rating: 0,
  _anime: new AnimeSeries(),
};

const KITSU_STATUSES = {
  completed: LIST_STATUS.COMPLETED,
  current: LIST_STATUS.CURRENT,
  dropped: LIST_STATUS.DROPPED,
  on_hold: LIST_STATUS.ON_HOLD,
  planned: LIST_STATUS.PLANNED,
};
