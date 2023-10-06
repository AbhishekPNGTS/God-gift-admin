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
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const Token = localStorage.getItem("tokenkey");
function EditUser() {
  const navigate = useNavigate();
  const params = useParams();
  const [name, setName] = React.useState("");
  const [Lname, setLName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState([]);
  const [isActive, setIsActive] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [isLastNameError, setIsLastNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPhoneError, setIsPhoneError] = useState(false);

  const handleError = () => {
    var regName = /[a-z A-Z]$/;
    var regNumber = /^[789]\d{9}$/;
    setName(name.trim())
    setPhone(phone.trim())
    if (name.length == 0) {
      setIsNameError(true)
    } else if (!regName.test(name)) {
      setIsNameError(true)
    } else {
      setIsNameError(false)
    }
    if (phone.length < 10) {
      setIsPhoneError(true)
    } else if (!regNumber.test(phone)) {
      setIsPhoneError(true)
    }
    else {
      setIsPhoneError(false)
    }
    if (Lname.length == "") {
      setIsLastNameError(true)
    } else {
      setIsLastNameError(false)
    }
    if (email.length == "") {
      setIsEmailError(true)
    } else {
      setIsEmailError(false)
    }
}

  var myHeaders = new Headers();
  myHeaders.append("authkey", process.env.REACT_APP_AUTH_KEY);
  myHeaders.append("token", localStorage.getItem("token"));
  myHeaders.append("Content-Type", "application/json");
  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true)
    if (!isPhoneError && !isNameError && !isLastNameError && !isEmailError ) {
    var raw = JSON.stringify({
      adminId: localStorage.getItem("userId"),
      email: email,
      userId: params.id,
      firstname: name,
      lastname: Lname,
      contact: phone,
      active: isActive,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}userUpdate`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.code == 200) {
          navigate("/users");
          toast.success("Updated Successfully", {
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
}

  function getTaskById() {
    var raw = JSON.stringify({
      staffId: localStorage.getItem("staffId"),
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
        setName(result.data.FirstName);
        setLName(result.data.LastName);
        setEmail(result.data.Email);
        setPhone(result.data.Phone);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  React.useEffect(() => {
    getTaskById();
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
            <Typography variant="h3">Add User</Typography>
          </Grid>
        </Grid>
      }
    >
      <form onSubmit={handleSubmit} action="#">
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6}>
            <Stack>
              <InputLabel required>Name</InputLabel>
              <TextField
                maxLength={5}
                fullWidth
                error={isNameError}
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
              <InputLabel required>Last Name</InputLabel>
              <TextField
                maxLength={5}
                fullWidth
                error={isLastNameError}
                id="name"
                name="name"
                value={Lname}
                onChange={(e) => {
                  setLName(e.target.value);
                }}
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
                error={isEmailError}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  //   handleChange;
                }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack>
              <InputLabel required>Phone Number</InputLabel>
              <TextField
                fullWidth
                error={isPhoneError}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);}}
                type="tel"
                id="Phone"
                name="Phone"
                value={phone}
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
