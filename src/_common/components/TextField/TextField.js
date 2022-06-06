import React from "react";
import { withStyles, TextField as MuiTextField } from "@material-ui/core";
import PropTypes from "prop-types";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { theme } from "../../utils/theme";

const Textfield = ({ select, children, ...props }) => {
  const matches = useMediaQuery(theme.breakpoints.down('lg'));
  return select ? (
    <TextField size={matches ? "small" : "medium"} InputLabelProps={{ shrink: true }} select {...props}>
      {children}
    </TextField>
  ) : (
    <TextField size={matches ? "small" : "medium"} InputLabelProps={{ shrink: true }}{...props} />
  );
};

const TextField = withStyles({
  root: {
    "& MuiSelect-icon ": {
      color: theme.palette.main,
    },
    "& MuiMenuItem-root ": {
      color: theme.palette.white,
    },
    "& label.Mui-focused": {
      color: theme.palette.white,
    },
    "& input": {
      color: theme.palette.white,
    },
    "& label": {
      color: theme.palette.white,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.main,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#848484",
      },
      "&:hover fieldset": {
        borderColor: theme.palette.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: "#848484 !important",
      },
    },
    "& .MuiSelect-root": {
      color: theme.palette.white,
      "& icon": {
        color: theme.palette.main,
      },
    },
  },
})(MuiTextField);

export default withStyles((theme) => ({}))(Textfield);

Textfield.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.object,
  select: PropTypes.bool,
};
