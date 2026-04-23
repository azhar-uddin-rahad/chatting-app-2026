import React, { useState } from "react";
import log from "../assets/log.png";
import { Alert, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Image from "../Components/Image";
import { useSelector, useDispatch } from "react-redux";
import { getDatabase, push, ref, set } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { toast } from "react-toastify";

const Registration = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [fromData, setFromData] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    emailError: "",
    nameError: "",
    passwordError: "",
  });
   const db = getDatabase();
  const dispatch = useDispatch();
  const [notificationBackgroundColor, setNotificationBackgroundColor] =
    useState({
      success: "#5F35F5",
      error: "#fff",
    });
  const currentUser = useSelector((state) => state?.userAuth?.value);
  console.log("current users",currentUser);
 
  //input on change, remove error , take from data
  const handleFromDataChange = (e) => {
    setFromData({
      ...fromData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "full_name") {
      setError({ ...error, nameError: "" });
    }
    if (e.target.name === "email") {
      setError({ ...error, emailError: "" });
    }
    if (e.target.name === "password") {
      setError({ ...error, passwordError: "" });
    }
  };

  // include error if data not available, final signup with firebase
  const handleRegistration = () => {
    const newError = {};
    if (!fromData.full_name) {
      newError.nameError = "Full Name IS required";
    }
    if (!fromData.email) {
      console.log("I enter the email condition");
      newError.emailError = "Enter YOur Email";
    }
    if (!fromData.password) {
      newError.passwordError = "Enter YOur password";
    }
    setError({ ...error, ...newError });
    if (fromData.email && fromData.password && fromData.full_name) {
      console.log("condition work");
      createUserWithEmailAndPassword(auth, fromData.email, fromData.password)
        .then(({ user }) => {
          updateProfile(auth.currentUser, {
            displayName: fromData.full_name,
            photoURL: "https://i.ibb.co/xGrXcnP/profile.png",
          })
            /* .then(() => {
            sendEmailVerification(auth.currentUser);
          }) */
            .then(() => {
              localStorage.setItem("userinfo", JSON.stringify(user));
             set(ref(db,'users/'+ user.uid), {
                    username: fromData.full_name,
                    email:fromData.email,
                    profile_picture : user.photoURL
                  });
                  console.log("data calling")
              setFromData({
                full_name: "",
                email: "",
                password: "",
              });
              toast.success(
                `Registration Successful! Please Verify Your Email`,
                {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                  style: {
                    "--dynamic-bg-color": notificationBackgroundColor.success,
                  },
                },
              );
              setTimeout(() => {
                navigate("/");
              }, 1000);
            });
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error;

          console.log(errorCode);
          if (errorCode?.includes("email")) {
            console.log("Hello");
            toast.error(`"email already used"`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              style: {
                "--dynamic-bg-color": notificationBackgroundColor.error,
              },
            });
          }
        });
    }
  };

  return (
    <div className="authenticationPage">
      <div className="left">
        <div className="text-container">
          <h1>Login to your account!</h1>

          <p>Free register and you can enjoy it</p>
          <TextField
            type="text"
            onChange={(e) => handleFromDataChange(e)}
            name="full_name"
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
            className="inputCss"
            value={fromData?.full_name}
          />
          {error.emailError && (
            <Alert severity="error">{error.emailError}</Alert>
          )}
          <TextField
            type="text"
            onChange={(e) => handleFromDataChange(e)}
            name="email"
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            className="inputCss"
            value={fromData?.email}
          />
          {error.nameError && <Alert severity="error">{error.nameError}</Alert>}

          <TextField
            type="password"
            onChange={(e) => handleFromDataChange(e)}
            name="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            className="inputCss"
            value={fromData?.password}
          />
          {error.passwordError && (
            <Alert severity="error">{error.passwordError}</Alert>
          )}

          <Button
            variant="contained"
            onClick={() => handleRegistration()}
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
