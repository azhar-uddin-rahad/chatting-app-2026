import React, { useState } from "react";
import log from "../assets/log.png";
import { Alert, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Image from "../Components/Image";
const Login = () => {
  const [fromData, setFromData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    emailError: "",
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
    if (!fromData.password) {

      newError.passwordError = "Enter YOur Email";
    }
    setError({...error,...newError})
  };
  if(fromData.email && fromData.password){
    console.log("enter email and enter password confirm")
  }
  console.log(error);
  return (
    <div className="authenticationPage">
      <div className="left">
        <div className="text-container">
          <h1>Login to your account!</h1>
          <p>Free register and you can enjoy it</p>
          <TextField
            type="text"
            // onChange={(e) => handleChange(e)}
            onChange={(e) => handleFromDataChange(e)}
            name="email"
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            className="inputCss"
          />
          {error.emailError && (
            <Alert severity="error">{error.emailError}</Alert>
          )}
          {/* {error.emailError && (
            <Alert severity="error" className="mt-2">
              {error.emailError}
            </Alert>
          )} */}
          <TextField
            type="password"
            onChange={(e) => handleFromDataChange(e)}
            name="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            className="inputCss"
          />
          {error.passwordError && (
            <Alert severity="error">{error.passwordError}</Alert>
          )}
          a
          {/* {error.passwordError && (
            <Alert severity="error" className="mt-2">
              {error.passwordError}
            </Alert>
          )} */}
          <Typography component="p" variant="p" className="orange">
            Forget Password ? <Link to="/forgotpassword">Click here ?</Link>
          </Typography>
          <Button
            variant="contained"
            onClick={handleSignUp}
            className="SignUpBtn"
          >
            Login to Continue
          </Button>
          <Typography variant="p" component="p" className="semiText">
            Don’t have an account ?{" "}
            <Link className="orange" to="/sign_up">
              {" "}
              Sign up
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

export default Login;
