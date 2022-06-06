import React, { useState, useEffect, useCallback } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import {
  Container,
  Table,
} from "../../../_common/components";
import { useSnackbar } from "../../../_common/hooks";
import { tableHead } from "./utils";
import api from "../../../services/api";
import { formatCurrency } from "../../../_common/utils/functions"

const Extract = ({ classes }) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [openSnackbar] = useSnackbar();

  const getList = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/transaction", {
        type: "",
        take: 10,
        skip: 0,
        order_by: "asc",
        order_type: "asc",
      });

      const obj = data.payload.list.map(({ balance, created_at, type }) => ({ created_at, type, balance: formatCurrency(balance) }))
      console.log("obj", obj);
      setList(obj);
    } catch (e) {
      openSnackbar(e.response?.data.message, "error");
    } finally {
      setLoading(false);
    }
  }, [openSnackbar]);

  useEffect(() => {
    getList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className={classes.container}>
      {/* <Card className={classes.card}>
        <Typography className={classes.typography}> Extrato </Typography> */}
      <Table tableHead={tableHead} items={MOCK} title="Extrato" loading={loading} />
      {/* </Card> */}
    </Container>
  );
};

const MOCK = [
  {
    date: "10/10/2021",
    type: "Saque",
    value: 100.78,
  },
  {
    date: "08/09/2021",
    type: "Saque",
    value: 150.44,
  },
  {
    date: "09/09/2021",
    type: "Saque",
    value: 200.78,
  },
  {
    date: "09/09/2021",
    type: "Depósito",
    value: 100,
  },
  {
    date: "10/07/2021",
    type: "Saque",
    value: 500.33,
  },
  {
    date: "10/06/2021",
    type: "Saque",
    value: 200,
  },
  {
    date: "10/05/2021",
    type: "Saque",
    value: 55,
  },
  {
    date: "10/04/2021",
    type: "Saque",
    value: 80.50,
  },
]

export default withStyles((theme) => ({
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  card: {
    background: theme.palette.black,
    padding: "30px 22px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
    borderRadius: 20,
    width: "100%",
    [theme.breakpoints.only("xs")]: {
      width: "max-content"
    },
  },
  typography: {
    color: theme.palette.lightGrey,
    fontSize: 24,
    fontWeight: 700,
    padding: 16,
    [theme.breakpoints.down("lg")]: {
      fontSize: 18,
    },
  },
}))(Extract);

Extract.propTypes = {
  classes: PropTypes.object,
};
