import React, { useState, useEffect } from "react";
import MainCard from "ui-component/cards/MainCard";
import InputLabel from "ui-component/extended/Form/InputLabel";
import { gridSpacing } from "store/constant";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const Token = localStorage.getItem("tokenkey");
function EditUser() {
  const navigate = useNavigate();
  const [coins, setCoins] = React.useState([]);
  const [sequence, setSequence] = React.useState([]);
  const [quantity, setQuantity] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  var myHeaders = new Headers();
  myHeaders.append("authkey", process.env.REACT_APP_AUTH_KEY);
  myHeaders.append("token", localStorage.getItem("token"));
  myHeaders.append("Content-Type", "application/json");

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    var raw = JSON.stringify({
      adminId: localStorage.getItem("userId"),
      coins: coins,
      sequence: sequence,
      quantity: quantity,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}addQR`, requestOptions)
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
            <Typography variant="h3">Create QR</Typography>
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
                onChange={(e) => {
                  setSequence(e.target.value);
                }}
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
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
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
