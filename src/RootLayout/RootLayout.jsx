
import Grid from '@mui/material/Grid';
import React from 'react'
import Sidebar from '../Components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../Slice/userSlicer'
const RootLayout = () => {
  const count = useSelector(state => state?.counter?.value)
  console.log(count)
  const dispatch = useDispatch()
  return (
    
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <br /><br />
        <span>{count}</span>
          <br /><br />
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
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