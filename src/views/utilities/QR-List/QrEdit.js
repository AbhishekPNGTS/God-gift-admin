import React, { useState, useEffect } from "react";
import MainCard from "ui-component/cards/MainCard";
import InputLabel from "ui-component/extended/Form/InputLabel";
import { gridSpacing } from "store/constant";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Button,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const Token = localStorage.getItem("tokenkey");
function EditUser() {
  const navigate = useNavigate();
  const params = useParams();
  const [active, setActive] = React.useState("");
  const [coins, setCoins] = React.useState([]);
  const [sequence, setSequence] = React.useState([]);
  const [quantity, setQuantity] = React.useState([]);
  const [status, setStatus] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  var myHeaders = new Headers();
  myHeaders.append("authkey", process.env.REACT_APP_AUTH_KEY);
  myHeaders.append("token", localStorage.getItem("token"));
  myHeaders.append("Content-Type", "application/json");

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true)
    var raw = JSON.stringify({
      adminId: localStorage.getItem("userId"),
      couponId: params.id,
      coins: coins,
      active: status,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}updateQR`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.code == 200) {
          navigate("/qr-list");
          toast.success("Updated Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else if (result.code == 201) {
          toast.error(result.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      })
      .catch((error) => {});
  }

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
        setActive(result.data.IsActive);
        setCoins(result.data.Coins);
        setSequence(result.data.Sequence);
        setQuantity(result.data.Quantity);
        setStatus(result.data.IsActive);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  React.useEffect(() => {
    getQRById();
  }, []);

  return (
    <MainCard
      title={
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={gridSpacing}
        >
          <Grid item>
            <Typography variant="h3">Edit QR Detail</Typography>
          </Grid>
        </Grid>
      }
    >
      <form onSubmit={handleSubmit} action="#">
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6}>
            <Stack>
              <InputLabel required>Sequence</InputLabel>
              <TextField
                type="number"
                fullWidth
                id="name"
                name="name"
                value={sequence}
                disabled
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack>
              <InputLabel required>Quantity</InputLabel>
              <TextField
                type="number"
                fullWidth
                id="Phone"
                name="Phone"
                value={quantity}
                disabled
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack>
              <InputLabel required>Coins</InputLabel>
              <TextField
                type="number"
                fullWidth
                id="Phone"
                name="Phone"
                value={coins}
                onChange={(e) => {
                  setCoins(e.target.value);
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack>
              <InputLabel required>Status</InputLabel>
              <Select
                id="orderStatus"
                name="orderStatus"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </Stack>
          </Grid>
          <br />
        </Grid>
        <br />
        <center>
        {isLoading ? (
            "Loading....."
          ) : (
            <>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </>
          )}
        </center>
      </form>
      <br />
      <br />
      <br />
      <></>
    </MainCard>
  );
}

export default EditUser;
