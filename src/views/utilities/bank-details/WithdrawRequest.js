import React from "react";
// material-ui
import { Card, Grid, Typography, Chip } from "@mui/material";
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
import AddCardIcon from "@mui/icons-material/AddCard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Loader } from "rsuite";
// ===============================|| COLOR BOX ||=============================== //
// ===============================|| UI COLOR ||=============================== //
export default function BankDetails() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  var myHeaders = new Headers();
  myHeaders.append("authkey", process.env.REACT_APP_AUTH_KEY);
  myHeaders.append("token", localStorage.getItem("token"));
  myHeaders.append("Content-Type", "application/json");

  function getWithDrawRequest() {
    var raw = JSON.stringify({
      adminId: localStorage.getItem("userId"),
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_API_URL}getWithDrawRequest`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.code == 200) {
          setRows(result.data);
        }
      })
      .catch((error) => {});
  }
  useEffect(() => {
    getWithDrawRequest();
  }, []);

  // function handleClick(id) {
  //   setIsLoading(true);
  //   var raw = JSON.stringify({
  //     adminId: localStorage.getItem("userId"),
  //     withdrawId: id,
  //   });
  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };
  //   fetch(`${process.env.REACT_APP_API_URL}userPayOut`, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       if (result.code === 200) {
  //         setIsLoading(false);
  //         navigate("/withdraw-request");
  //         getWithDrawRequest();
  //         toast.success("Withdraw Successfully", {
  //           position: toast.POSITION.TOP_CENTER,
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //         });
  //       } else if (result.code == 201) {
  //         toast.error(result.message, {
  //           position: toast.POSITION.TOP_CENTER,
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //         });
  //       }
  //     })
  //     .catch((error) => {});
  // }

  function formatDate(date) {
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(date).toLocaleString("en-IN", options);
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
              <Typography variant="h3">Withdraw Request</Typography>
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
                      <TableCell sx={{ pl: 3 }}>S No.</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                      {/* <TableCell>Action</TableCell> */}
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
                              {row.UserID.Name}
                            </TableCell>
                            <TableCell align="start">
                              {row.UserID.Phone}
                            </TableCell>
                            <TableCell align="start">
                              {row.UserID.Email}
                            </TableCell>
                            <TableCell align="start">{row.Coins}</TableCell>
                            <TableCell align="start">
                              {row.Status == "Completed" ? (
                                <Chip
                                  label={row.Status}
                                  color="success"
                                  size="small"
                                />
                              ) : row.Status == "Pending" ? (
                                <Chip
                                  label={row.Status}
                                  color="primary"
                                  size="small"
                                />
                              ) : (
                                <Chip
                                  label={row.Status}
                                  color="error"
                                  size="small"
                                />
                              )}
                            </TableCell>
                            {/* <TableCell>
                              {row.Status == "Completed" ? (
                                <>--</>
                              ) : (
                                <>
                                {isLoading ? <>Loading...</> :
                                (
                                  <IconButton
                                    color="primary"
                                    aria-label="view"
                                    size="large"
                                    onClick={() => {
                                      handleClick(row.WithdrawID);
                                    }}
                                  >
                                    <AddCardIcon sx={{ fontSize: "1.1rem" }} />
                                  </IconButton>
                                )
                                }
                                </>
                              )}
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
