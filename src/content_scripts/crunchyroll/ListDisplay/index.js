import React from 'react'
import PropTypes from 'prop-types'
import util from 'util'
import { css } from '@emotion/react'
import CrunchyrollThemeProvider from '../theme'
import { Box, Stack, Typography, Button } from '@mui/material'
import Progress from '../../common/Progress'
import Rating from '../../common/Rating'
import { onOpenDetail } from '../../common'
import LibraryEntry from '../../../models/LibraryEntry'
import ApiProvider from '../../../providers/ApiProvider'
import UserData from '../../../models/UserData'
import { PROVIDER_NAMES } from '../../../enums'
import lang from '../../../lang'

function ListDisplay({ libraryEntry, api, userData }) {
    return (
        <CrunchyrollThemeProvider>
            <Box
                css={css`
                    margin-top: 16px;
                `}
            >
                <Typography variant="h3">List status</Typography>
                <Box
                    css={css`
                        margin-top: -4px;
                    `}
                >
                    <Typography variant="subtitle">
                        {libraryEntry.anime.title}
                    </Typography>
                </Box>
                <Box display="flex" flexDirection="row">
                    <Stack paddingTop="16px" flexGrow={1}>
                        <Typography>
                            {lang.listStatuses[libraryEntry.status]}
                        </Typography>
                        <Progress libraryEntry={libraryEntry} />
                        <Rating libraryEntry={libraryEntry} api={api} />
                    </Stack>
                    <Stack spacing={2} width="200px" paddingLeft="8px">
                        <Button
                            component="a"
                            href={libraryEntry.anime.externalLink}
                            target="_blank"
                        >
                            {util.format(
                                lang.viewOnProvider,
                                PROVIDER_NAMES[userData.apiSource]
                            )}
                        </Button>
                        <Button onClick={() => onOpenDetail(libraryEntry)}>
                            {lang.openInAshidori}
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </CrunchyrollThemeProvider>
    )
}
ListDisplay.propTypes = {
    libraryEntry: PropTypes.instanceOf(LibraryEntry).isRequired,
    api: PropTypes.instanceOf(ApiProvider).isRequired,
    userData: PropTypes.instanceOf(UserData).isRequired,
}

export default ListDisplay
