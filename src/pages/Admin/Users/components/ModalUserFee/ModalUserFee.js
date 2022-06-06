import React, { useCallback, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";
import { withStyles, Grid, MenuItem } from "@material-ui/core";
// import moment from "moment";

import {
  Button,
  Typography,
  Card,
  TextField,
  Flex,
} from "../../../../../_common/components";
import { useSnackbar } from "../../../../../_common/hooks";
import api from "../../../../../services/api";
import { monthList, yearList } from "../../../../../_common/utils/constants";
import { TextMaskPorcentage } from "../../../../../_common/masks";


const ModalUserFee = ({ classes, id, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [openSnackbar] = useSnackbar();
  const [gainList, setGainList] = useState([]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);      
      await api.post(`/transaction/gain`, {
        profit: Number(values.profit.replace("%", "")),
        month: Number(values.month),
        year: Number(values.year),
        user_id: id,
      });
      onClose(true);
      openSnackbar("Alterações salvas com sucesso", "success");
    } catch (error) {
      openSnackbar(error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const getGainList = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.post("/transaction/list", {
        user_id: id,
        type: "GAIN",
      });

      setGainList(data.payload.list);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getGainList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getGainList]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validate}
      enableReinitialize
    >
      {(formik) => (
        <Form>
          <Card className={classes.card}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography className={classes.typography}>Usuário</Typography>
              </Grid>

              <Grid item xs={12} className={classes.gridItem2}>
                <Typography>Controle de ganhos (USDX)</Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="profit"
                  name="profit"
                  label="Adicione percentual de ganho do mês (Lucro bruto)"
                  value={formik.values.profit}
                  onChange={formik.handleChange}
                  error={formik.touched.profit && Boolean(formik.errors.profit)}
                  helperText={formik.touched.profit && formik.errors.profit}
                  className={classes.margin}
                  InputProps={{
                    inputComponent: TextMaskPorcentage,
                  }}
                />
              </Grid>

              <Grid item xs={6} className={classes.gridItem2}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="month"
                  name="month"
                  label="Mês"
                  select
                  value={formik.values.month}
                  onChange={formik.handleChange}
                >
                  {monthList.map((month) => (
                    <MenuItem value={month.id} key={month.id}>
                      {month.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} className={classes.gridItem2}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="year"
                  name="year"
                  label="Ano"
                  select
                  value={formik.values.year}
                  onChange={formik.handleChange}
                >
                  {yearList.map((year) => (
                    <MenuItem value={year} key={year}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <Typography>Últimas atualizações</Typography>
              </Grid>
              {gainList.length === 0 && (
                <Typography>Este usuário ainda não possui ganhos</Typography>
              )}
              {gainList.map((gain) => (
                <Grid item xs={12} className={classes.updateList}>
                  <Flex flexDirection="column">
                    <Typography className={classes.percentage}>
                      10% mock
                    </Typography>
                    <Typography fontSize={14}>
                      {/* {moment(gain.created_at).format("DD/MM/YYYY")} -{" "} */}
                      {monthList.find(({ id }) => id === gain.gain_month).name}{" "}/{" "}
                      {gain.gain_year}
                    </Typography>
                  </Flex>
                  <Typography fontSize={14}>{gain.balance}{" "} {"USDX"}</Typography>
                </Grid>
              ))}

              <Grid item xs={12}>
                <Button
                  type="submit"
                  className={classes.button}
                  loading={loading}
                >
                  Adicionar ganho
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

ModalUserFee.propTypes = {
  classes: PropTypes.object,
  user: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  onClose: PropTypes.func,
};

const initialValues = { profit: "", month: "", year: "" };

const validate = (values) => {
  const errors = {};

  if (!values.profit) {
    errors.profit = "Campo obrigatório *";
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
    fontWeight: "700",
    marginBottom: 16,
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
  percentage: {
    color: theme.palette.lightGrey,
    fontWeight: 700,
  },
  margin: {
    margin: "18px 0",
  },
  updateList: {
    border: "1px dashed #CD1C35",
    borderRadius: 10,
    padding: "16px 16px !important",
    margin: "8px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  gridItem: {
    paddingBottom: "0 !important",
    marginTop: 24,
  },
  gridItem2: {
    padding: "0 12px !important",
  },
}))(ModalUserFee);
