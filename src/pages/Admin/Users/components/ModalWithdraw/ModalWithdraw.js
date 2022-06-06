import React, { useCallback, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";
import { withStyles, Grid, InputAdornment } from "@material-ui/core";
import moment from "moment";

import {
  Button,
  Typography,
  Card,
  TextField,
  Flex,
} from "../../../../../_common/components";
import { useSnackbar } from "../../../../../_common/hooks";
import api from "../../../../../services/api";

const ModalWithdraw = ({ classes, onClose, name, id }) => {
  const [loading, setLoading] = useState(false);
  const [withdrawList, setWithdrawList] = useState([]);
  const [userBalance, setUserBalance] = useState(0);
  const [openSnackbar] = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (Number(values.amount) > userBalance) {
        openSnackbar("Saldo insuficiente para saque", "error");
      } else {
        await api.post(`/transaction/withdraw`, {
          user_id: id,
          amount: Number(values.amount),
        });
        openSnackbar("Saque solicitado com sucesso", "success");
      }
      onClose(true)
    } catch (error) {
      openSnackbar(error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const getWithdrawList = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await api.post("/transaction/list", {
        user_id: id,
        type: "WITHDRAW",
      });

      setWithdrawList(data.payload.list);
      console.log(data.payload.list);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [id]);

  const getUserBalance = useCallback(async () => {
    try {
      const { data } = await api.post("/users/", {
        id: id,
      });
      console.log("user data:", data);
      setUserBalance(data.payload.balance);
    } catch (error) { }
  }, [id]);

  useEffect(() => {
    getWithdrawList();
    getUserBalance();
  }, [getWithdrawList, getUserBalance]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validate}
    >
      {(formik) => (
        <Form>
          <Card className={classes.card}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography className={classes.typography}>{name}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography>Saque</Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="amount"
                  name="amount"
                  label="Valor do saque"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  error={formik.touched.amount && Boolean(formik.errors.amount)}
                  helperText={formik.touched.amount && formik.errors.amount}
                  className={classes.margin}
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
                <Typography className={classes.availableBalance}>
                  Saldo disponível para saque: {userBalance} USDX
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <Typography>Últimos saques solicitados</Typography>
              </Grid>

              {withdrawList.map(({ created_at, balance }) => (
                <Grid item xs={12}>
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    className={classes.withdrawList}
                  >
                    <Typography>
                      {" "}
                      {moment(created_at).format("DD/MM/YYYY")}
                    </Typography>
                    <Typography>{balance} {" "} USDX</Typography>
                  </Flex>
                </Grid>
              ))}

              <Grid item xs={12}>
                <Button
                  type="submit"
                  className={classes.button}
                  loading={loading}
                >
                  Sacar valor
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

ModalWithdraw.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string,
  id: PropTypes.string,
  onClose: PropTypes.func
};

const initialValues = { amount: "" };

const validate = (values) => {
  const errors = {};

  if (!values.amount) {
    errors.amount = "Campo obrigatório *";
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
    margin: "32px 0 16px",
  },
  textfield: {
    margin: "16px 0 8px",
  },
  availableBalance: {
    color: theme.palette.lightGrey,
    fontWeight: 700,
    marginBottom: 32,
  },
  margin: {
    margin: "18px 0",
  },
  withdrawList: {
    boxSizing: "border-box",
    width: 42,
    height: 44,
    border: "1px dashed #CD1C35",
    borderRadius: 10,
    padding: "32px 16px",
  },
  gridItem: {
    paddingBottom: "0 !important",
    marginTop: 24,
  },
}))(ModalWithdraw);
