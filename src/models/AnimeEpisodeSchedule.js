import _ from 'lodash';
import moment from 'moment';
import AnimeSeries from "./AnimeSeries";

export default class AnimeEpisodeSchedule {
    constructor(airingSchedule = {}) {
        _.defaultsDeep(this, {
            _anime: airingSchedule.anime && new AnimeSeries(airingSchedule.anime),
            _episode: airingSchedule.episode,
            _airingAt: airingSchedule.airingAt && moment.unix(airingSchedule.airingAt).toDate()
        }, {
            _anime: new AnimeSeries({
                _id: airingSchedule.mediaId ?? 0,
            }),
            _episode: 0,
            _airingAt: null,
        });
    }

    get anime() {
        return this._anime;
    }

    get episodeNumber() {
        return this._episode;
    }

    get airDate() {
        return this._airingAt;
    }
}