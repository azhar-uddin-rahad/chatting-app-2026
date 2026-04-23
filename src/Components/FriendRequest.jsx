import { Button } from '@mui/material'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import React, { useEffect, useState } from 'react'
import {BsThreeDotsVertical} from "react-icons/bs"
import { useSelector } from 'react-redux';

const FriendRequest = () => {
 const currentUserInfo = useSelector((state) => state?.userAuth?.value);
const [getFndRequest,setGetFndRequest]=useState([])
const db=getDatabase();
   useEffect(()=>{
      const fndRequestData= ref(db, "friendRequests");
   onValue(fndRequestData, (snapshot) => {
     const arr = [];
     snapshot.forEach((item) => {
       console.log('I am  recevide id',)
    if( item.val().whoReceiveID  === currentUserInfo.uid )
      arr.push(item.val())
     });
     setGetFndRequest(arr)
   })
    },[])
    const handleFriendRequestAccept=()=>{

    }
 console.log('I am  friend request data', getFndRequest)
   
  return (
    <div className="box">
      <div className="group-heading">
        <h3>Friend Request</h3>
        <Button>:</Button>
      </div>
       {getFndRequest.map((items, index)=>
             <div  className="group-card-body">
             <div className="profile">
               <img src="https://i.ibb.co/xGrXcnP/profile.png" alt="" />
             </div>
             <div className="title">
               <h4 className="groupsName">{items.whoSendName}</h4>
               {/* <p className="messageTitle">azhar@gmail.com</p> */}
             </div>
            
           {/*    <Button className="addBtn" size="small" >
              cancel
            </Button> */}
     
           
             {/* <Button className="addBtn" >
             Padding
             </Button> */}
          
              <Button className="addBtn" onClick={()=>handleFriendRequestAccept()}>
              Accept
            </Button>
            
       
           
           </div>
            
      )

       }
      
    </div>
  )
}

export default FriendRequest