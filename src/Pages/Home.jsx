import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Home = () => {
const currentUserInfo=  useSelector(state => state?.counter?.value);
  const navigate=useNavigate()
  useEffect(()=>{
    if(!currentUserInfo){
      navigate('/')
    }
  },[]) 
  return (
    <div>
      <h1>AMi home</h1>
      
    </div>
  )
}

export default Home; 