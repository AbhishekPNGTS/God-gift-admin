import PropTypes from "prop-types";
import React from "react";

// material-ui
import { Box, Card, Grid, Typography, Chip } from "@mui/material";
import Paper from "@mui/material/Paper";

// project imports
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
// ===============================|| COLOR BOX ||=============================== //

// ===============================|| UI COLOR ||=============================== //

export default function BankDetails() {
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function getPurchaseProduct() {
    var myHeaders = new Headers();
    myHeaders.append("authkey", process.env.REACT_APP_AUTH_KEY);
    myHeaders.append("token", localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      adminId: localStorage.getItem("userId"),
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}getPurchaseProduct`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.code == 200) {
          setRows(result.data);
        }
      })
      .catch((error) => {});
  }
  useEffect(() => {
    getPurchaseProduct();
  }, []);

  function formatDate(date) {
    return new Date(date).toLocaleString("en-us", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <>
      <MainCard
        title={
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            spacing={gridSpacing}
          >
            <Grid item>
              <Typography variant="h3">Order History</Typography>
            </Grid>
          </Grid>
        }
        content={false}
      >
        {rows ? (
          <Card>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 540 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>S No.</TableCell>
                      <TableCell sx={{ pl: 3 }}>Date</TableCell>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Product Image</TableCell>
                      <TableCell>User Name</TableCell>
                      <TableCell>User Email</TableCell>
                      <TableCell>Coins</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                          >
                            <TableCell align="start">{index + 1}</TableCell>
                            <TableCell align="start">
                              {formatDate(row.createdAt)}
                            </TableCell>
                            <TableCell align="start">
                              {row.ProductID.Name == null
                                ? "-"
                                : row.ProductID.Name}
                            </TableCell>
                            <TableCell align="start">
                              <a href={`${process.env.REACT_APP_IMAGE_URL}/${row.ProductID.ImageURL}`} target="_blank">
                              <Avatar
                                alt="QR"
                                src={`${process.env.REACT_APP_IMAGE_URL}/${row.ProductID.ImageURL}`}
                                sx={{ width: 50, height: 50 }}
                              />
                              </a>
                            </TableCell>
                            <TableCell align="start">
                              {row.UserID.Name == null ? "-" : row.UserID.Name}
                            </TableCell>
                            <TableCell align="start">
                              {row.UserID.Email == null
                                ? "-"
                                : row.UserID.Email}
                            </TableCell>
                            <TableCell align="start">{row.Coins}</TableCell>
                            {/* <TableCell align="start">
                              {
                                (row.Status == 'Verified')
                                  ? <Chip label={row.Status} color="success" size="small" />
                                  :
                                  (row.Status == 'Pending') ?
                                    <Chip label={row.Status} color="primary" size="small" />
                                    :
                                    <Chip label={row.Status} color="error" size="small" />

                              }
                            </TableCell> */}
                            {/* <TableCell align="center">
                              <Tooltip placement="top" title="view">
                                <Link
                                  to={`/view-bank-details/${row.BankID}`}
                                >
                                  <IconButton
                                    color="primary"
                                    aria-label="view"
                                    size="large"
                                  >
                                    <VisibilityIcon
                                      sx={{ fontSize: "1.1rem" }}
                                    />
                                  </IconButton>
                                </Link>
                              </Tooltip>
                            </TableCell> */}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 20, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Card>
        ) : (
          <h6>Loading...</h6>
        )}
      </MainCard>
    </>
  );
}
