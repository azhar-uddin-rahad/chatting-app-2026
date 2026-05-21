import React from 'react';
import { Outlet } from 'react-router-dom';
import Grid from '@mui/material/Grid';

import Sidebar from '../Components/Sidebar';
const RootLayout = () => {
   
    return (
        <div>
        <Grid container spacing={2}  sx={{width: "100%"}}>
          <Grid item xs={2} sx={{width:"10%"}}>
          <Sidebar></Sidebar>
        </Grid>
        <Grid item xs={10} sx={{width:"85%"}}>
        <Outlet></Outlet>
        </Grid>
        </Grid>
        
        </div>
    );
};

export default RootLayout;