import React from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import PersonIcon from "@material-ui/icons/Person";
import logoAx from "../../../assets/images/logoAx.png";
import { Flex, Container, Typography } from "../";

const Header = ({ classes }) => {
  let location = useLocation();
  location = location.pathname.split("/")[2];
  const name = localStorage.getItem("user_name");

  return (
    <Container className={classes.container}>
      <Flex className={classes.flex}>
        <img src={logoAx} alt="logo ax bank" className={classes.image} />
        <Flex alignItems="center" justifyContent="flex-end">
          <Typography fontSize={14} fontWeight={700}>
            {" "}
            Bem vindo, Admin
          </Typography>
          <Typography className={classes.name}> {name} </Typography>
          <PersonIcon className={classes.icon} color="primary" />
        </Flex>
      </Flex>
      <Flex
        style={{
          background: "#383838",
          height: "51px",
          width: "100%",
          padding: "0 24px",
        }}
        alignItems="center"
      >
        <Typography
          style={{
            textTransform: "capitalize",
            color: "white",
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          {location}
        </Typography>
      </Flex>
    </Container>
  );
};

export default withStyles((theme) => ({
  container: {
    display: "flex",
    position: "fixed",
    width: "100vw",
    flexDirection: "column",
  },
  image: {
    height: 54,
    width: 132,
  },
  flex: {
    background: theme.palette.black,
    height: "69px",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 32px 0 24px",
  },
  icon: {
    fontSize: 28,
  },
  name: {
    fontSize: 14,
    margin: "0 8px",
  },
}))(Header);

Header.propTypes = {
  classes: PropTypes.object,
};
