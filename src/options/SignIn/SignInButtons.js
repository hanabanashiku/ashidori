import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

const ProviderButton = ({ name, logo, onClick }) => (
  <div
    css={css`
      border-right: 2px solid gray;
      padding: 0px 24px;
      & > img,
      button {
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
    `}
  >
    <img
      src={logo}
      alt={name}
      css={css`
        max-width: 12rem;
      `}
    />
    <button onClick={onClick}>Sign In</button>
  </div>
);

ProviderButton.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const SignInButtons = () => {
  return (
    <div>
      <h2>Choose your anime list provider below.</h2>
      <div
        css={css`
          display: flex;
          justify-content: center;
          & div:last-child {
            border-right: none;
          }
        `}
      >
        <ProviderButton
          name="My Anime List"
          logo="../../static/images/mal.png"
          onClick={() => {}}
        />

        <ProviderButton
          name="Kitsu"
          logo="../../static/images/kitsu.png"
          onClick={() => {}}
        />

        <ProviderButton
          name="AniList"
          logo="../../static/images/anilist.png"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default SignInButtons;
