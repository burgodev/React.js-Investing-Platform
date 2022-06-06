import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AppWrapper from "./_common/components/AppWrapper";
// Client
import Login from "../src/pages/_common/Login";
import ErrorPage from "../src/pages/_common/ErrorPage";
import {
  PasswordReset,
} from "../src/pages/_common/PasswordReset";
import Dashboard from "./pages/Client/Dashboard";
import Extract from "./pages/Client/Extract";
import Profile from "./pages/Client/Profile";
import Users from "./pages/Admin/Users";
import { RedirectHandler } from "./_common/components"


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* COMMON */}

        <Route path="/" exact component={Login} />
        {/* <Route path="/auth/email-confirmation/:token" exact component={ConfirmEmail} /> */}
        <Route path="/error-page" exact component={ErrorPage} />
        <Route path="/password-recover" exact component={PasswordReset} />

        {/* <Route
          path="/password-recover/email-verification"
          exact
          component={EmailVerification}
        />
        <Route path="/auth/confirm-email/:token" exact component={ConfirmEmail} />
        <Route
          path="/auth/password-recovery/:token"
          exact
          component={ChangePassword}
        /> */}
        <RedirectHandler>
          <AppWrapper>
            {/* CLIENT */}
            <Route path="/client/dashboard" exact component={Dashboard} />
            <Route path="/client/extract" exact component={Extract} />
            <Route path="/client/profile" exact component={Profile} />
            <Route path="/admin/users" exact component={Users} />
          </AppWrapper >
        </RedirectHandler>
      </Switch >
    </BrowserRouter >
  );
}

export default Routes;