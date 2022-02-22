import React, { useMemo } from "react";
import PropTypes from "prop-types";
import $ from "jquery";
import { ThemeProvider } from "@mui/material/styles";
import dark from "./dark";
import light from "./light";

export default function CrunchyrollThemeProvider({ children }) {
  const mode =
    $("body").css("background-color") === "rgb(0, 0, 0)" ? dark : light;
  const theme = useMemo(() => mode(), [mode]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
CrunchyrollThemeProvider.propTypes = {
  children: PropTypes.any,
};
