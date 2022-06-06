import React, { useState, useEffect, useCallback } from "react";
import { withStyles, Grid } from "@material-ui/core";
import PropTypes from "prop-types";

import { useSnackbar } from "../../../_common/hooks";
import { Table, Card, Typography, Button, Flex } from "../../../_common/components"
import api from "../../../services/api";
import { formatCurrency } from "../../../_common/utils/functions"
import moment from "moment";
import { monthList } from "../../../_common/utils/constants";

const Dashboard = ({ classes }) => {
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState(MOCK_USER)
  const [percentualGain, setPercentualGain] = useState([])
  const [openSnackbar] = useSnackbar();

  const getUserData = useCallback(async () => {
    try {
      setLoading(true);
      // const { data } = await api.get("/dashboard/user-data");      
      // setUserData(data.payload);
    } catch (e) {
      openSnackbar(e.response.data.message, "error")
    }
    finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPercentualGain = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/dashboard/percentual-gain-per-month");
      console.log("data ", data.payload)
      const arr = data.payload.map(item => ({
        percentual_liquid_profit: item.percentual_liquid_profit ? item.percentual_liquid_profit + "%" : "",
        month: monthList.find(({ id }) => id === item.month).name,
        year: item.year
      }))
      console.log(arr)      
      setPercentualGain(arr);
    } catch (e) {
      openSnackbar(e.response.data.message, "error")
    }
    finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUserData();
    getPercentualGain();
  }, [getUserData, getPercentualGain]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Card className={classes.card}>
          <Grid container spacing={3} >
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Typography className={classes.cardTitle}> Saldo em conta </Typography>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Flex center>
                <Typography className={classes.balance}>575.25 </Typography>
                {/* <Typography className={classes.balance}> {formatCurrency(userData.balance).replace("$", "")}  </Typography> */}
                <Typography className={classes.balance} fontSize={24} margin="0 0 0 8px">  USDX </Typography>
              </Flex>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button className={classes.button}> Visualizar contrato </Button>
            </Grid>
            <Grid item xs={6} className={classes.gridItemLeft}>
              <Typography className={classes.typography}> Data inicial </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridItemRight}>
              <Typography className={classes.grey}> {moment(userData.contract_started_at).format("DD/MM/YYYY")} </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridItemLeft}>
              <Typography className={classes.typography}> Data final </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridItemRight}>
              <Typography className={classes.grey}> {userData.contract_expires_at ? moment(userData.contract_expires_at).format("DD/MM/YYYY") : "10/10/2022"} </Typography>
            </Grid>
            <Grid item xs={7} className={classes.gridItemLeft}>
              <Typography className={classes.typography}> Saldo disponível para saque </Typography>
            </Grid>
            <Grid item xs={5} className={classes.gridItemRight}>
              <Typography className={classes.grey}> {formatCurrency(userData.available_for_withdraw_balance)} </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridItemLeft}>
              <Typography className={classes.typography}> Rendimento líquido </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridItemRight}>
              <Typography className={classes.grey}> {formatCurrency(userData.liquid_profit)} </Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Table
          tableHead={tableHead}
          items={MOCK}
          title="Ganho percentual por mês"
          loading={loading} />
      </Grid>
    </Grid>
  );
}

const MOCK_USER = {
  contract_started_at: "10/10/2021",
  contract_expires_at: "10/10/2022",
  available_for_withdraw_balance: 500.75,
  liquid_profit: 200.75
}

const tableHead = [
  {
    text: "Ganho",
    id: 1,
  },
  {
    text: "Mês",
    id: 2,
  },
  {
    text: "Ano",
    id: 3,
  },
]

const MOCK = [
  {
    gain: "2%",
    month: "Janeiro",
    year: 2021
  },
  {
    gain: "3%",
    month: "Fevereiro",
    year: 2021
  },
  {
    gain: "3.5%",
    month: "Março",
    year: 2021
  },
  {
    gain: "1.7%",
    month: "Abril",
    year: 2021
  },
  {
    gain: "1.8%",
    month: "Maio",
    year: 2021
  },
  {
    gain: "2.7%",
    month: "Junho",
    year: 2021
  },
  {
    gain: "3%",
    month: "Julho",
    year: 2021
  },
]

Dashboard.propTypes = {
  classes: PropTypes.object,
};

export default withStyles((theme) => ({
  card: {
    background: theme.palette.black,
    padding: "30px 22px",
    height: 400,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
    borderRadius: 20,
  },
  cardTitle: {
    color: theme.palette.lightGrey,
    fontSize: 24,
    fontWeight: 700,
    padding: 16,
    [theme.breakpoints.down("lg")]: {
      fontSize: 18,
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: 16,
    },
  },
  balance: {
    color: "#FFF",
    fontSize: 38,
    fonteWeight: 700,
    lineHeight: "45px",
    [theme.breakpoints.down("lg")]: {
      fontSize: 32,
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: 24,
    },
  },
  gridItemLeft: {
    padding: "6px 12px !important",
    textAlign: "left"
  },
  gridItemRight: {
    padding: "6px 12px !important",
    textAlign: "right",
  },
  grey: {
    color: theme.palette.lightGrey,
    [theme.breakpoints.down("lg")]: {
      fontSize: 14,
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: 12,
    },
  },
  typography: {
    [theme.breakpoints.down("lg")]: {
      fontSize: 14,
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: 12,
    },
  },
  button: {
    width: 220,
    marginBottom: 16,
  }

}))(Dashboard);

