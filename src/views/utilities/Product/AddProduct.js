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
import { LoadingButton } from "@mui/lab";

const Token = localStorage.getItem("tokenkey");
function EditUser() {
  const navigate = useNavigate();
  const params = useParams();
  const [isActive, setIsActive] = React.useState([]);
  const [coins, setCoins] = React.useState([]);
  const [name, setName] = React.useState([]);
  const [file, setFile] = React.useState([]);
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  var myHeaders = new Headers();
  myHeaders.append("authkey", process.env.REACT_APP_AUTH_KEY);
  myHeaders.append("token", localStorage.getItem("token"));
  myHeaders.append("Content-Type", "application/json");

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("authkey", process.env.REACT_APP_AUTH_KEY);
    myHeaders.append("token", localStorage.getItem("token"));

    var formdata = new FormData();
    formdata.append("adminId", localStorage.getItem("userId"));
    formdata.append("name", name);
    formdata.append("coins", coins);
    formdata.append("active", isActive);
    formdata.append("image", file);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}addProduct`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.code === 200) {
          setIsSubmit(false);
          navigate("/product");
          toast.success("Added Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else if (result.code == 201) {
          setIsLoading(false)
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
            <Typography variant="h3">Product Detail</Typography>
          </Grid>
        </Grid>
      }
    >
      <form onSubmit={handleSubmit} action="#">
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6}>
            <Stack>
              <InputLabel required>Product Name</InputLabel>
              <TextField
                fullWidth
                id="name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack>
              <InputLabel required>Coins</InputLabel>
              <TextField
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
              <InputLabel required>Active</InputLabel>
              <Select
                id="active"
                name="active"
                value={isActive}
                onChange={(e) => setIsActive(e.target.value)}
              >
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </Select>
            </Stack>
          </Grid>
          <br />
          <Grid item xs={12} md={6}>
            <Stack>
              <InputLabel>Choose Thumbnail Image</InputLabel>
              <div class="input-group mb-3">
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="inputGroupFile02"
                      onChange={handleChange}
                    />
                    <label
                      class="custom-file-label"
                      for="inputGroupFile02"
                      aria-describedby="inputGroupFileAddon02"
                    >
                      Choose file
                    </label>
                  </div>
                </div>{" "}
            </Stack>
          </Grid>
        </Grid>
        <br />
        <center>
          {isLoading ? (
            "Loading...."
          ) : (
            <Button variant="contained" type="submit">
              Submit
            </Button>
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
