import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import lang from '../../lang'
import { Box, Button, CircularProgress, Alert } from '@mui/material'
import { KeyboardBackspace } from '@mui/icons-material'
import ApiProvider from '../../providers/ApiProvider'
import AnimeData from './AnimeData'
import ListForm from './ListForm'
import { resetSearchPage } from '../../helpers/storageHelpers'

const AnimeDetail = ({
    selectedAnime,
    isListEntryId,
    close,
    api,
    toggleSearch,
    isPopup,
}) => {
    const [anime, setAnime] = useState(null)

    useEffect(() => {
        ;(async () => {
            try {
                const result = isListEntryId
                    ? await api.getSingleLibraryEntry(selectedAnime)
                    : await api.getSingleLibraryEntryByAnime(selectedAnime)
                setAnime(result)
            } catch (e) {
                setAnime('error')
            }
        })()
    }, [selectedAnime, setAnime])

    function closeDetail(saving) {
        if (saving && toggleSearch) {
            resetSearchPage()
            toggleSearch()
        }
        close()
    }

    if (!anime) {
        return <CircularProgress />
    }

    if (anime === 'error') {
        return (
            <Alert severity="error">
                {lang.errorOccurredTitle} {lang.errorOccurredBody}
            </Alert>
        )
    }

    return (
        <Box>
            <Button startIcon={<KeyboardBackspace />} onClick={close}>
                {isPopup ? lang.backButton : lang.closeButton}
            </Button>
            <AnimeData anime={anime.anime} />
            <ListForm entry={anime} api={api} close={closeDetail} />
        </Box>
    )
}
AnimeDetail.propTypes = {
    selectedAnime: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    close: PropTypes.func.isRequired,
    api: PropTypes.instanceOf(ApiProvider).isRequired,
    isListEntryId: PropTypes.bool.isRequired,
    toggleSearch: PropTypes.func,
    isPopup: PropTypes.bool.isRequired,
}

export default AnimeDetail
