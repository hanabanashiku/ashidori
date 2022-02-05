import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Card, Typography, Avatar, Link, Button } from "@mui/material";
import UserData from "../models/UserData";
import { getApiInstance } from "../providers/builder";
import { PROVIDER_NAMES } from "../enums";

const AuthenticatedView = ({ userData }) => {
  const signOut = async () => {
    const api = await getApiInstance();
    await api.signOut();
    window.location.href = "/options/index.html";
  };

  return (
    <Card
      css={css`
        width: 30rem;
        margin: 0 auto;
        padding: 8px 16px 16px 32px;
      `}
    >
      <Typography
        variant="h2"
        fontSize="16px"
        fontWeight="semi-bold"
        marginBottom="8px"
      >
        You are logged in using {PROVIDER_NAMES[userData.apiSource]}.
      </Typography>
      <Avatar
        variant="rounded"
        src={userData.avatarUrl}
        alt={userData.username}
        css={css`
          float: left;
          padding-right: 16px;
          height: 64px;
          width: 64px;
        `}
      />
      <Typography
        css={css`
          font-weight: bold;
          font-size: 18px;
          margin: -2px 0;
        `}
      >
        {userData.username}
      </Typography>
      <Link
        target="_blank"
        rel="noreferrer"
        href={userData.url}
        underline="hover"
        css={css`
          display: block;
          padding-bottom: 4px;
          font-weight: 16px;
        `}
      >
        View profile
      </Link>
      <Button size="small" variant="outlined" onClick={() => signOut()}>
        Sign Out
      </Button>
    </Card>
  );
};
AuthenticatedView.propTypes = {
  userData: PropTypes.instanceOf(UserData).isRequired,
};

export default AuthenticatedView;
