import React from "react";
// material-ui
import { Box, Card, Grid, Typography, Chip, Button } from '@mui/material';
import Paper from "@mui/material/Paper";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom';
// ===============================|| COLOR BOX ||=============================== //
// ===============================|| UI COLOR ||=============================== //
export default function Users() {
  const navigate = useNavigate()
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const params = useParams();

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

  function getAllProduct() {
    var raw = JSON.stringify({
      "adminId": localStorage.getItem('userId'),
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_API_URL}getAllProduct`, requestOptions)
      .then(response => response.json())
      .then((result) => {
        if (result.code == 200) {
          setRows(result.data)
        }
      })
      .catch((error) => {

      });
  }
  useEffect(() => {
    getAllProduct()
  }, []);

  function formatDate(date) {
    return new Date(date).toLocaleString("en-us", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  const DeleteCourse = (str) => () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      
        var raw = JSON.stringify({
          "adminId": localStorage.getItem("userId"),
          "productId": str,
        });
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(`${process.env.REACT_APP_API_URL}deleteProduct`, requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            getAllProduct();
          })
          .catch((error) => console.log("error", error));
      } else {
      }
    });
  };

  return (
    <>
      <MainCard
        title={
          <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
            <Grid item>
              <Typography variant="h3">Product List</Typography>
            </Grid>
               <Grid item>
               <Button
                 variant="outlined"
                 onClick={(e)=>{
                   navigate('/add-product')
                 }}
                 startIcon={<AddIcon />}
               >
                 Add Product
               </Button>
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
                      <TableCell>Product Name</TableCell>
                      <TableCell>Image</TableCell>
                      <TableCell>Coins</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                              <a href={`${process.env.REACT_APP_IMAGE_URL}/${row.ImageURL}`} target="_blank">
                              <Avatar
                                alt="QR"
                                src={`${process.env.REACT_APP_IMAGE_URL}/${row.ImageURL}`}
                                sx={{ width: 50, height: 50 }}
                              />
                              </a>
                            </TableCell>
                            {/* <TableCell align="start">{`${process.env.REACT_APP_IMAGE_URL}/${row.ImageURL}`}</TableCell> */}
                            <TableCell align="start">{(row.Coins)}</TableCell>
                            <TableCell align="start">{formatDate(row.createdAt)}</TableCell>
                            <TableCell placement="top" title="view">
                                <Link
                                  to={`/edit-product/${row.ProductID}`}
                                  >
                                  <IconButton
                                    color="primary"
                                    aria-label="view"
                                    size="large"
                                  >
                                    <EditIcon
                                      sx={{ fontSize: "1.1rem" }}
                                    />
                                  </IconButton>
                                </Link>
                                <Tooltip
                                  placement="top"
                                  title="delete"
                                  onClick={DeleteCourse(`${row.ProductID}`)}
                                >
                                  <IconButton
                                    color="primary"
                                    aria-label="edit"
                                    size="large"
                                  >
                                    <DeleteIcon sx={{ fontSize: "1.1rem" }} />
                                  </IconButton>
                                </Tooltip>
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
  )
}

