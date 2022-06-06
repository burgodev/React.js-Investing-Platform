import React from "react";
import PropTypes from "prop-types";
import { Dialog, withStyles } from "@material-ui/core";

import ModalChangePassword from "./ModalChangePassword";

const ChangePassword = ({ open, onClose, classes }) => {
    return (
        <Dialog
            classes={{
                paper: classes.paper,
            }}
            maxWidth="lg"
            open={open}
            onClose={onClose}
        >
            <ModalChangePassword onClose={onClose}/>
        </Dialog>
    );
};

ChangePassword.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    classes: PropTypes.object,
    operations: PropTypes.func,
};

export default withStyles(() => ({
    paper: {
        borderRadius: 20,
    },
}))(ChangePassword);
