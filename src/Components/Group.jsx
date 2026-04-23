import { Button } from '@mui/material'
import React from 'react'
import { IoMdAdd } from 'react-icons/io'

const Group = () => {
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
              <IoMdAdd className="addIcon" />
            </Button>
            
       
           
           </div>
        
      
    </div>
  )
}
export default Group