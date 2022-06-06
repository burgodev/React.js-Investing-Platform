import React, { useEffect, useState } from "react";
import { Badge, Popover, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { FiBell } from "react-icons/fi";
import { theme } from "../../utils/theme";
import { Flex, Typography } from "../";
import api from "../../../services/api";

const Notifications = ({ classes }) => {
  const i18n = useTranslation().t;
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [newNotifications, setNewNotifications] = useState(false);

  useEffect(() => {
    getNotifications();

    // socket?.on("notification", data => {
    //   setNotifications(prev => [...prev, data]);
    //   setNewNotifications(true);
    // });
  }, []);

  const getNotifications = async () => {
    try {
      const { data } = await api.get("/notifications/");
      const formatedNotifications = data.payload?.list?.map((n) => ({
        id: n.id,
        datetime: n.datetime,
        text: n.text_args,
        is_read: n.is_read,
      }));
      setNotifications(formatedNotifications.reverse());
      setNewNotifications(
        formatedNotifications.find((n) => !n.is_read) != null
      );
    } catch (e) {
      console.log(e);
    }
  };

  const markAsReaded = async () => {
    const ids = notifications.filter((n) => !n.is_read).map((n) => n.id);
    await api.post("/notifications/readed", {
      notifications: ids,
    });
  };

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
    setNewNotifications(false);
    await markAsReaded();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const idPopover = open ? "simple-popover" : undefined;

  return (
    <>
      <Typography className={classes.icon} onClick={handleClick}>
        {newNotifications ? (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            <FiBell size={23} color={theme.palette.white} />
          </StyledBadge>
        ) : (
          <FiBell size={23} color={theme.palette.white} />
        )}
      </Typography>
      <Popover
        id={idPopover}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Flex className={classes.flex}>
          {notifications.map((noti) => (
            <Flex key={noti.id} className={classes.flexNotification}>
              <Typography className={classes.typography}>
                {noti.text}
              </Typography>
            </Flex>
          ))}
          {!notifications.length && (
            <Typography color="white" className={classes.underline}>
              {" "}
              {i18n("notifications.none")}{" "}
            </Typography>
          )}
        </Flex>
      </Popover>
    </>
  );
};

Notifications.propTypes = {
  classes: PropTypes.object,
};

const StyledBadge = withStyles((theme) => ({
  badge: {
    position: "absolute",
    right: "-4px",
    top: "-18px",
    width: "13px",
    height: "13px",
    background: "red",
    borderRadius: "50%",
    fontWeight: 500,
    fontSize: "0.6rem",
    color: "white",
    padding: "4px 3px 3px 3px",
    backgroundColor: "red",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

export default withStyles((theme) => ({
  icon: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    width: 48,
    border: `1px solid ${theme.colors.lightGray}`,
    marginRight: 15,
    background: "#5CAFA5",
    boxShadow: "inset 4px 4px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: 16,
  },
  flex: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "24px",
    maxHeight: "350px",
    background: theme.palette.main,
  },
  flexNotification: {
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
    borderBottom: `1px solid ${theme.colors.lightGray}`,
  },
  typography: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.white,
    fontSize: 15,
  },
  underline: {
    textDecoration: "underline",
  },
}))(Notifications);
