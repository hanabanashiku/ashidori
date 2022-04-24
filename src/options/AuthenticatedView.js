import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Card, Typography, Avatar, Link, Button } from "@mui/material";
import util from "util";
import UserData from "../models/UserData";
import { getApiInstance } from "../providers/builder";
import { PROVIDER_NAMES } from "../enums";
import lang from "lang";

const AuthenticatedView = ({ userData, reset }) => {
  const signOut = async () => {
    const api = await getApiInstance();
    await api.signOut();
    reset();
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
        {util.format(lang.loggedInUsing, PROVIDER_NAMES[userData.apiSource])}
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
        {lang.viewProfile}
      </Link>
      <Button size="small" variant="outlined" onClick={() => signOut()}>
        {lang.signOut}
      </Button>
    </Card>
  );
};
AuthenticatedView.propTypes = {
  userData: PropTypes.instanceOf(UserData).isRequired,
  reset: PropTypes.func.isRequired,
};

export default AuthenticatedView;
