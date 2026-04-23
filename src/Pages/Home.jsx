import { Grid } from '@mui/material';
import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Group from '../Components/Group';
import FriendRequest from '../Components/FriendRequest';
import FriendsList from '../Components/FriendsList';
import MyGroup from '../Components/MyGroup';
import UsersList from '../Components/UsersList';
import BlockedUser from '../Components/BlockedUser';

const Home = () => {
const currentUserInfo=  useSelector(state => state?.userAuth?.value);
  const navigate=useNavigate()
  useEffect(()=>{
    if(!currentUserInfo){
      navigate('/')
    }
  },[]) 
  return (
      <div>
    <Grid container spacing={2}>
        <Grid item xs={4}>
        <Group/>
        <FriendRequest></FriendRequest>
        </Grid>
        <Grid item xs={4}>
         <FriendsList></FriendsList>
         <MyGroup></MyGroup>
        </Grid>
        <Grid item xs={4} >
        <UsersList></UsersList>
        <BlockedUser></BlockedUser>
        </Grid>
        
      </Grid>
        </div>
  )
}

export default Home; 