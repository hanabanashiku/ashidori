import NetflixService from '../Netflix';
import axios from 'axios';
import mockData from './netflixMockData.json';

describe('Netflix service', () => {
    let getSpy;

    beforeEach(() => {
        getSpy = jest.spyOn(axios, 'get');
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('returns an anime episode for a movie', async () => {
        getSpy.mockResolvedValue({
            data: mockData,
        });
        const baseUrl = 'https://www.netflix.com/memberapi/abc123';

        const service = new NetflixService(baseUrl);

        const actual = await service.getEpisodeMetadata(80225501);

        expect(getSpy).toHaveBeenCalledTimes(1);
        expect(getSpy).toHaveBeenLastCalledWith(
            `${baseUrl}/metadata?movieid=80225501&imageFormat=webp&withSize=true&materialize=true`
        );

        expect(actual.id).toBe(80225501);
        expect(actual.title).toBe('Episode 1');
        expect(actual.number).toBe(1);
        expect(actual.series.id).toBe(80117781);
        expect(actual.series.seasonCount).toBe(3);
        expect(actual.series.title).toBe('The Disastrous Life of Saiki K.');
        expect(actual.season.id).toBe(80225500);
        expect(actual.season.name).toBe('Season 2');
        expect(actual.season.number).toBe(2);
    });
});
