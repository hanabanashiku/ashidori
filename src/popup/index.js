/* istanbul ignore file */
import React from "react";
import ReactDOM from "react-dom";
import Theme from "../Theme";
import Popup from "./Popup";

const root = document.getElementById("root");

ReactDOM.render(
  <Theme>
    <Popup />
  </Theme>,
  root
);
