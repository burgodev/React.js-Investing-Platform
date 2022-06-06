import React from "react";
import PropTypes from "prop-types";
import { Dialog, withStyles } from "@material-ui/core";

import ModalWithdraw from "./ModalWithdraw";

const Withdraw = ({ open, id, name, onClose, classes }) => {
  return (
    <Dialog
      classes={{
        paper: classes.paper,
      }}
      maxWidth="lg"
      open={open}
      onClose={onClose}
    >
      <ModalWithdraw onClose={onClose} id={id} name={name} />
    </Dialog>
  );
};

Withdraw.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  classes: PropTypes.object,
};

export default withStyles(() => ({
  paper: {
    borderRadius: 20,
  },
}))(Withdraw);
