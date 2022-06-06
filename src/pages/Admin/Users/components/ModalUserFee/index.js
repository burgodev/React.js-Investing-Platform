import React from "react";
import PropTypes from "prop-types";
import { Dialog, withStyles } from "@material-ui/core";

import ModalUserFee from "./ModalUserFee";

const UserFee = ({ open, onClose, classes, id, name }) => {
  return (
    <Dialog
      classes={{
        paper: classes.paper,
      }}
      maxWidth="lg"
      open={open}
      onClose={onClose}
    >
      <ModalUserFee onClose={onClose} id={id} name={name} />
    </Dialog>
  );
};

UserFee.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  classes: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
};

export default withStyles(() => ({
  paper: {
    borderRadius: 20,
  },
}))(UserFee);
