import React ,{ useState, useEffect } from "react";
// material-ui
import { Card, Grid, Button, Typography, Chip } from "@mui/material";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
// project imports
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useParams } from "react-router-dom";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import {Link} from 'react-router-dom'
const Token = localStorage.getItem("tokenkey");
function App() {
  const params = useParams();
  const [coupenId, setCoupenId] = React.useState("");
  const [sequence, setSequence] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [isActive, setIsActive] = React.useState("");
  const [coins, setCoins] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [qrArr, setQrArr] = React.useState([]);
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

  function getQRById() {
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
    fetch(`${process.env.REACT_APP_API_URL}getQRById`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        var arr = [];
        setCoupenId(result.data.CouponID);
        setSequence(result.data.Sequence);
        setQuantity(result.data.Quantity);
        setIsActive(result.data.IsActive);
        setCoins(result.data.Coins);
        setRows(result.data.Coupon);
        Promise.all(result.data.Coupon.map(qr=>{
          arr.push(qr.QR)
        }))
        setQrArr(arr);
        console.log(arr)
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    getQRById();
  }, []);



   const downloadImagesAsZip = async (qrArr) => {
    try {
        const zip = new JSZip();
        // Loop through each image URL
        for (let i = 0; i < qrArr.length; i++) {
            const response = await fetch(`${process.env.REACT_APP_IMAGE_URL}${qrArr[i]}`);
            const imageBlob = await response.blob();
            // Add the image to the zip file
            zip.file(`image_${i}.jpg`, imageBlob);
        }
        // Generate the zip file
        const zipBlob = await zip.generateAsync({ type: 'blob' });

        // Save and download the zip file
        saveAs(zipBlob, 'images.zip');
    } catch (error) {
        console.error('Error creating zip file:', error);
    }
};

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
              <Typography variant="h3">QR Details</Typography>
            </Grid>
            &nbsp; &nbsp;
            <Button variant="outlined" onClick={(()=>downloadImagesAsZip(qrArr))}>
              Export
            </Button>
          </Grid>
          }
          >
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            spacing={gridSpacing}
          >
            <Grid item>
              <Typography variant="b">Coins :- {coins}</Typography>&nbsp;&nbsp;&nbsp;
              <Typography variant="b">Sequence :- {sequence}</Typography>&nbsp;&nbsp;&nbsp;
              <Typography variant="b">Quantity :- {quantity}</Typography>
            </Grid>
          </Grid>
        {rows ? (
          <Card>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 540 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ pl: 3 }}>S No.</TableCell>
                      <TableCell>QRID</TableCell>
                      <TableCell>Image</TableCell>
                      <TableCell>Status</TableCell>
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
                            <TableCell align="start">{row.QRID}</TableCell>
                            {/* <TableCell align="start">{row.QR}</TableCell> */}
                            <TableCell align="start">
                              <a href={`${process.env.REACT_APP_IMAGE_URL}/${row.QR}`} target="_blank">
                              <Avatar
                                alt="QR"
                                src={`${process.env.REACT_APP_IMAGE_URL}/${row.QR}`}
                                sx={{ width: 50, height: 50 }}
                              />
                              </a>
                            </TableCell>
                           <TableCell align="start">
                              {
                                (row.Status == "Paid")
                                  ? <Chip label="Paid" color="success" size="small" />
                                  :
                                  <Chip label="Pending" color="primary" size="small" />

                              }</TableCell>
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

export default App;
