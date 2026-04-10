import React, { useState } from "react";
import log from "../assets/log.png";
import { Alert, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Image from "../Components/Image";

const Registration = () => {
  const [fromData, setFromData] = useState({
    email: "",
    full_name: "",
    password: "",
  });
  const [error, setError] = useState({
    emailError: "",
    nameError: "",
    passwordError: "",
  });

  const handleFromDataChange = (e) => {
    console.log("I am calling ");
    setFromData({
      ...fromData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "email") {
      setError({ ...error, emailError: "" });
    }
    if (e.target.name === "full_name") {
      setError({ ...error, nameError: "" });
    }
    if (e.target.name === "password") {
      setError({ ...error, passwordError: "" });
    }
  };
  const handleSignUp = () => {
    const newError = {};
    if (!fromData.email) {
      console.log("I enter the email condition");
      newError.emailError = "Enter YOur Email";
    }
     if (!fromData.full_name) {
       newError.nameError = "Full Name IS required";
    }
    if (!fromData.password) {
      newError.passwordError = "Enter YOur Email";
    }
    setError({ ...error, ...newError });
  };
  if (fromData.email && fromData.password) {
    console.log("enter email and enter password confirm");
  }

  return (
    <div className="authenticationPage">
      <div className="left">
        <div className="text-container">
          <h1>Login to your account!</h1>

          <p>Free register and you can enjoy it</p>
          <TextField
            type="text"
            onchange={(e) => handleFromDataChange(e)}
            name="full_name"
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
            className="inputCss"
          />
          {error.emailError && (
            <Alert severity="error">{error.emailError}</Alert>
          )}
          <TextField
            type="text"
            onchange={(e) => handleFromDataChange(e)}
            name="email"
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            className="inputCss"
          />
          {error.nameError && <Alert severity="error">{error.nameError}</Alert>}

          <TextField
            type="password"
            onchange={(e) => handleFromDataChange(e)}
            name="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            className="inputCss"
          />
          {error.passwordError && (
            <Alert severity="error">{error.passwordError}</Alert>
          )}

          <Button
            variant="contained"
            onClick={() => handleSignUp()}
            className="SignUpBtn"
          >
            Register account
          </Button>
          <Typography variant="p" component="p" className="semiText">
            Already have an account ?{" "}
            <Link className="orange" to="/">
              {" "}
              Sign In
            </Link>
          </Typography>

          <button
          // onClick={loginWithFd}
          >
            Login with facebook
          </button>
        </div>
      </div>
      <div className="right">
        <Image ImgSrc={log} className={"bg"}></Image>
      </div>
    </div>
  );
};

export default Registration;
