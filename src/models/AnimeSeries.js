import _ from "lodash";
import { PROVIDERS, ANIME_STATUS } from "../enums";

export default class AnimeSeries {
  constructor(data = {}) {
    switch (data.provider) {
      case PROVIDERS.KITSU:
        this.#mapFromKitsu(data);
        break;

      default:
        _.defaultsDeep(this, data, DEFAULT_VALUES);
    }
  }

  #mapFromKitsu(data) {
    _.defaultsDeep(
      this,
      {
        _id: data.id,
        _title: data.attributes.canonicalTitle,
        _englishTitle: data.attributes.titles.en,
        _description: data.attributes.synopsis,
        _startDate: new Date(data.attributes.startDate),
        _endDate: data.attributes.endDate
          ? new Date(data.attributes.endDate)
          : null,
        _status: KITSU_ANIME_STATUS[data.attributes.status],
        _episodeCount: data.attributes.episodeCount,
        _episodeLength: data.attributes.episodeLength,
        _streamingLinks: {}, // todo
      },
      DEFAULT_VALUES
    );
  }
}

const DEFAULT_VALUES = {
  _id: 0,
  _title: "",
  _englishTitle: "",
  _description: "",
  _startDate: null,
  _endDate: null,
  _status: ANIME_STATUS.ANNOUNCED,
  _episodeCount: 0,
  _episodeLength: 0,
  _streamingLinks: {},
};

const KITSU_ANIME_STATUS = {
  current: ANIME_STATUS.AIRING,
  finished: ANIME_STATUS.FINISHED,
  tba: ANIME_STATUS.ANNOUNCED,
  unreleased: ANIME_STATUS.UNRELEASED,
  upcoming: ANIME_STATUS.UPCOMING,
};
