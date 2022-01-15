import React from "react";
import { css } from "@emotion/react";
import { Box, Skeleton } from "@mui/material";

const Loading = () => {
  return (
    <Box
      css={css`
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 16px;
        gap: 12px;
      `}
    >
      <Skeleton variant="text" height="14px" />
      <Skeleton
        variant="rectangle"
        css={css`
          flex-grow: 1;
        `}
      />
    </Box>
  );
};

export default Loading;
