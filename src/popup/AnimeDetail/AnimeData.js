import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Paper, Box, Typography, Chip, Stack, Link } from '@mui/material';
import { Link as LinkIcon } from '@mui/icons-material';
import Description from './Description';
import StreamingLinks from './StreamingLinks';
import { ANIME_STATUS } from '../../enums';
import AnimeSeries from '../../models/AnimeSeries';
import lang from 'lang';

const AnimeData = ({ anime }) => {
    function animeStatusString(status) {
        switch (status) {
            case ANIME_STATUS.AIRING:
                return lang.airing;
            case ANIME_STATUS.ANNOUNCED:
                return lang.announced;
            case ANIME_STATUS.FINISHED:
                return lang.finished;
            case ANIME_STATUS.UNRELEASED:
                return lang.unreleased;
            case ANIME_STATUS.UPCOMING:
                return lang.upcoming;
        }
    }

    return (
        <Paper
            css={css`
                margin: 8px;
                margin-bottom: 24px;
                padding: 8px;
                overflow: auto;
            `}
            elevation={3}
            data-testid="detail-staticdata"
        >
            <Typography
                variant="h1"
                css={css`
                    font-size: 18px;
                    font-weight: bold;
                    font-style: italic;
                    text-transform: uppercase;
                    margin-bottom: 8px;
                `}
            >
                {anime.title}{' '}
                <Link
                    href={anime.externalLink}
                    target="_blank"
                    aria-label="External page"
                    css={css`
                        display: inline-block;
                        position: relative;
                        top: 4px;
                        left: 2px;
                    `}
                >
                    <LinkIcon />
                </Link>
            </Typography>
            <Box
                css={css`
                    padding-left: 8px;
                `}
            >
                <img
                    src={anime.coverImageUrl}
                    css={css`
                        float: left;
                        padding: 8px;
                        height: 156px;
                    `}
                    alt={anime.title}
                    data-testid="detail-cover"
                />
                <Description>{anime.description}</Description>
                <Box
                    component="ul"
                    css={css`
                        font-size: 14px;
                        list-style: none;
                        margin-top: 0px;
                        & li > strong {
                            display: inline-block;
                            width: 70px;
                        }
                    `}
                >
                    <li>
                        <strong>{lang.status}</strong>{' '}
                        {animeStatusString(anime.status)}
                    </li>
                    {anime.episodeCount > 0 && (
                        <li>
                            <strong>{lang.episodes}</strong>{' '}
                            {anime.episodeCount}
                        </li>
                    )}
                    {anime.startDate && (
                        <li>
                            <strong>
                                {anime.isAiring ? lang.airing : lang.aired}
                            </strong>{' '}
                            {anime.startDate.toDateString()}
                            {anime.endDate &&
                                ` ${lang.to} ${anime.endDate.toDateString()}`}
                        </li>
                    )}
                    {anime.episodeLength > 0 && (
                        <li>
                            <strong>{lang.length}</strong> {anime.episodeLength}
                            {lang.minutes}
                        </li>
                    )}

                    <Stack
                        component="li"
                        direction="row"
                        spacing={1}
                        css={css`
                            display: inline-block;
                            padding-top: 8px;
                        `}
                    >
                        {anime.genres.slice(0, 5).map((genre, i) => (
                            <Chip
                                label={genre}
                                size="small"
                                variant="outlined"
                                color="primary"
                                key={i}
                            />
                        ))}
                    </Stack>
                </Box>
            </Box>
            <StreamingLinks links={anime.streamingLinks} />
        </Paper>
    );
};
AnimeData.propTypes = {
    anime: PropTypes.instanceOf(AnimeSeries).isRequired,
};

export default AnimeData;
