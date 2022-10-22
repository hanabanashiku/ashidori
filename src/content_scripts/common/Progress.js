import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'
import LibraryEntry from '../../models/LibraryEntry'
import { LIST_STATUS } from '../../enums'
import lang from '../../lang'

function Progress({ libraryEntry }) {
    if (
        ![LIST_STATUS.CURRENT, LIST_STATUS.ON_HOLD].includes(
            libraryEntry.status
        )
    ) {
        return null
    }

    return (
        <Typography>
            <Typography fontWeight="bold" display="inline" component="span">
                {lang.progress}:
            </Typography>
            <Typography
                variant="highlight"
                component="span"
                paddingLeft="8px"
                display="inline-block"
            >
                {libraryEntry.progress}
            </Typography>
            {libraryEntry.anime.episodeCount > 0 &&
                ` / ${libraryEntry.anime.episodeCount}`}
        </Typography>
    )
}
Progress.propTypes = {
    libraryEntry: PropTypes.instanceOf(LibraryEntry).isRequired,
}

export default Progress
