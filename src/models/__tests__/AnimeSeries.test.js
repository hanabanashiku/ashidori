import {
    ANIME_STATUS,
    PROVIDERS,
    SERVICES,
    TITLE_LANGUAGE_PREFERENCES,
} from '../../enums'
import AnimeSeries from '../AnimeSeries'

// mock data
import kitsu_anime from '../../__mocks__/kitsu/anime.json'
import mal_anime from '../../__mocks__/mal/anime.json'
import crunchyroll_series from '../../__mocks__/crunchyroll/series.json'

describe('Anime series model', () => {
    it('loads default values from constructor', () => {
        const actual = new AnimeSeries()

        expect(actual.id).toBe(0)
        expect(actual.title).toBe('')
        expect(actual.englishTitle).toBe('')
        expect(actual.description).toBe('')
        expect(actual.coverImageUrl).toBe('data:,')
        expect(actual.startDate).toBeNull()
        expect(actual.endDate).toBeNull()
        expect(actual.startSeason).toBe('')
        expect(actual.status).toBeNull(), expect(actual.episodeCount).toBe(0)
        expect(actual.episodeLength).toBe(0)
        expect(actual.seasonCount).toBe(0)
        expect(actual.genres).toStrictEqual([])
        expect(actual.streamingLinks).toStrictEqual({}),
            expect(actual.externalLink).toBe('about:blank')
    })

    it('loads data from Kitsu', () => {
        const data = {
            ...kitsu_anime.data,
            included: kitsu_anime.included,
            provider: PROVIDERS.KITSU,
        }
        const actual = new AnimeSeries(data)

        expect(actual.id).toBe('12')
        expect(actual.title).toBe('One Piece')
        expect(actual.englishTitle).toBe('One Piece')
        expect(actual.description).toBe(kitsu_anime.data.attributes.description)
        expect(actual.coverImageUrl).toBe(
            kitsu_anime.data.attributes.posterImage.tiny
        )
        expect(actual.startDate).toStrictEqual(
            new Date(`${kitsu_anime.data.attributes.startDate} 0:00`)
        )
        expect(actual.endDate).toBeNull()
        expect(actual.status).toBe(ANIME_STATUS.AIRING)
        expect(actual.episodeCount).toBeNull()
        expect(actual.episodeLength).toBe(24)
        expect(actual.genres).toStrictEqual([
            'Action',
            'Adventure',
            'Comedy',
            'Fantasy',
            'Super Power',
            'Drama',
            'Friendship',
        ])
        expect(actual.externalLink).toBe('https://kitsu.io/anime/12')
        expect(actual.streamingLinks).toStrictEqual({
            0: 'https://www.crunchyroll.com/one-piece',
            1: 'https://www.funimation.com/shows/one-piece/#videos',
            2: 'https://www.hulu.com/series/one-piece-c7a08df6-d0d5-4dd3-afff-d1f90133cd4e',
            3: 'https://netflix.com/one-piece',
            4: 'https://amazon.com/one-piece',
            5: 'https://hidive.com/one-piece',
            6: 'https://tubitv.com/one-piece',
            7: 'https://vrv.co/series/GRMG8ZQZR/One-Piece',
        })
    })

    it('loads data from MyAnimeList', () => {
        const actual = new AnimeSeries({
            ...mal_anime,
            provider: PROVIDERS.MY_ANIME_LIST,
        })

        expect(actual.id).toBe(34572)
        expect(actual.title).toBe('Black Clover')
        expect(actual.englishTitle).toBe('Black Clover')
        expect(actual.description).toBe(mal_anime.synopsis)
        expect(actual.coverImageUrl).toBe(mal_anime.main_picture.medium)
        expect(actual.startDate.getDate()).toStrictEqual(
            new Date(`${mal_anime.start_date} 0:00`).getDate()
        )
        expect(actual.endDate.getDate()).toStrictEqual(
            new Date(`${mal_anime.end_date} 0:00`).getDate()
        )
        expect(actual.status).toBe(ANIME_STATUS.FINISHED)
        expect(actual.episodeCount).toBe(170)
        expect(actual.episodeLength).toBe(24)
        expect(actual.genres).toStrictEqual([
            'Action',
            'Comedy',
            'Fantasy',
            'Shounen',
        ])
        expect(actual.externalLink).toBe('https://myanimelist.net/anime/34572')
    })

    it('loads data from Crunchyroll', () => {
        const actual = new AnimeSeries({
            ...crunchyroll_series,
            service: SERVICES.CRUNCHYROLL,
        })

        expect(actual.id).toBe('G6NQ5DWZ6')
        expect(actual.title).toBe('My Hero Academia')
        expect(actual.englishTitle).toBe(actual.title)
        expect(actual.description).toBe(crunchyroll_series.description)
        expect(actual.coverImageUrl).toBe(
            crunchyroll_series.images.poster_tall[0][0].source
        )
        expect(actual.startDate).toBeNull()
        expect(actual.endDate).toBeNull()
        expect(actual.status).toBeNull()
        expect(actual.episodeCount).toBe(116)
        expect(actual.genres).toStrictEqual([
            'my hero academia',
            'boku no hero academia',
            'action',
            'fantasy',
            'shonen',
        ])
        expect(actual.externalLink).toBe(
            'https://beta-api.crunchyroll.com/cms/v2/US/M3/crunchyroll/series/G6NQ5DWZ6'
        )
        expect(actual.streamingLinks).toStrictEqual({
            0: 'https://beta.crunchyroll.com/series/G6NQ5DWZ6',
        })
    })

    describe('maps title', () => {
        it('when preference is set to canonical title', () => {
            const data = {
                ...kitsu_anime.data,
                included: kitsu_anime.included,
                provider: PROVIDERS.KITSU,
                __langPref: TITLE_LANGUAGE_PREFERENCES.ROMAJI,
            }
            const actual = new AnimeSeries(data)

            expect(actual.title).toBe('One Piece')
        })

        it('when the language matches exactly', () => {
            browser.i18n.getUILanguage.mockReturnValueOnce('ja-JP')
            const data = {
                ...kitsu_anime.data,
                included: kitsu_anime.included,
                provider: PROVIDERS.KITSU,
                __langPref: TITLE_LANGUAGE_PREFERENCES.UI_LANGUAGE,
            }
            const actual = new AnimeSeries(data)

            expect(actual.title).toBe('ONE PIECE')
        })

        it('when only the language portion matches', () => {
            browser.i18n.getUILanguage.mockReturnValueOnce('en-US')
            const data = {
                ...kitsu_anime.data,
                included: kitsu_anime.included,
                provider: PROVIDERS.KITSU,
                __langPref: TITLE_LANGUAGE_PREFERENCES.UI_LANGUAGE,
                attributes: {
                    ...kitsu_anime.data.attributes,
                    titles: {
                        en: 'One piece',
                        ja_jp: 'ONE PIECE',
                    },
                },
            }
            const actual = new AnimeSeries(data)

            expect(actual.title).toBe('One piece')
        })

        it('defaults to canonical', () => {
            browser.i18n.getUILanguage.mockReturnValueOnce('es-MX')
            const data = {
                ...kitsu_anime.data,
                included: kitsu_anime.included,
                provider: PROVIDERS.KITSU,
                __langPref: TITLE_LANGUAGE_PREFERENCES.UI_LANGUAGE,
            }
            const actual = new AnimeSeries(data)

            expect(actual.title).toBe('One Piece')
        })
    })

    describe('start season property', () => {
        it('returns empty string by default', () => {
            const actual = new AnimeSeries()
            expect(actual.startSeason).toBe('')
        })

        it('returns winter for winter season', () => {
            let actual = new AnimeSeries({ _startDate: new Date(2022, 0, 1) })
            expect(actual.startSeason).toBe('Winter 2022')
            actual = new AnimeSeries({ _startDate: new Date(2021, 2, 1) })
            expect(actual.startSeason).toBe('Winter 2021')
        })

        it('returns spring for spring season', () => {
            let actual = new AnimeSeries({ _startDate: new Date(2020, 3, 1) })
            expect(actual.startSeason).toBe('Spring 2020')
            actual = new AnimeSeries({ _startDate: new Date(2019, 5, 1) })
            expect(actual.startSeason).toBe('Spring 2019')
        })

        it('returns summer for summer season', () => {
            let actual = new AnimeSeries({ _startDate: new Date(2018, 6, 1) })
            expect(actual.startSeason).toBe('Summer 2018')
            actual = new AnimeSeries({ _startDate: new Date(2017, 8, 1) })
            expect(actual.startSeason).toBe('Summer 2017')
        })

        it('returns fall for fall season', () => {
            let actual = new AnimeSeries({ _startDate: new Date(2016, 9, 1) })
            expect(actual.startSeason).toBe('Fall 2016')
            actual = new AnimeSeries({ _startDate: new Date(2015, 11, 1) })
            expect(actual.startSeason).toBe('Fall 2015')
        })
    })
})
