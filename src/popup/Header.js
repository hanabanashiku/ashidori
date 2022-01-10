import React from "react";
import browser from "webextension-polyfill";
import { css } from "@emotion/react";
import { Box, IconButton } from "@mui/material";
import { Settings } from "@mui/icons-material";

const Header = () => {
  return (
    <Box borderBottom="1px solid black" height="50px" position="relative">
      <img
        src="../static/images/logo.png"
        css={css`
          width: 180px;
          height: 45px;
          margin: 0 25%;
        `}
      />
      <IconButton
        css={css`
          position: absolute;
          right: 0;
          margin-right: 8px;
        `}
        onClick={() => browser.runtime.openOptionsPage()}
      >
        <Settings />
      </IconButton>
    </Box>
  );
};

export default Header;
