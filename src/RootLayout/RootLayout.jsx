
import Grid from '@mui/material/Grid';
import React from 'react'
import Sidebar from '../Components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

const RootLayout = () => {
  const count = useSelector(state => state?.counter?.value)
  console.log(count)
  const dispatch = useDispatch()
  return (
    
      <div>
          <Grid container spacing={2}>
          <Grid item xs={2}>
          <Sidebar></Sidebar>
        </Grid>
        <Grid item xs={10}>
        <Outlet></Outlet>
        </Grid>
        </Grid>
    </div>
  )
}

export default RootLayout