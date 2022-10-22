import { getVideoScript } from '../fileHelpers'
import { SERVICES } from '../../enums'

describe('File helpers', () => {
    describe('getVideoScript', () => {
        beforeEach(() => {
            browser.runtime.getManifest.mockReturnValue({
                content_scripts: [
                    {
                        matches: ['*://beta.crunchyroll.com/watch/**'],
                        js: 'crunchyroll.js',
                    },
                ],
            })
        })

        afterEach(() => {
            jest.clearAllMocks()
        })

        it('returns empty by default', () => {
            const actual = getVideoScript(null)

            expect(actual).toBe('')
        })

        it('returns for crunchyroll services', () => {
            const actual = getVideoScript(SERVICES.CRUNCHYROLL)

            expect(actual).toBe('crunchyroll.js')
        })
    })
})
