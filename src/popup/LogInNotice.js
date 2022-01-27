import React from "react";
import browser from "webextension-polyfill";
import { css } from "@emotion/react";
import { Box, Typography, Button } from "@mui/material";

const LogInNotice = () => {
  return (
    <Box
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 4px 32px;
        gap: 8px;
      `}
    >
      <Typography textAlign="center" variant="h1" fontSize="18px">
        Log in to continue
      </Typography>
      <Typography textAlign="center" fontSize="12px">
        Logging into your MAL, Kitsu, or AniList account will allow you to view
        and update your anime list.
      </Typography>
      <Button
        onClick={() => browser.runtime.openOptionsPage()}
        css={css`
          position: absolute;
          bottom: 16px;
        `}
      >
        Log In
      </Button>
    </Box>
  );
};

export default LogInNotice;
