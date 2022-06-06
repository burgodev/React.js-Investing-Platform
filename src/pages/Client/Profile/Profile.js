import React, { useEffect, useState } from "react";
import { withStyles, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";

import profile from "../../../assets/images/Vector.png";
import { useSnackbar } from "../../../_common/hooks";
import {
  Container,
  Card,
  Typography,
  TextField,
  Button,
  SelectCity,
  SelectState,
  SelectCountry,
  CepTextField,
} from "../../../_common/components";
import ModalChangePassword from "./components/ModalChangePassword";
import api from "../../../services/api";
import { TextMaskCpfCnpj, TextMaskTelefone } from "../../../_common/masks";

const Profile = ({ classes }) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openSnackbar] = useSnackbar();

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const { data } = await api.post("/users/update", {
        ...values,
        id: userData.id,
      });
      openSnackbar(data.message, "success");
    } catch (e) {
      openSnackbar(e.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const { data } = await api.get("/users/profile");
      setUserData(data.payload);
    } catch (error) { }
  };

  // if(!userData) return <Loading isLoading className={classes.loading} />

  return (
    <Formik
      initialValues={userData === null ? initialValues : userData}
      onSubmit={handleSubmit}
      validate={validate}
      enableReinitialize
    >
      {(formik) => (
        <Form className={classes.form}>
          <Container className={classes.container}>
            <Grid container spacing={10}>
              <Grid item xs={12} sm={5}>
                {/* componentizar esse card */}
                <Card className={classes.cardProfile}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography className={classes.title}> Perfil</Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                      <img
                        src={profile}
                        className={classes.img}
                        alt="profile"
                      />
                    </Grid>
                    <Grid item xs={12} align="center">
                      {/* <Typography className={classes.title}>
                        {" "}
                        {userData?.name}{" "}
                      </Typography> */}
                      <Typography className={classes.title}>
                        Admin
                      </Typography>
                    </Grid>

                    <Grid item xs={12} align="center">
                      <Button
                        className={classes.button}
                        onClick={() => setOpenChangePassword(true)}
                      >
                        Alterar senha
                      </Button>
                    </Grid>

                    <Grid item xs={12} className={classes.gridItem}>
                      <MailIcon color="primary" className={classes.icon} />
                      <Typography>admin@admin.com</Typography>
                      {/* <Typography>{userData?.email}</Typography> */}
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                      <PhoneIcon color="primary" className={classes.icon} />
                      <Typography>47 997055115</Typography>
                      {/* <Typography>{userData?.phone_number}</Typography> */}
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12} sm={7}>
                {/* componentizar esse card */}
                <Card className={classes.cardPersonalInformations}>
                  <Typography className={classes.title}>
                    Informações pessoais
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    className={classes.textField}
                    size="small"
                    id="name"
                    name="name"
                    label="Nome"
                    value={formik.values?.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />

                  <TextField
                    fullWidth
                    variant="outlined"
                    className={classes.textField}
                    size="small"
                    id="document_number"
                    name="document_number"
                    label="CPF"
                    value={formik.values?.document_number}
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

                  <TextField
                    fullWidth
                    variant="outlined"
                    className={classes.textField}
                    size="small"
                    id="email"
                    name="email"
                    label="E-mail"
                    value={formik.values?.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    className={classes.textField}
                    size="small"
                    id="phone_number"
                    name="phone_number"
                    label="Celular"
                    value={formik.values?.phone_number}
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

                  <CepTextField
                    initialValue={formik.values?.zipcode}
                    className={classes.textField}
                  />
                  <SelectCountry
                    formik={formik}
                    onChange={(value) => formik.setFieldValue("country", value)}
                    initialValue={formik.values?.country}
                    className={classes.textField}
                  />
                  <SelectState
                    formik={formik}
                    onChange={(e) =>
                      formik.setFieldValue("state", e.target.value)
                    }
                    initialValue={formik.values?.state}
                    className={classes.textField}
                  />
                  <SelectCity
                    formik={formik}
                    onChange={(e) =>
                      formik.setFieldValue("city", e.target.value)
                    }
                    initialValue={formik.values?.city}
                    className={classes.textField}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    className={classes.textField}
                    size="small"
                    id="address_line"
                    name="address_line"
                    label="Endereço"
                    value={formik.values?.address_line}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.address_line &&
                      Boolean(formik.errors.address_line)
                    }
                    helperText={
                      formik.touched.address_line && formik.errors.address_line
                    }
                  />

                  <Button type="submit" margin="16px auto 0" loading={loading}>
                    Salvar
                  </Button>
                </Card>
              </Grid>
            </Grid>
            <ModalChangePassword
              open={openChangePassword}
              onClose={() => setOpenChangePassword(false)}
            />
          </Container>
        </Form>
      )}
    </Formik>
  );
};

const initialValues = {
  name: "",
  email: "",
  phone_number: "",
};

const validate = (values) => {
  // arrumar validate conforme campos esperados
  const errors = {};

  if (!values.name) {
    errors.name = "Campo obrigatório *";
    return errors;
  }

  if (!values.document_number) {
    errors.document_number = "Campo obrigatório *";
    return errors;
  }

  if (!values.email) {
    errors.email = "Campo obrigatório *";
    return errors;
  }

  if (!values.phone_number) {
    errors.phone_number = "Campo obrigatório *";
    return errors;
  }

  return errors;
};

Profile.propTypes = {
  classes: PropTypes.object,
};

export default withStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardProfile: {
    padding: 30,
    width: "80%"
  },
  flex: {
    flexDirection: "column",
    alignItems: "center",
  },
  cardPersonalInformations: {
    padding: 32,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: theme.palette.lightGrey,
    marginBottom: 16,
    [theme.breakpoints.down("lg")]: {
      fontSize: 18,
    },
  },
  textField: {
    margin: "10px 0",
  },
  button: {
    margin: "16px 0 24px",
  },
  gridItem: {
    alignItems: "center",
    display: "flex",
  },
  img: {
    height: 120,
    width: 120,
    margin: "32px 0 16px",
  },
  icon: {
    marginRight: 12,
  },
  loading: {
    margin: "auto",
  },
}))(Profile);
