import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Paper, Box, Typography, Chip, Stack, Link } from "@mui/material";
import { Link as LinkIcon } from "@mui/icons-material";
import LibraryEntry from "../../models/LibraryEntry";
import Description from "./Description";
import { ANIME_STATUS } from "../../enums";

const AnimeData = ({ anime }) => {
  function animeStatusString(status) {
    switch (status) {
      case ANIME_STATUS.AIRING:
        return "Airing";
      case ANIME_STATUS.ANNOUNCED:
        return "Announced";
      case ANIME_STATUS.FINISHED:
        return "Finished";
      case ANIME_STATUS.UNRELEASED:
        return "Unreleased";
      case ANIME_STATUS.UPCOMING:
        return "Upcoming";
    }
  }

  return (
    <Paper
      css={css`
        margin: 8px;
        padding: 8px;
        overflow: auto;
      `}
      elevation={3}
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
        {anime.anime.title}{" "}
        <Link
          href={anime.anime.externalLink}
          target="_blank"
          aria-label="External link"
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
          src={anime.anime.coverImageUrl}
          css={css`
            float: left;
            padding: 8px;
            height: 156px;
          `}
        />
        <Description>{anime.anime.description}</Description>
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
            <strong>Status</strong> {animeStatusString(anime.anime.status)}
          </li>
          {anime.anime.episodeCount > 0 && (
            <li>
              <strong>Episodes</strong> {anime.anime.episodeCount}
            </li>
          )}
          <li>
            <strong>Aired</strong> {anime.anime.startDate.toDateString()}
            {anime.anime.endDate && ` to ${anime.anime.endDate.toDateString()}`}
          </li>
          <li>
            <strong>Length</strong> {anime.anime.episodeLength} minutes
          </li>
          <Stack
            component="li"
            direction="row"
            spacing={1}
            css={css`
              display: inline-block;
              padding-top: 8px;
            `}
          >
            {anime.anime.genres.map((genre, i) => (
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
    </Paper>
  );
};
AnimeData.propTypes = {
  anime: PropTypes.instanceOf(LibraryEntry).isRequired,
};

export default AnimeData;
