import React, { useState } from "react";
import PropTypes from "prop-types";
import Fab from '@material-ui/core/Fab';
import Sidebar from "../../../_common/components/Sidebar";
import { withStyles, Dialog } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { theme } from "../../utils/theme";

import { Header, Container } from "../"

const AppWrapper = ({ classes, children }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container className={classes.container}>
      {mobile ?
        // <Flex className={classes.fabFlex}>
        <>
          <Fab onClick={() => setOpenMenu(true)} aria-label="edit" className={classes.fab}>
            <MenuIcon fontSize="large" />
          </Fab>
          <Dialog
            maxWidth="sm"
            open={openMenu}
            onClose={() => setOpenMenu(false)}
          >
            <Sidebar onClose={() => setOpenMenu(false)} />
          </Dialog>
        </>
        // </Flex>
        :
        <>
          <Sidebar />
          <Header />
        </>
      }

      <div className={classes.content}>
        {children}
      </div>

    </Container >
  );
}

AppWrapper.propTypes = {
  children: PropTypes.array,
  classes: PropTypes.object,
};

export default withStyles((theme) => ({
  container: {
    width: "100vw",
    height: "100vh",
    background: theme.palette.background,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    width: "calc(100vw - 300px)",
    padding: "4vh 2vw",
    overflowY: "auto",
    overflowX: "hidden",
    height: "calc(100vh - 120px)",
    position: "fixed",
    background: theme.palette.background,
    bottom: 0,
    right: 0,
    [theme.breakpoints.down("lg")]: {
      width: "calc(100vw - 240px)",
    },
    [theme.breakpoints.down("sm")]: {
      height: "90vh",
      width: "100vw",
      overflowX: "auto",
      marginTop: "10vh"
    },
  },
  fab: {
    margin: "12px",
    position: "fixed",
    top: 0,
    zIndex: 1,
    background: theme.palette.lightGrey
  },
  fabFlex: {
    height: "10vh",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
  }
}))(AppWrapper);
