import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

const Layout = ({ children }) => (
  <div
    css={css`
      width: 80rem;
      margin: 32px auto;
      padding: 8px;
      border: 2px solid black;
      box-shadow: 3px 2px 5px grey;
    `}
  >
    <div
      css={css`
        padding: 0 32px;
      `}
    >
      <div
        css={css`
          height: 128px;
          width: 512px;
          margin: auto;
          background: url("/static/logo.png") no-repeat;
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
    </div>
    <div>{children}</div>
  </div>
);
Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
