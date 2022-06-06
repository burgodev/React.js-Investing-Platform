import { createTheme } from "@material-ui/core/styles";

export const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto",
        },
      },
    },
    MuiIconButton: {
      root: {
        color: "#FFF !important"
      }
    },
    MuiMenu: {
      paper: {
        color: "#000",
        backgroundColor: "#FFF"
      }
    },
    MuiStepper: {
      // Nome da regra
      root: {
        // Algum CSS
        background: "transparent",
        paddingTop: 0,
      },
    },
  },

  typography: {
    fontFamily: "Poppins",
  },

  palette: {
    type: 'dark',
    primary: {
      light: "#A1C3ED",
      main: "#CD1C35",
      dark: "#286090",
      contrastText: "#FFFFFF",
    },

    yellow: "#FFA900",
    white: "#FFF",
    red: "#FF5251",
    lightGrey: "#848484",
    black: "#181818",
    background: "#201f1f",
    purple: "#9746FF",
    green: "#69BF41",
    main: "#CD1C35",
    secondary: {
      main: "#151A30",
    },
  },

  animations: {
    animateToLeft: {
      animation: `$animateToLeft 5s`,
      keyframeName: "@keyframes animateToLeft",
      keyframeValue: {
        from: {
          right: -500,
        },
        to: {
          right: 0,
        },
      },
    },
    fadeIn: {
      animation: `$fadeIn 1s`,
      keyframeName: "@keyframes fadeIn",
      keyframeValue: {
        "0%": {
          opacity: 0,
        },
        "100%": {
          opacity: 1,
        },
      },
    },
  },

  space: {
    globalPadding: "0px 30px 0px 30px",
    unit: 8,
    padding: "0px 30px 0px 30px",
    margin: 8,
  },

  MuiButton: {
    // Name of the rule
    text: {
      // Some CSS
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 48,
      padding: "0 30px",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
  },
});
