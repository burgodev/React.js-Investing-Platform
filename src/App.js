import React from "react";
import "./global.css";
import Routes from "./routes";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "./_common/utils/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import SnackbarProvider from 'react-simple-snackbar'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <CssBaseline />
        {/* ajustar esse background direito, se tirar fica piscando background em branco */}
        <div style={{ background: theme.palette.background }}>
          <Routes />
        </div>
      </SnackbarProvider>
    </ThemeProvider>

  );
}

export default App;
