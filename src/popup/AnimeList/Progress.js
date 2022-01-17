import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Box, LinearProgress, Typography } from "@mui/material";
import ApiProvider from "../../providers/ApiProvider";

const Progress = ({ value: { id, current, total, api } }) => {
  const normalizedTotal = total ? total : current * 12;
  const progress = (current / normalizedTotal) * 100;

  return (
    <Box
      css={css`
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
      `}
    >
      <Typography component="div">
        {total ? `${current}/${total}` : `${current}`}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        css={css`
          position: absolute;
          bottom: 0;
          width: 100%;
        `}
      />
    </Box>
  );
};
Progress.propTypes = {
  value: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    current: PropTypes.number.isRequired,
    total: PropTypes.number,
    api: PropTypes.instanceOf(ApiProvider),
  }),
};

export default Progress;
