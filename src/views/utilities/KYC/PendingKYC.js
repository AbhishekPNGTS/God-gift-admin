import React from "react";
// material-ui
import { Card, Grid, Button, Typography, Chip } from "@mui/material";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// ===============================|| COLOR BOX ||=============================== //
// ===============================|| UI COLOR ||=============================== //
export default function Users() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isAcceptLoading, setIsAcceptLoading] = useState(false);

  const params = useParams();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function getalldata() {
    var myHeaders = new Headers();
    myHeaders.append("authkey", process.env.REACT_APP_AUTH_KEY);
    myHeaders.append("token", localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      adminId: localStorage.getItem("userId"),
      couponId: params.id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}getKycPending`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.code == 200) {
          setRows(result.data);
        }
      })
      .catch((error) => {});
  }
  useEffect(() => {
    getalldata();
  }, []);

  function formatDate(date) {
    return new Date(date).toLocaleString("en-us", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function handleClick(KycID, Status) {
    setIsAcceptLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("authkey", process.env.REACT_APP_AUTH_KEY);
    myHeaders.append("token", localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      adminId: localStorage.getItem("userId"),
      kycId: KycID,
      status: Status,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}updateKyc`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.code == 200) {
          navigate("/all-kyc");
          toast.success("Updated Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setRows(result.data);
        }
      })
      .catch((error) => {});
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
              <Typography variant="h3">Pending KYC List</Typography>
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
                      <TableCell>Email</TableCell>
                      <TableCell>ID Type</TableCell>
                      <TableCell>ID Value</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>View</TableCell>
                      <TableCell align="center">Action</TableCell>
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
                              {row.UserID.Name ? row.UserID.Name : "-"}
                            </TableCell>
                            <TableCell align="start">
                              {row.UserID.Email ? row.UserID.Email : "-"}
                            </TableCell>
                            <TableCell align="start">{row.IdType}</TableCell>
                            <TableCell align="start">{row.IdNumber}</TableCell>

                            <TableCell align="start">
                              {row.Status == "Completed" ? (
                                <Chip
                                  label="Completed"
                                  color="success"
                                  size="small"
                                />
                              ) : (
                                <>
                                  {row.Status == "Pending" ? (
                                    <Chip
                                      label="Pending"
                                      color="primary"
                                      size="small"
                                    />
                                  ) : (
                                    <Chip
                                      label="Rejected"
                                      color="error"
                                      size="small"
                                    />
                                  )}
                                </>
                              )}
                            </TableCell>
                            <TableCell placement="top" title="view">
                              <Link to={`/view-kyc/${row.KycID}`}>
                                <IconButton
                                  color="primary"
                                  aria-label="view"
                                  size="large"
                                >
                                  <VisibilityIcon sx={{ fontSize: "1.1rem" }} />
                                </IconButton>
                              </Link>
                            </TableCell>
                            <TableCell>
                              <Button
                                sx={{ ml: 3 }}
                                variant="outlined"
                                color="success"
                                onClick={() => {
                                  handleClick(row.KycID, "Completed");
                                }}
                              >
                                {isAcceptLoading ? (
                                  <>'Loading..'</>
                                ) : (
                                  <>Accept</>
                                )}
                              </Button>

                              <Button
                                sx={{ ml: 3 }}
                                variant="outlined"
                                color="error"
                                onClick={() => {
                                  handleClick(row.KycID, "Rejected");
                                }}
                              >
                                    {isAcceptLoading ? (
                                  <>'Loading..'</>
                                ) : (
                                  <>Reject</>
                                )}
                              </Button>
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
