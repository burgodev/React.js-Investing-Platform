import React from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Button as MuiButton } from "@material-ui/core";
import PropTypes from "prop-types";

const theme = createTheme({
  overrides: {
    MuiButton: {
      text: {
        width: 214,
        height: 51,
        border: "1px solid #398CBF",
        background: "transparent",
        // boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: 5,
        color: "#398CBF",
        fontFamily: "Poppins",
        fontWeight: 600,
        fontSize: "1rem",
        lineHeight: "104.5%",
        "&:hover": {
          // backgroundColor: "white",
          // color: "#398CBF",
        },
      },
    },
  },
});

PropTypes.propTypes = {
  children: PropTypes.object,
};

function Contained({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <MuiButton>{children}</MuiButton>
    </ThemeProvider>
  );
}

export default Contained;
