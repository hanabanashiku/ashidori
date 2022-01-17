import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import ApiProvider from "../../providers/ApiProvider";

const Rating = ({ value: { id, rating, api } }) => {
  return (
    <Box
      css={css`
        display: inline-flex;
        align-items: center;
      `}
    >
      {rating > 0 && (
        <>
          <Star htmlColor="gold" />
          <Typography>{rating}</Typography>
        </>
      )}
      {!rating && (
        <>
          <StarBorder />
          <Typography variant="caption" component="div" marginTop={1}>
            Rate
          </Typography>
        </>
      )}
    </Box>
  );
};
Rating.propTypes = {
  value: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    rating: PropTypes.number.isRequired,
    api: PropTypes.instanceOf(ApiProvider),
  }).isRequired,
};

export default Rating;
