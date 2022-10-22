import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import browser from 'webextension-polyfill'
import util from 'util'
import { Alert, Link } from '@mui/material'
import lang from '../lang'

const CurrentAnimeDisplay = ({ showAnime }) => {
    const [currentAnime, setCurrentAnime] = useState(null)
    useEffect(() => {
        (async () => {
            const currentAnimeFromStorage = (
                await browser.storage.local.get({
                    current_anime: null,
                })
            ).current_anime

            if (!currentAnimeFromStorage) {
                return
            }

            setCurrentAnime(currentAnimeFromStorage)
        })()
    }, [])

    if (!currentAnime) {
        return null
    }

    return (
        <Alert severity="info" data-testid="current-watching-alert">
            {util.format(
                lang.currentlyWatchingTip,
                currentAnime.episodeNumber,
                currentAnime.title
            )}{' '}
            <Link onClick={() => showAnime(currentAnime.libraryEntryId)}>
                {lang.seeDetails}
            </Link>
        </Alert>
    )
}
CurrentAnimeDisplay.propTypes = {
    showAnime: PropTypes.func.isRequired,
}

export default CurrentAnimeDisplay
