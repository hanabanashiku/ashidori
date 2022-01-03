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
  };

  return (
    <div
      css={css`
        width: 30rem;
        margin: 0 auto;
      `}
    >
      <h2>You are logged in using {PROVIDER_NAMES[userData.apiSource]}.</h2>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};
AuthenticatedView.propTypes = {
  userData: PropTypes.instanceOf(UserData).isRequired,
};

export default AuthenticatedView;
