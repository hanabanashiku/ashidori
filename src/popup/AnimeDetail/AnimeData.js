import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import LibraryEntry from "../../models/LibraryEntry";

const AnimeData = ({ anime }) => {
  return (
    <Box
      css={css`
        padding: 16px;
      `}
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
        {anime.anime.title}
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
          `}
        />
        <Typography
          paragrah
          css={css`
            font-size: 12px;
          `}
        >
          {anime.anime.description}
        </Typography>
      </Box>
    </Box>
  );
};
AnimeData.propTypes = {
  anime: PropTypes.instanceOf(LibraryEntry).isRequired,
};

export default AnimeData;
