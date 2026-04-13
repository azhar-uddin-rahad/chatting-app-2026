
import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const ForgetPassword = () => {
    const [email,setEmail] = useState("")
    const handleForgetPasswordChange=(e)=>{
        setEmail (e?.target?.value)
    }

  return (
    <div>
        <div className='forgetPasswordContainer'>
          <div className='forgetPasswordBody'>
            <Typography component="h1" variant='h4'>Forget Password Field:</Typography>
            <TextField  type="email" id="outlined-basic" label="Email" variant="outlined" onChange={(e)=>{handleForgetPasswordChange(e)}} className='changePassField'/>
            <Button variant="contained" >Change Password</Button>
          </div>
    </div>
    </div>
  )
}

export default ForgetPassword