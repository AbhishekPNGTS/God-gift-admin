import React from "react";
// material-ui
import { Card, Grid, Typography, Button, Chip } from "@mui/material";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
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
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Person4Icon from "@mui/icons-material/Person4";
// ===============================|| COLOR BOX ||=============================== //
// ===============================|| UI COLOR ||=============================== //
export default function Users() {
  const navigate = useNavigate();
  const params = useParams();
  const [rows, setRows] = React.useState([]);
  const [search, setSearch] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function getAllUsers() {
    var myHeaders = new Headers();
    myHeaders.append("authkey", process.env.REACT_APP_AUTH_KEY);
    myHeaders.append("token", localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      adminId: localStorage.getItem("userId"),
      userId: params.id,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_API_URL}getAllUsers`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.code == 200) {
          setRows(result.data);
        }
      })
      .catch((error) => {});
  }
  useEffect(() => {
    getAllUsers();
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
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                id="outlined-search"
                label="Search field"
                type="search"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h3">Users</Typography>
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
                      <TableCell>Name</TableCell>
                      <TableCell>DOB</TableCell>
                      <TableCell>User Type</TableCell>
                      <TableCell>Mobile number</TableCell>
                      <TableCell>Email Id</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>State</TableCell>
                      <TableCell>District</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                    //    .filter((row) =>
                    //    search === "" ? row : row.Phone.includes(search)
                    //  )
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
                            <TableCell align="start">{row.Name}</TableCell>
                            <TableCell align="start">
                              {row.DOB ? formatDate(row.DOB) : "-"}
                            </TableCell>
                            <TableCell align="start">
                              {row.Type ? row.Type : "-"}
                            </TableCell>
                            <TableCell align="start">
                              {row.Phone ? row.Phone : "-"}
                            </TableCell>
                            <TableCell align="start">
                              {" "}
                              {row.Email ? row.Email : "-"}
                            </TableCell>
                            <TableCell align="start">
                              <TableCell align="start">
                                {row.IsActive == true ? (
                                  <Chip
                                    label="Active"
                                    color="success"
                                    size="small"
                                  />
                                ) : (
                                  <>
                                    {row.IsActive == false ? (
                                      <Chip
                                        label="InActive"
                                        color="error"
                                        size="small"
                                      />
                                    ) : (
                                      <Chip
                                        label="InActive"
                                        color="primary"
                                        size="small"
                                      />
                                    )}
                                  </>
                                )}
                              </TableCell>
                            </TableCell>
                            <TableCell align="start">
                              {row.State ? row.State : "-"}
                            </TableCell>
                            <TableCell align="start">
                              {row.City ? row.City : "-"}
                            </TableCell>
                            <TableCell align="start">
                              <Link to={`/view-user/${row.UserID}`}>
                                <IconButton
                                  color="primary"
                                  aria-label="view"
                                  size="large"
                                >
                                  <VisibilityIcon sx={{ fontSize: "1.1rem" }} />
                                </IconButton>
                              </Link>
                              <Link to={`/user-qr-details/${row.UserID}`}>
                                <IconButton
                                  color="primary"
                                  aria-label="view"
                                  size="large"
                                >
                                  <Person4Icon sx={{ fontSize: "1.1rem" }} />
                                </IconButton>
                              </Link>
                              <Link to={`/edit-user/${row.UserID}`}>
                                <IconButton
                                  color="primary"
                                  aria-label="view"
                                  size="large"
                                >
                                  <EditIcon sx={{ fontSize: "1.1rem" }} />
                                </IconButton>
                              </Link>
                            </TableCell>
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
