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
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [type, setType] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [image, setImage] = React.useState("");

  var myHeaders = new Headers();
  myHeaders.append("authkey", process.env.REACT_APP_AUTH_KEY);
  myHeaders.append("token", localStorage.getItem("token"));
  myHeaders.append("Content-Type", "application/json");

  function getKycById() {
    var raw = JSON.stringify({
      adminId: localStorage.getItem("userId"),
      kycId: params.id,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_API_URL}getKycDataById`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setName(result.data.UserID.Name );
        setEmail(result.data.UserID.Email);
        setType(result.data.IdType);
        setNumber(result.data.IdNumber);
        setImage(result.data.FrontDocument);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }
  React.useEffect(() => {
    getKycById();
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
            <Typography variant="h3">View KYC Detail</Typography>
          </Grid>
        </Grid>
      }
    >
      <form action="#">
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6}>
            <Stack>
              <InputLabel required>Name</InputLabel>
              <TextField
                type="name"
                fullWidth
                id="name"
                name="name"
                value={name}
                disabled
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack>
              <InputLabel required>Email</InputLabel>
              <TextField
                type="text"
                fullWidth
                id="email"
                name="email"
                value={email}
                disabled
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack>
              <InputLabel required>ID Type</InputLabel>
              <TextField
                type="text"
                fullWidth
                id="type"
                name="type"
                value={type}
                disabled
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack>
              <InputLabel required>Email</InputLabel>
              <TextField
                type="text"
                fullWidth
                id="email"
                name="email"
                value={number}
                disabled
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack>
              <InputLabel>Image</InputLabel>
              <img src={`${process.env.REACT_APP_IMAGE_URL}${image}`} height={200}/>
            </Stack>
          </Grid>
          <br />
        </Grid>
        <br />
      </form>
      <br />
      <br />
      <br />
      <></>
    </MainCard>
  );
}

export default EditUser;
