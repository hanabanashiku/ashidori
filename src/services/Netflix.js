import axios from 'axios';
import AnimeEpisode from '../models/AnimeEpisode';
import AnimeSeason from '../models/AnimeSeason';
import AnimeSeries from '../models/AnimeSeries';

export default class NetflixService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getEpisodeMetadata(movieId) {
        const response = await axios.get(
            `${this.baseUrl}/metadata?movieid=${movieId}&imageFormat=webp&withSize=true&materialize=true`
        );
        const video = response.data.video;
        let currentSeason, currentEpisode;

        const episodeCount = video.seasons.reduce(
            (previous, current) => previous + current.episodes.length,
            0
        );

        for (let season of video.seasons) {
            for (let episode of season.episodes) {
                if (episode.id !== movieId) {
                    continue;
                }

                currentSeason = season;
                currentEpisode = episode;
            }
        }

        if (!currentSeason || !currentEpisode) {
            return null;
        }

        return new AnimeEpisode({
            _id: currentEpisode.id,
            _title: currentEpisode.title,
            _description: currentEpisode.synopsis,
            _number: currentEpisode.seq,
            _duration: currentEpisode.runtime,
            _series: new AnimeSeries({
                _id: video.id,
                _title: video.title,
                _englishTitle: video.title,
                _description: video.synopsis,
                _coverImage: video.boxart[0].url,
                _episodeCount: episodeCount,
                _seasonCount: video.seasons.length,
            }),
            _season: new AnimeSeason({
                _id: currentSeason.id,
                _name: currentSeason.title,
                _number: currentSeason.seq,
            }),
        });
    }
}
