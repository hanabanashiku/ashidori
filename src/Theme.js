import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useDarkMode from "./helpers/useDarkMode";

const Theme = ({ children }) => {
  const isDarkMode = useDarkMode();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
        },
      }),
    [isDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
Theme.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Theme;
