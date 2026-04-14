
import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail, updatePassword } from "firebase/auth";
const ForgetPassword = () => {
  const auth = getAuth();
    const [email,setEmail] = useState("");
    const navigate=useNavigate();
    const handleForgetPasswordChange=(e)=>{
        setEmail (e?.target?.value)
    }

    const handleChangePassword=()=>{
      
    }


const user = auth.currentUser;
const handleForgetPassword=()=>{
    sendPasswordResetEmail(auth, email)
  .then(() => {
    toast.success('Check Your Email', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

      navigate("/")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
   
      toast.error('Please Enter Valid Email', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
  });

  }

/* updatePassword(user, newPassword).then(() => {
  // Update successful.
}).catch((error) => {
  // An error ocurred
  // ...
}); */



  return (
    <div>
        <div className='forgetPasswordContainer'>
          <div className='forgetPasswordBody'>
            <Typography component="h1" variant='h4'>Forget Password Field:</Typography>
            <TextField  type="email" id="outlined-basic" label="Email" variant="outlined" onChange={(e)=>{handleForgetPasswordChange(e)}} className='changePassField'/>
            <Button variant="contained" onClick={()=>{handleForgetPassword()}}>Change Password</Button>
          </div>
    </div>
    </div>
  )
}

export default ForgetPassword