import React from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import { Container } from "../../../_common/components";
import LoginForm from "./components/LoginForm";
import loginBackground from "../../../assets/images/loginBackground.jpg";

const Login = ({ classes }) => {
  return (
    <Container className={classes.container}>
      <LoginForm />
    </Container>
  );
}
export default withStyles((theme) => ({
  container: {
    height: "100vh",
    width: "100%",
    backgroundImage: `url(${loginBackground})`,
    backgroundSize: "cover",    
    display: "flex",
    alignItems: "center",
    justifyContent: "center"

  },

}))(Login);

Login.propTypes = {
  classes: PropTypes.object,
};
