import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
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
    <div
      css={css`
        width: 30rem;
        margin: 0 auto;
      `}
    >
      <h2>You are logged in using {PROVIDER_NAMES[userData.apiSource]}.</h2>
      <img
        src={userData.avatarUrl}
        css={css`
          float: left;
          padding-right: 16px;
          height: 64px;
          width: 64px;
        `}
      />
      <p
        css={css`
          font-weight: bold;
          font-size: 18px;
          margin: -2px 0;
        `}
      >
        {userData.username}
      </p>
      <a
        target="_blank"
        rel="noreferrer"
        href={userData.url}
        css={css`
          display: block;
          padding-bottom: 4px;
          font-weight: 16px;
          text-decoration: none;
          color: blue;
          &:hover {
            text-decoration: underline;
          }
        `}
      >
        View profile
      </a>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};
AuthenticatedView.propTypes = {
  userData: PropTypes.instanceOf(UserData).isRequired,
};

export default AuthenticatedView;
