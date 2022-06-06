import React, { useEffect, useState } from "react";
import { withStyles, List } from "@material-ui/core";
import PropTypes from "prop-types";

import { Flex, Typography, Divider, Container, Logout } from "../";
import { ListItem, useSidebarNavigation } from "./utils"

const Sidebar = ({ classes, onClose = x => x, ...props }) => {
    const role = localStorage.getItem("role");
    const navigation = useSidebarNavigation(role);
    const [selected, setSelected] = useState();
    const [items, setItems] = useState([]);
    const handleListItemClick = (event, index) => {
        setSelected(index);
        onClose()
    };

    useEffect(() => {
        setItems(navigation)
    }, [navigation, onClose])

    return (
        <Container className={classes.container} {...props}>
            <Flex className={classes.flexLinks}>
                <List component="nav" className={classes.list}>
                    {items.map(({ id, text, url, icon }) => (
                        <Typography
                            element="a"
                            key={id}
                            url={url}
                            className={classes.mainLink}
                        >
                            <ListItem
                                button
                                className={classes.listItemText}
                                selected={id === selected}
                                onClick={(event) => handleListItemClick(event, id)}
                            >
                                {selected === id && (
                                    <Divider
                                        className={classes.dividerActiveLink}
                                        orientation="vertical"
                                    />
                                )}
                                {icon}
                                <Typography className={classes.typography}>
                                    {text}
                                </Typography>
                            </ListItem>
                        </Typography>
                    ))}
                    <Logout />
                </List>
            </Flex>
        </Container>
    );
}

Sidebar.propTypes = {
    classes: PropTypes.object,
};

export default withStyles((theme) => ({
    list: {
        width: "100%",
        maxWidth: "360px",
    },
    selectLogo: {
        width: "100%",
    },
    flexLinks: {
        justifyContent: "space-between",
        flexDirection: "column",
        height: "45%",
        [theme.breakpoints.only("lg")]: {
            height: "50%",
        },
    },
    flexFaq: {
        flexDirection: "column",
        height: "20%",
        [theme.breakpoints.only("lg")]: {
            height: "10%",
        },
    },
    container: {
        zIndex: 1,
        position: "fixed",
        flexDirection: "column",
        display: "flex",
        height: "calc(100vh - 120px)",
        bottom: 0,
        width: 300,
        background: theme.palette.black,
        left: 0,
        color: theme.palette.white,
        justifyContent: "space-between",
        padding: "25px 0",
        [theme.breakpoints.down("lg")]: {
            width: 240,
        },
    },
    listItemText: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        height: "50px",
        marginLeft: "12px",
    },
    activeLink: {
        background: "#e8fafa",
        color: "white",
    },
    listItem: {
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        color: "#151a30",
        paddingLeft: "60px",
        "&.active": {
            background: "black",
        },
    },
    mainLink: {
        display: "flex",
        alignItems: "center",
        color: "inherit",
        // color: theme.palette.white,
        opacity: "0.95",
        fontSize: "1rem",
        fontWeight: 500,

        "&.active": {
            background: "black",
        },
        [theme.breakpoints.only("lg")]: {
            fontSize: "0.90rem",
        },
    },
    dividerActiveLink: {
        position: "absolute",
        right: "0px",
        width: "7px",
        background: "#151A30",
        animation: "animatetop 0.3s",
        opacity: 1,
        border: "none",
        height: "50%"
    },

    faqDescription: {
        display: "flex",
        flexDirection: "column",
        background: theme.palette.main,
        color: "white",
        padding: "20px 5px",
        width: "80%",
        borderRadius: "10px",
        fontWeight: 300,
        fontSize: "0.8rem",
        [theme.breakpoints.only("lg")]: {
            padding: "10px 5px",
            width: "80%",
            fontSize: "0.7rem",
            bottom: "10px",
        },
    },
    divider: {
        opacity: 1,
        color: "white",
        width: "95%",
        margin: "0 auto"
    },
    wallet: {
        width: 50,
        marginBottom: 4
    },
    flex: {
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "0 24px"
    },
    icon: {
        margin: "auto 16px",
        cursor: "pointer"
    },
    typography: {
        marginLeft: 8,
        color: theme.palette.lightGrey,
        fontWWeight: 700,
        fontSize: 18,
        [theme.breakpoints.down("lg")]: {
            fontSize: 16,
        },
    }
}))(Sidebar);


