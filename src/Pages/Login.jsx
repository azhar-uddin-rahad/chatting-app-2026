import React, { useState } from "react";
import log from "../assets/log.png";
import { Alert, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Image from "../Components/Image";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logUser } from "../Slice/userSlicer"
import { getDatabase, push, ref, set } from "firebase/database";
const Login = () => {
    const auth = getAuth();
    const navigate= useNavigate();
    const dispatch = useDispatch();
      const db = getDatabase();
      const currentUserInfo=  useSelector(state => state?.userAuth?.value);

      console.log( " currentUserInfo",currentUserInfo?.uid)
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
      newError.passwordError = "Enter YOur Password";
    }
    setError({...error,...newError})
     if(fromData.email && fromData.password){
    
signInWithEmailAndPassword(auth, fromData.email, fromData.password)
  .then((userCredential) => {
      const user = userCredential.user;
       if(user){
         dispatch(logUser(user))
    localStorage.setItem('userinfo',JSON.stringify(user))
           setFromData({
                email: "",
                password: "",
                loading: false,
              });
              toast.success('User Login SuccessFul', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                setTimeout(()=>{
                    navigate('/home')
                  })
      }
      else{
         toast.error('Please Verify you email', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
      }
  
  }).catch((error) => {
    const errorCode = error.code;
   console.log('error:', errorCode)
    if(errorCode.includes("auth")){
            toast.error(`${errorCode.split('/')[1]}`, {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              }); 
          }
  });
  }
  };
 const handleLoginWithGoogle=()=>{
 
 const provider = new GoogleAuthProvider();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const user = result.user;
    dispatch(logUser(user))
    localStorage.setItem('userinfo',JSON.stringify(user))
     set(ref(db, "users/"+ user?.uid), {
          username: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
        navigate("/home");
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(errorCode)
    // ...
  });
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
            Forget Password ? <Link to="/forget-password">Click here ?</Link>
          </Typography>
          <Button
            variant="contained"
            onClick={()=>handleSignUp()}
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
         onClick={()=>{handleLoginWithGoogle()}}
          >
            Login with Google
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
