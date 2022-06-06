import React, { useState } from "react";
import moment from "moment";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  withStyles,
  Table as MuiTable,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PropTypes from "prop-types";
import Pagination from "@material-ui/lab/Pagination";

import { Typography, Flex, Button, Container } from "../";

const Table = ({
  classes,
  loading,
  tableHead,
  pagination,
  onClick,
  title,
  actions,
  items = [],
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [totalPages /*setTotalPages */] = useState(0);
  const [page, setPage] = useState(1);

  const handleChangePagination = (e, value) => {
    setPage(value);
  };

  const handleClickMenu = (event, id) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  if (loading)
    return (
      <>
        <Flex justifyContent="space-between" flexDirection="column">
          <Skeleton variant="rect" width={"100%"} height={60} />
        </Flex>
        <Flex
          justifyContent="space-between"
          flexDirection="column"
          style={{ height: 360, marginTop: 16 }}
        >
          <Skeleton variant="rect" width={"100%"} height={40} />
          <Skeleton variant="rect" width={"100%"} height={40} />
          <Skeleton variant="rect" width={"100%"} height={40} />
          <Skeleton variant="rect" width={"100%"} height={40} />
          <Skeleton variant="rect" width={"100%"} height={40} />
          <Skeleton variant="rect" width={"100%"} height={40} />
          <Skeleton variant="rect" width={"100%"} height={40} />
          <Skeleton variant="rect" width={"100%"} height={40} />
        </Flex>
      </>
    );

  return (
    <Container className={classes.container} {...props}>
      <Typography className={classes.typography}> {title} </Typography>
      <MuiTable className={classes.table}>
        <TableHead>
          <TableRow>
            {tableHead.map((item) => (
              <TableCell
                align="left"
                scope="row"
                key={item.id}
                width={item.width}
              >
                <Typography className={classes.headerTypography}>
                  {item.text}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className={classes.body}>
          {/* ROWS MAP */}
          {!!items.length && items?.map((row) => (
            <TableRow
              key={row.id}
              onClick={onClick}
              style={{
                cursor: typeof onClick === "undefined" ? "auto" : "pointer",
                padding: 12,
              }}
            >
              {/* COLUMNS MAP */}
              {Object.keys(row).map(
                (key) =>
                  key !== "id" && (
                    <TableCell
                      align="left"
                      key={key}
                      className={classes.bodyCell}
                    >
                      {row[key]?.toString().split("-").length === 3 ? (
                        <Typography className={classes.bodyTypography}>
                          {moment(row[key]).format("DD/MM/YYYY")}{" "}
                        </Typography>
                      ) : (
                        <Typography className={classes.bodyTypography}>{row[key]}</Typography>
                      )}
                    </TableCell>
                  )
              )}
              {/* ACTIONS MAP*/}
              {actions && (
                <TableCell align="left" className={classes.bodyCell}>
                  <Flex center>
                    {actions.map((action) =>
                      action.type === "button" ? (
                        <Button
                          key={action.id}
                          onClick={() => action.onClick(row)}
                          className={classes.button}
                          width={action.width || "100%"}
                          secondary={action.secondary}
                        >
                          {action.text}
                        </Button>
                      ) : (
                        <div key={action.id}>
                          <Button
                            onClick={(e) => {
                              action.onClick(row);
                              handleClickMenu(e);
                            }}
                            variant="icon"
                            color="secondary"
                          >
                            <MoreVertIcon />
                          </Button>
                          <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            elevation={0}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleCloseMenu}
                          >
                            {action.list.map(({ text, onClick }) => (
                              <MenuItem
                                key={text}
                                onClick={() => {
                                  onClick();
                                  handleCloseMenu(onClick, row);
                                }}
                              >
                                {text}
                              </MenuItem>
                            ))}
                          </Menu>
                        </div>
                      )
                    )}
                  </Flex>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
      {!items.length &&
        <Flex className={classes.flexNoData}>
          <Typography>Não há registros nesta tabela</Typography>
        </Flex>
      }
      {pagination && (
        <Flex center className={classes.flexPagination}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePagination}
            color="secondary"
            size="large"
          />
        </Flex>
      )}
    </Container>
  );
};

export default withStyles((theme) => ({
  table: {
    // border: `1px solid ${theme.colors.lightGray}`,  
  },
  tableHeader: {
    backgroundColor: "#151a301a",
  },
  flexPagination: {
    margin: "8px 0px",
  },
  button: {
    height: 28,
    fontSize: 12,
    margin: "0 8px",
  },
  headerTypography: {
    color: theme.palette.lightGrey,
    fontSize: 20,
    fontWeight: 700,
    [theme.breakpoints.down("lg")]: {
      fontSize: 16,
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: 14,
    },
  },
  bodyTypography: {
    [theme.breakpoints.down("lg")]: {
      fontSize: 14,
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: 12,
    },
  },
  bodyCell: {
    color: theme.palette.white,
    border: "none",
  },
  body: {
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
  typography: {
    color: theme.palette.lightGrey,
    fontSize: 24,
    fontWeight: 700,
    padding: 16,
    [theme.breakpoints.down("lg")]: {
      fontSize: 18,
    },
  },
  flexNoData: {
    alignItems: "center",
    justifyContent: "center",
    height: "10vh"
  },
  container: {
    background: theme.palette.black,
    height: "auto !important",
    padding: "30px 22px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
    borderRadius: 20,
    [theme.breakpoints.down("sm")]: {
      width: "max-content !important",
      margin: "auto"
    },
  }

}))(Table);

Table.propTypes = {
  classes: PropTypes.object,
  tableHead: PropTypes.array.isRequired, // cabeçalho da tabela
  pagination: PropTypes.bool, // caracteriza se a tabela deve ter paginação ou não
  onClick: PropTypes.func, // função de onClick para row
  items: PropTypes.array.isRequired,
  actions: PropTypes.array,
  title: PropTypes.string,
};
