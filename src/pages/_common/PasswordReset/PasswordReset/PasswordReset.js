import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import loginBackground from "../../../../assets/images/loginBackground.jpg";
import logoAx from "../../../../assets/images/logoAx.png";

import {
  Flex,
  Button,
  Card,
  Typography,
  Container,
  TextField
} from "../../../../_common/components";
import { useSnackbar } from "../../../../_common/hooks";
import api from "../../../../services/api";

PropTypes.propTypes = {
  classes: PropTypes.object,
};

const initialValues = { email: "" };

const validMail = (mail) => {
  // eslint-disable-next-line no-useless-escape
  return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
    mail
  );
};

const validate = (values) => {
  const errors = {};

  if (!values.email.length) {
    errors.email = "Campo obrigatório *";
    return errors;
  }

  if (!validMail(values.email)) {
    errors.email = "E-mail inválido";
    return errors;
  }

  return errors;
};

const PasswordReset = ({ classes }) => {
  const history = useHistory();
  const i18n = useTranslation().t;
  const [loading, setLoading] = useState(false);
  const [openSnackbar] = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await api.post(`/auth/request-password-recovery`, values);

      history.push("/password-recover/email-verification");
    } catch (error) {
      openSnackbar(error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className={classes.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validate}
      >
        {(bag) => (
          <Form>
            <Card className={classes.card}>
              <Flex center>
                <img
                  src={logoAx}
                  alt="logo ax bank"
                  className={classes.image}
                />
              </Flex>
              <Flex center flexDirection="column" justifyContent="space-around" style={{ height: "20vh" }}>
                <Typography element="p" fontSize={20} style={{ width: 280 }}>
                  {i18n("passwordReset.description")}
                </Typography>


                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  name="email"
                  label="E-mail"
                  // InputLabelProps={{ shrink: true }}                  
                  value={bag.values.email}
                  onChange={bag.handleChange}
                  error={bag.touched.email && Boolean(bag.errors.email)}
                  helperText={bag.touched.email && bag.errors.email}
                />
              </Flex>


              <Flex flexDirection="column" margin="8px 0 0 0" justifyContent="space-between" style={{ height: "12vh" }}>
                <Button
                  type="submit"
                  className={classes.button}
                  loading={loading}
                >
                  Recuperar senha
                </Button>

                <Button
                  disabled={loading}
                  variant="text"
                  onClick={() => history.push("/")}
                >
                  {i18n("passwordReset.back")}
                </Button>
              </Flex>
            </Card>
          </Form>
        )}
      </Formik>
    </Container >
  );
};

export default withStyles((theme) => ({
  card: {
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
    padding: "48px 32px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: 590,
    width: 524,
    borderRadius: 20,
    background: theme.palette.black,
  },
  typography: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.palette.main,
  },
  flex: {
    marginTop: 48,
    marginBottom: 52,
  },
  button: {
    width: "100%",
    margin: "8px 0",
  },
  container: {
    height: "100vh",
    width: "100vw",
    backgroundImage: `url(${loginBackground})`,
    backgroundSize: "cover",
    backgroundPositionX: "right",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
  },
}))(PasswordReset);
