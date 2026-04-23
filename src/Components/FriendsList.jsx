import { Button } from '@mui/material'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import React, { useEffect, useState } from 'react'
import {BsThreeDotsVertical} from "react-icons/bs"
import { useSelector } from 'react-redux';
const FriendsList = () => {
const currentUserInfo = useSelector((state) => state?.userAuth?.value);
const [getFndRequest,setGetFndRequest]=useState([])
const db=getDatabase();
   useEffect(()=>{
      const fndRequestData= ref(db, "friendRequests/");
   onValue(fndRequestData, (snapshot) => {
     const arr = [];
     snapshot.forEach((item) => {
      arr.push(item.whoReceiveID + item.whoSendID  )
     });
     setGetFndRequest(arr)
   })
    },[])
    const handleFriendRequest=()=>{

    }
  return (
    <div className="box">
      <div className="group-heading">
        <h3>User List</h3>
        <Button>Create Account</Button>
      </div>
       
      <div  className="group-card-body">
             <div className="profile">
               <img src="https://i.ibb.co/xGrXcnP/profile.png" alt="" />
             </div>
             <div className="title">
               <h4 className="groupsName">Azhar</h4>
               <p className="messageTitle">azhar@gmail.com</p>
             </div>
            
           {/*    <Button className="addBtn" size="small" >
              cancel
            </Button> */}
     
           
             {/* <Button className="addBtn" >
             Padding
             </Button> */}
          
              <Button className="addBtn" onClick={()=>handleFriendRequest()}>
              <BsThreeDotsVertical className="addIcon" />
            </Button>
            
       
           
           </div> 
  
             
        
      
    </div>
  )
}

export default FriendsList