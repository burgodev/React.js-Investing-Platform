import React from "react";
import PropTypes from "prop-types";
import { Dialog, withStyles } from "@material-ui/core";

import ModalUser from "./ModalUser";

const User = ({ open, onClose, classes, user, id, edit = false }) => {
  return (
    <Dialog
      classes={{
        paper: classes.paper,
      }}
      maxWidth="lg"
      open={open}
      onClose={onClose}
    >
      <ModalUser onClose={onClose} edit={edit} user={user} id={id} />
    </Dialog>
  );
};

User.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  classes: PropTypes.object,
  edit: PropTypes.bool,
  user: PropTypes.object,
};

export default withStyles(() => ({
  paper: {
    borderRadius: 20,
  },
}))(User);
