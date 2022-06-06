import React, { useEffect, useState, useMemo } from "react";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';

import { withStyles, ListItem as MuiListItem } from "@material-ui/core";
import { ROLES } from "../../../_common/utils/constants"

export const useSidebarNavigation = (role = ROLES.CLIENT) => {
  const [navigation, setNavigation] = useState([])

  const CLIENT_NAV = useMemo(() => [
    {
      id: "dashboard",
      text: "Dashboard",
      url: "/client/dashboard",
      icon: <HomeIcon color="primary" />
    },
    {
      id: "extract",
      text: "Extrato",
      url: "/client/extract",
      icon: <AccountBalanceIcon color="primary" />
    },
    {
      id: "profile",
      text: "Perfil",
      url: "/client/profile",
      icon: <PersonIcon color="primary" />
    },
  ], []);

  const ADMIN_NAV = useMemo(() => [
    {
      id: "users",
      text: "Usuários",
      url: "/admin/users",
      icon: <PersonIcon  color="primary" />
    },
  ], []);


  useEffect(() => {
    switch (role.toUpperCase()) {
      case ROLES.ADMIN: {
        setNavigation(ADMIN_NAV)
        break;
      }
      default: {
        setNavigation(CLIENT_NAV)
        break;
      }
    }

  }, [ADMIN_NAV, CLIENT_NAV, role])

  return navigation;
}

export const ListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "white",
      color: "#151A30",
    },
    "&$selected:hover": {
      backgroundColor: "white",
      color: "#151A30",
      "& .MuiListItemIcon-root": {
        color: "#151A30",
      },
    },
    "&:hover": {
      backgroundColor: "white",
      color: "#151A30",
      "& .MuiListItemIcon-root": {
        color: "#151A30",
      },
    },
  },
  selected: {},
})(MuiListItem);