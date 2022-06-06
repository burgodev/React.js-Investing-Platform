import React from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Button as MuiButton } from "@material-ui/core";
import PropTypes from "prop-types";
import { theme as mainTheme } from "../../../utils/theme.js";
import { Loading } from "../../";

const theme = createTheme({
  overrides: {
    MuiButton: {
      text: {
        fontSize: "16px",
        fontFamily: "Poppins",
        fontWeight: 600,
        width: 280,
        height: 52,
        textTransform: "none",
        color: "white",
        background: mainTheme.palette.main,
        boxShadow: "4px 4px 5px rgba(0, 0, 0, 0.25)",
        borderRadius: 10,
        transition: ".4s",

        "&:hover": {
          transform: "scale(1.05)",
          background: mainTheme.palette.main,
        },
        "&:disabled": {
          color: "white",
          background: "grey",

          cursor: "not-allowed",
        },
        [mainTheme.breakpoints.down("lg")]: {
          height: 40,
          fontSize: 14,
        },
        [mainTheme.breakpoints.only("xs")]: {
          height: 36,
          fontSize: 12,
        },
      },
      root: {},
    },
  },
});

const theme2 = createTheme({
  overrides: {
    MuiButton: {
      text: {
        fontFamily: "Poppins",
        fontWeight: 600,
        width: 280,
        height: 52,
        textTransform: "none",
        color: "#5fb6ab",
        background: "white",
        boxShadow: "inset 4px 4px 10px rgba(0, 0, 0, 0.25)",
        borderRadius: 10,
        transition: ".4s",
        "&:hover": {
          transform: "scale(1.05)",
        },
        "&:disabled": {
          color: "white",

          cursor: "not-allowed",
        },
      },
      root: {},
    },
  },
});

PropTypes.propTypes = {
  children: PropTypes.object,
  style: PropTypes.object,
  background: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  width: PropTypes.string,
  fullWidth: PropTypes.bool,
  height: PropTypes.string,
  margin: PropTypes.string,
  borderRadius: PropTypes.string,
  secondary: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

const Contained = ({
  children,
  background,
  color,
  width,
  fullWidth,
  margin,
  height,
  borderRadius,
  fontSize,
  style,
  loading,
  secondary,
  disabled,
  className,
  ...props
}) => {
  return (
    <ThemeProvider theme={secondary ? theme2 : theme}>
      <MuiButton
        style={{
          background,
          color,
          width: fullWidth ? "100%" : width,
          height,
          borderRadius,
          fontSize,
          margin,
          ...style,
        }}
        className={className}
        {...props}
        disabled={disabled || loading}
      >
        {loading ? <Loading isLoading size={24} color="white" /> : children}
      </MuiButton>
    </ThemeProvider>
  );
};

export default Contained;
