import React from "react";
import { css } from "@emotion/react";
import Layout from "./layout";
import SignIn from "./SignIn";
import Services from "./Services";
import OtherOptions from "./OtherOptions";

const Options = () => {
  return (
    <Layout>
      <SignIn />
      <div
        css={css`
          position: relative;
          padding-top: 32px;
        `}
      >
        <Services />
        <OtherOptions />
      </div>
    </Layout>
  );
};

export default Options;
