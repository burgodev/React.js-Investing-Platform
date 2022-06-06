import React, { useState } from "react";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

import {
  Flex,
  Button,
  Typography,
  Card,
  TextField,
} from "../../../../../_common/components";
import { useSnackbar } from "../../../../../_common/hooks";
import api from "../../../../../services/api";

const ModalChangePassword = ({ classes, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [openSnackbar] = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const response = await api.post(`/users/password-change`, {
        old_password: values.old_password,
        new_password: values.new_password,
      });
      openSnackbar(response.data.message, "success");
    } catch (error) {
      openSnackbar(error.response.data.message, "error");
      onClose(true);
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
      {(bag) => (
        <Form>
          <Card className={classes.card}>
            <Typography className={classes.typography}>
              Alterar senha
            </Typography>
            <Flex flexDirection="column">
              <TextField
                variant="outlined"
                fullWidth
                id="old_password"
                name="old_password"
                type="password"
                label="Senha atual"
                value={bag.values.old_password}
                onChange={bag.handleChange}
                error={
                  bag.touched.old_password && Boolean(bag.errors.old_password)
                }
                helperText={bag.touched.old_password && bag.errors.old_password}
                className={classes.textfield}
              />

              <TextField
                variant="outlined"
                type="password"
                fullWidth
                id="new_password"
                name="new_password"
                label="Nova senha"
                value={bag.values.new_password}
                onChange={bag.handleChange}
                error={
                  bag.touched.new_password && Boolean(bag.errors.new_password)
                }
                helperText={bag.touched.new_password && bag.errors.new_password}
                className={classes.textfield}
              />

              <TextField
                variant="outlined"
                type="password"
                fullWidth
                id="confirm_new_password"
                name="confirm_new_password"
                label="Confirme sua nova senha"
                value={bag.values.confirm_new_password}
                onChange={bag.handleChange}
                error={
                  bag.touched.confirm_new_password &&
                  Boolean(bag.errors.confirm_new_password)
                }
                helperText={
                  bag.touched.confirm_new_password &&
                  bag.errors.confirm_new_password
                }
                className={classes.textfield}
              />
            </Flex>
            <Flex flexDirection="column">
              <Button
                type="submit"
                className={classes.button}
                loading={loading}
              >
                Salvar
              </Button>
            </Flex>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

ModalChangePassword.propTypes = {
  classes: PropTypes.object,
  showLogin: PropTypes.func,
  showPasswordReset: PropTypes.func,
  onClose: PropTypes.func,
};

const initialValues = {
  old_password: "",
  new_password: "",
  confirm_new_password: "",
};

const validate = (values) => {
  const errors = {};

  if (!values.old_password.length) {
    errors.old_password = "Campo obrigatório *";
    return errors;
  }

  if (!values.new_password.length) {
    errors.new_password = "Campo obrigatório *";
    return errors;
  }

  if (values.confirm_new_password !== values.new_password) {
    errors.confirm_new_password = "As senhas precisam ser iguais";
    return errors;
  }

  return errors;
};

export default withStyles((theme) => ({
  card: {
    width: 600,
    padding: "32px 32px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: 540,
  },
  typography: {
    color: theme.palette.main,
    fontSize: 24,
    fontWeight: "600",
  },
  button: {
    width: "100%",
    margin: "8px 0",
  },
  textfield: {
    margin: "12px 0",
  },
}))(ModalChangePassword);
