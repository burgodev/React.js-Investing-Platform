import React, { useCallback, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";

import {
  withStyles,
  Grid,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormHelperText,
  InputAdornment
} from "@material-ui/core";

import {
  Button,
  Typography,
  Card,
  TextField,
} from "../../../../../_common/components";
import { useSnackbar } from "../../../../../_common/hooks";
import api from "../../../../../services/api";
import { TextMaskCpfCnpj, TextMaskTelefone } from "../../../../../_common/masks";

const ModalUser = ({ classes, edit, id, onClose }) => {
  const [userData, setUserData] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [openSnackbar] = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      if (edit) {
        const { data } = await api.post("/users/update", {
          id: id,
          email: values.email,
          name: values.name,
          phone_number: values.phone_number,
          document_number: values.document_number,
          is_active: values.is_active,
        });
        openSnackbar(data.message, "success");

      } else if (!edit) {
        const { data } = await api.post(`/users/new`, {
          email: values.email,
          name: values.name,
          phone_number: values.phone_number,
          document_number: values.document_number,
          is_active: values.is_active,
          password: values.password,
          balance: Number(values.balance),
          period: Number(values.period),
        });
        openSnackbar(data.message, "success");
      }
      onClose(true);
    } catch (error) {
      openSnackbar(error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const getUserData = useCallback(async () => {
    try {
      const { data } = await api.post("/users", {
        id: id,
      });
      setUserData(data.payload);
    } catch (error) { }
  }, [id]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <Formik
      initialValues={edit ? userData : initialValues}
      onSubmit={handleSubmit}
      validate={(values) => validate(values, edit)}
      enableReinitialize
    >
      {(formik) => (
        <Form>
          <Card className={classes.card}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography className={classes.typography}>
                  {edit ? "Editar Usuário" : "Novo Usuário"}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="balance"
                  name="balance"
                  label="Saldo inicial (USDX)"
                  type="number"
                  value={formik.values.balance}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.balance && Boolean(formik.errors.balance)
                  }
                  helperText={formik.touched.balance && formik.errors.balance}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  disabled={edit ? true : false}
                // InputProps={{ inputComponent: TextMaskNumber, inputProps: { length: 8 } }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="is_active"
                  name="is_active"
                  label="Status"
                  select
                  value={formik.values.is_active}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.is_active && Boolean(formik.errors.is_active)
                  }
                  helperText={
                    formik.touched.is_active && formik.errors.is_active
                  }
                >
                  <MenuItem value={true} key={"Ativo"}>
                    Ativo
                  </MenuItem>
                  <MenuItem value={false} key={"Inativo"}>
                    Inativo
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <FormLabel component="legend">Período</FormLabel>
                <RadioGroup
                  aria-label="period1"
                  name="period"
                  value={formik.values.period?.toString()}
                  onChange={formik.handleChange}
                  style={{ flexDirection: "row" }}
                  disabled={edit ? true : false}
                >
                  <FormControlLabel
                    value="12"
                    control={<Radio />}
                    label="12 meses"
                    disabled={edit ? true : false}
                  />
                  <FormControlLabel
                    value="18"
                    control={<Radio />}
                    label="18 meses"
                    disabled={edit ? true : false}
                  />
                  <FormControlLabel
                    value="24"
                    control={<Radio />}
                    label="24 meses"
                    disabled={edit ? true : false}
                  />
                  <FormHelperText style={{ color: "#CD1C35" }}>
                    {formik.touched.period && formik.errors.period}
                  </FormHelperText>
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="name"
                  name="name"
                  label="Nome"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="document_number"
                  name="document_number"
                  label="CPF"
                  value={formik.values.document_number}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.document_number &&
                    Boolean(formik.errors.document_number)
                  }
                  helperText={
                    formik.touched.document_number &&
                    formik.errors.document_number
                  }
                  InputProps={{
                    inputComponent: TextMaskCpfCnpj,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="phone_number"
                  name="phone_number"
                  label="Celular"
                  value={formik.values.phone_number}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.phone_number &&
                    Boolean(formik.errors.phone_number)
                  }
                  helperText={
                    formik.touched.phone_number && formik.errors.phone_number
                  }
                  InputProps={{
                    inputComponent: TextMaskTelefone,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  disabled={edit ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  className={classes.button}
                  loading={loading}
                >
                  {edit ? "Editar usuário" : "Criar novo usuário"}
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

ModalUser.propTypes = {
  classes: PropTypes.object,
  showLogin: PropTypes.func,
  showPasswordReset: PropTypes.func,
  user: PropTypes.object,
  id: PropTypes.string,
  onClose: PropTypes.func,
};

const initialValues = {
  email: "",
  is_active: true,
  name: "",
  document_number: "",
  phone_number: "",
  password: "",
  balance: "",
  period: "",
};

const validate = (values, edit) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Campo obrigatório *";
    return errors;
  }

  if (!values.name) {
    errors.name = "Campo obrigatório *";
    return errors;
  }

  if (!values.document_number) {
    errors.document_number = "Campo obrigatório *";
    return errors;
  }

  if (!values.phone_number) {
    errors.phone_number = "Campo obrigatório *";
    return errors;
  }

  if (!values.password && !edit) {
    errors.password = "Campo obrigatório *";
    return errors;
  }

  if (!values.balance && !edit) {
    errors.balance = "Campo obrigatório *";
    return errors;
  }

  if (!values.period && !edit) {
    errors.period = "Campo obrigatório *";
    return errors;
  }

  if (!values.is_active && !edit) {
    errors.is_active = "Campo obrigatório *";
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
  },
  typography: {
    color: theme.palette.main,
    fontSize: 24,
    fontWeight: "600",
  },
  button: {
    width: "100%",
    // margin: "24px 0 8px",
  },
  textfield: {
    margin: "8px 0",
  },
}))(ModalUser);
