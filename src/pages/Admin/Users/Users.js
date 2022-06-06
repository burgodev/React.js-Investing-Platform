import React, { useState, useEffect, useCallback } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import {
  Container,
  Table,
  Flex,
  Button,
} from "../../../_common/components";
import { useSnackbar } from "../../../_common/hooks";
import { tableHead } from "./utils";
import { ModalUser, ModalWithdraw, ModalUserFee } from "./components";
import api from "../../../services/api";
import { formatCurrency } from "../../../_common/utils/functions"


const MOCK = [
  {
    name: "Filipe Burgonovo",
    email: "burgodev@gmail.com",
    value: 500,
    startDate: "10/10/2021",
    lastUpdate: "10/06/2022",
    status: "Ativo",
  },
  {
    name: "Filipe Burgonovo",
    email: "burgodev@gmail.com",
    value: 500,
    startDate: "10/10/2021",
    lastUpdate: "10/06/2022",
    status: "Ativo",
  },
  {
    name: "Filipe Burgonovo",
    email: "burgodev@gmail.com",
    value: 500,
    startDate: "10/10/2021",
    lastUpdate: "10/06/2022",
    status: "Ativo",
  },
  {
    name: "Filipe Burgonovo",
    email: "burgodev@gmail.com",
    value: 500,
    startDate: "10/10/2021",
    lastUpdate: "10/06/2022",
    status: "Ativo",
  },
  {
    name: "Filipe Burgonovo",
    email: "burgodev@gmail.com",
    value: 500,
    startDate: "10/10/2021",
    lastUpdate: "10/06/2022",
    status: "Ativo",
  },

]

const Extract = ({ classes }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [openSnackbar] = useSnackbar();
  const [openModalUser, setOpenModalUser] = useState(false);
  const [openModalWithdraw, setOpenModalWithdraw] = useState(false);
  const [openModalUserFee, setOpenModalUserFee] = useState(false);
  const [userEdit, setUserEdit] = useState(false);
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();

  const getUsers = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/users");
      const arr = data.payload.map((item) => ({ ...item, balance: formatCurrency(item.balance) }))
      setUsers(arr);
    } catch (e) {
      openSnackbar(e.response?.data.message, "error");
    } finally {
      setLoading(false);
    }
  }, [openSnackbar]);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const actionList = [
    {
      id: 0,
      type: "list",
      onClick: (row) => {
        setUserId(row.id);
        setUserName(row.name);
      },
      list: [
        {
          text: "Editar usuário",
          onClick: () => {
            setUserEdit(true);
            setOpenModalUser(true);
          },
        },
        {
          text: "Editar ganhos",
          onClick: () => {
            setOpenModalUserFee(true);
          },
        },
        {
          text: "Saque",
          onClick: () => {
            setOpenModalWithdraw(true);
          },
        },
      ],
    },
  ];

  return (
    <Container className={classes.container}>
      {/* <Card className={classes.card}> */}

      <Flex className={classes.flexButton}>
        <Button
          className={classes.button}
          onClick={() => {
            setOpenModalUser(true);
            setUserEdit(false);
          }}
        >
          Novo usuário
        </Button>
      </Flex>
      {/* {!users.length ? (
        <Typography className={classes.noUsers} >Não há usuários cadastrados</Typography>
      ) : ( */}
      <Table
        tableHead={tableHead}
        items={MOCK}
        // items={users}
        title="Usuários"
        loading={loading}
        actions={actionList}
      />
      {/* )} */}
      {/* </Card> */}
      <ModalUser
        open={openModalUser}
        onClose={(reload) => {
          setOpenModalUser(false);
          if (reload)
            getUsers();
        }}
        edit={userEdit}
        id={userId}
      />
      <ModalWithdraw
        open={openModalWithdraw}
        id={userId}
        name={userName}
        onClose={(reload) => {
          setOpenModalWithdraw(false)
          if (reload)
            getUsers();
        }}
      />
      <ModalUserFee
        open={openModalUserFee}
        id={userId}
        name={userName}
        onClose={(reload) => {
          setOpenModalUserFee(false)
          if (reload)
            getUsers();
        }
        }
      />
    </Container>
  );
};

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
  },
  title: {
    color: theme.palette.lightGrey,
    fontSize: 24,
    fontWeight: 700,
    padding: "0 16px",
    [theme.breakpoints.down("lg")]: {
      fontSize: 18,
    },
  },
  button: {
    margin: "8px 0 16px",
  },
  noUsers: {
    [theme.breakpoints.down("lg")]: {
      fontSize: 14,
    },
  },
  flexButton: {
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },

  }
}))(Extract);

Extract.propTypes = {
  classes: PropTypes.object,
};
