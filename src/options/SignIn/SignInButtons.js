import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import lang from "lang";

const ProviderButton = ({ name, logo, onClick }) => (
  <Box
    css={css`
      padding: 0px 24px;
      & > img,
      button {
        display: block;
        margin: 0 auto;
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
    <Button variant="outlined" size="small" onClick={onClick}>
      {lang.signInButton}
    </Button>
  </Box>
);

ProviderButton.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const SignInButtons = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h2" fontSize="18px">
        {lang.chooseProvider}
      </Typography>
      <Box
        css={css`
          display: flex;
          justify-content: center;
          & div:not(:last-child) {
            border-right: 2px solid gray;
          }
        `}
      >
        {/*<ProviderButton
          name="My Anime List"
          logo="../../static/images/mal.png"
          onClick={() => {}}
        />*/}

        <ProviderButton
          name="Kitsu"
          logo="../../static/images/kitsu.png"
          onClick={() => navigate("signin/kitsu")}
        />

        {/* <ProviderButton
          name="AniList"
          logo="../../static/images/anilist.png"
          onClick={() => {}}
        /> */}
      </Box>
    </Box>
  );
};

export default SignInButtons;
