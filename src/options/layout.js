import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Container, Box, Paper } from "@mui/material";

const Layout = ({ children }) => (
  <Container
    css={css`
      width: 80rem;
      margin: 32px auto;
    `}
  >
    <Paper elevation={6}>
      <Box>
        <Box
          css={css`
            height: 128px;
            width: 512px;
            margin: auto;
            background: url("/static/images/logo.png") no-repeat;
          `}
        />
        <p
          css={css`
            font-size: 14px;
            font-style: italic;
            text-align: center;
            line-height: 0.2;
          `}
        >
          An anime tracker in your browser.
        </p>
        <hr />
      </Box>
      <Box padding="16px 36px">{children}</Box>
    </Paper>
  </Container>
);
Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
