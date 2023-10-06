import React, { useState, useEffect } from "react";
import MainCard from "ui-component/cards/MainCard";
import InputLabel from "ui-component/extended/Form/InputLabel";
import { gridSpacing } from "store/constant";
import { useNavigate } from "react-router-dom";
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
  const [product, setProduct] = React.useState([]);
  const [user, setUser] = React.useState([]);
  const [productId, setProductId] = React.useState();
  const [userId, setUserId] = React.useState();
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
      userId: userId,
      productId: productId,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}userProductAdd`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.code == 200) {
          navigate("/order-history");
          toast.success("Updated Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else if (result.code == 201) {
          setIsLoading(false);
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

  function getAllProduct() {
    var raw = JSON.stringify({
      adminId: localStorage.getItem("userId"),
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}getAllProduct`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.code == 200) {
          setProduct(result.data);
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

  function getAllUsers() {
    var raw = JSON.stringify({
      adminId: localStorage.getItem("userId"),
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
          setUser(result.data);
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
  useEffect(() => {
    getAllProduct();
    getAllUsers();
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
            <Typography variant="h3">Create Order</Typography>
          </Grid>
        </Grid>
      }
    >
      <form onSubmit={handleSubmit} action="#">
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6}>
            <Stack>
              <InputLabel required>User</InputLabel>

              <Select
                id="userId"
                name="userId"
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
              >
                {user.map((us, index) => {
                  return (
                    <MenuItem value={us.UserID} key={index}>
                      {us.Phone}&nbsp;({us.Name})
                    </MenuItem>
                  );
                })}
              </Select>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack>
              <InputLabel required>Product</InputLabel>

              <Select
                id="productId"
                name="productId"
                onChange={(e) => {
                  setProductId(e.target.value);
                }}
              >
                {product.map((pro, index) => {
                  return (
                    <MenuItem value={pro.ProductID} key={index}>
                      {pro.Name}
                    </MenuItem>
                  );
                })}
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
