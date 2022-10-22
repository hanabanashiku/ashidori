import AnimeSeason from '../AnimeSeason'
import { SERVICES } from '../../enums'

import mockCrunchyrollSeason from '../../__mocks__/crunchyroll/season.json'

describe('Anime season model', () => {
    it('loads default values from the constructor', () => {
        const actual = new AnimeSeason()

        expect(actual.id).toBe(0)
        expect(actual.name).toBe('')
        expect(actual.number).toBe(0)
    })

    it('loads data correctly from the constructor', () => {
        const data = {
            _id: 5,
            _name: 'Season 1',
            _number: 1,
        }

        const actual = new AnimeSeason(data)

        expect(actual.id).toBe(data._id)
        expect(actual.name).toBe(data._name)
        expect(actual.number).toBe(data._number)
    })

    it('maps data from Crunchyroll', () => {
        const actual = new AnimeSeason({
            ...mockCrunchyrollSeason,
            service: SERVICES.CRUNCHYROLL,
        })

        expect(actual.id).toBe('GR2PCVZEW')
        expect(actual.name).toBe('My Hero Academia Season 5')
        expect(actual.number).toBe(5)
    })
})
