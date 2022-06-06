import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

const Card = ({
  children,
  className,
  style,
  classes,
  width,
  height,
  background,
  clean,
  ...props
}) => (
  <div
    className={`${classes.root} ${className}`}
    style={{ width, height, background, ...style }}
    {...props}
  >
    {children}
  </div>
);

Card.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
};

Card.defaultProps = {};


export default withStyles((theme) => ({
  root: {
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
    borderRadius: 20,
    background: theme.palette.black,
  },
}))(Card);

