import React, { useState, useEffect } from "react";
import MainCard from "ui-component/cards/MainCard";
import InputLabel from "ui-component/extended/Form/InputLabel";
import { gridSpacing } from "store/constant";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
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
  const [dob, setDob] = React.useState("");
  const [type, setType] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [pinCode, setPinCode] = React.useState("");
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [status, setStatus] = React.useState("");

  var myHeaders = new Headers();
  myHeaders.append("authkey", process.env.REACT_APP_AUTH_KEY);
  myHeaders.append("token", localStorage.getItem("token"));
  myHeaders.append("Content-Type", "application/json");
  function getUserById() {
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
    fetch(`${process.env.REACT_APP_API_URL}getUserById`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setName(result.data.Name);
        setDob(result.data.DOB);
        setType(result.data.Type);
        setPhone(result.data.Phone);
        setEmail(result.data.Email);
        setPinCode(result.data.Pincode);
        setState(result.data.State);
        setCity(result.data.City);
        setStatus(result.data.IsActive);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  React.useEffect(() => {
    getUserById();
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
            <Typography variant="h3">User Detail</Typography>
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
              <InputLabel required>DOB</InputLabel>
              <TextField fullWidth id="name" name="name" value={dob} disabled />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack>
              <InputLabel required>User Type</InputLabel>
              <TextField
                fullWidth
                id="name"
                name="name"
                value={type}
                disabled
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack>
              <InputLabel required>Phone Number</InputLabel>
              <TextField
                fullWidth
                id="Phone"
                name="Phone"
                value={phone}
                disabled
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack>
              <InputLabel required>Email</InputLabel>
              <TextField
                fullWidth
                id="Email"
                name="Email"
                value={email}
                disabled
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack>
              <InputLabel required>Pin Code</InputLabel>
              <TextField
                fullWidth
                id="Email"
                name="Email"
                value={pinCode}
                disabled
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack>
              <InputLabel required>State</InputLabel>
              <TextField
                fullWidth
                id="Email"
                name="Email"
                value={state}
                disabled
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack>
              <InputLabel required>City</InputLabel>
              <TextField
                fullWidth
                id="Email"
                name="Email"
                value={city}
                disabled
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
                disabled
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
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
