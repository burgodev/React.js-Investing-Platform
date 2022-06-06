import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import { validEmail } from "../../../../../_common/utils/functions";
import api from "../../../../../services/api";
import {
  Flex,
  Card,
  Typography,
  Button,
  TextField,
} from "../../../../../_common/components";
import { ROLES } from "../../../../../_common/utils/constants";
import { useSnackbar } from "../../../../../_common/hooks";
import logoAx from "../../../../../assets/images/logoAx.png";

const LoginForm = ({ classes }) => {
  const i18n = useTranslation().t;
  const [loading, setLoading] = useState(false);
  const [openSnackbar] = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const { data } = await api.post("auth/sign-in", values);

      localStorage.setItem("token", data.payload.token);
      localStorage.setItem("role", data.payload.role);
      localStorage.setItem("email", values.email);
      localStorage.setItem("user_name", data.payload.name);
      // history.push("/client/accounts/real-account");
      redirect(data.payload.role, data.payload.first_login);
    } catch (e) {
      openSnackbar("Credenciais inválidas", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validate}
    >
      {(formik) => (
        <Form>
          <Card className={classes.card}>
            <Flex center>
              <img src={logoAx} alt="logo ax bank" />
            </Flex>

            <Flex flexDirection="column">
              <TextField
                fullWidth
                variant="outlined"
                className={classes.inputFields}
                id="email"
                name="email"
                label="E-mail"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField
                fullWidth
                variant="outlined"
                className={classes.inputFields}
                id="password"
                name="password"
                label={i18n("login.password")}
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Flex>
            <Flex flexDirection="column" center>
              <Button
                type="submit"
                className={classes.button}
                loading={loading}
              >
                {i18n("login.enter")}
              </Button>
              <Typography
                element="a"
                url="/password-recover"
                className={classes.forgotPassword}
              >
                {i18n("login.password_forgot")}
              </Typography>
            </Flex>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

const initialValues = {
  email: "",
  password: "",
};

const validate = (values) => {
  const errors = {};

  if (!validEmail(values.email)) {
    errors.email = "Campo obrigatório *";
    return errors;
  }

  if (!values.password) {
    errors.password = "Campo obrigatório *";
    return errors;
  }

  return errors;
};

const redirect = (role, firstLogin) => {
  switch (role.toUpperCase()) {
    case ROLES.CLIENT: {
      if (firstLogin) {
        window.location.href = "/client/dashboard";
      } else {
        window.location.href = "/client/dashboard";
      }
      break;
    }
    case ROLES.ADMIN: {
      window.location.href = "/admin/users";
      break;
    }
    default: {
      window.location.href = "/";
      break;
    }
  }
};

export default withStyles((theme) => ({
  card: {
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: 524,
    height: 590,
    borderRadius: 20,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
    backgroundColor: theme.palette.black,
    [theme.breakpoints.down("lg")]: {
      width: 440,
      height: 486,
    },
  },
  typography: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "600",
  },
  button: {
    width: "100%",
    margin: "8px 0",
  },

  forgotPassword: {
    fontSize: "0.85rem",
    color: theme.palette.lightGrey,
    marginTop: "16px",
  },
  textButton: {
    fontSize: 12,
    color: theme.palette.main,
  },
  inputFields: {
    margin: "8px 0",
  },
}))(LoginForm);

LoginForm.propTypes = {
  classes: PropTypes.object,
};
