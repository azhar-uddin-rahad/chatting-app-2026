import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";

const UsersList = () => {
  const db = getDatabase();
  const [getUsersList, setGetUsersList] = useState([]);
  const currentUserInfo = useSelector((state) => state?.userAuth?.value);
const [getFndRequest,setGetFndRequest]=useState([])
  console.log(" currentUserInfo", currentUserInfo?.uid);
  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      //   const data = snapshot.val();
      const arr = [];
      snapshot.forEach((items) => {
        console.log(items.key, "data arr", currentUserInfo?.uid);
        if (items.key != currentUserInfo?.uid)
          arr.push({ ...items.val(), userUid: items.key });
      });

      setGetUsersList(arr);
    });
  }, []);
  useEffect(()=>{
    const fndRequestData= ref(db, "friendRequests");
 onValue(fndRequestData, (snapshot) => {
   const arr = [];
   snapshot.forEach((item) => {
    arr.push(item.val().whoReceiveID + item.val().whoSendID  )
   });
   setGetFndRequest(arr)
 })
  },[])
  console.log("fnd list",getFndRequest)
  
  const handleFriendRequest = (item) => {
    console.log("who receive id", item);
    console.log("who send request", currentUserInfo);
    set(push(ref(db, "friendRequests")), {
      whoSendID: currentUserInfo.uid,
      whoSendName: currentUserInfo.displayName,
      whoReceiveID: item.userUid,
      whoReceiveName: item.username,
    });
  };
  const handleFriendReqCancel=(item)=> {

  }
  return (
    <div className="box scroll-container">
      <div className="group-heading">
        <h3>User List</h3>
        <Button>Create Account</Button>
      </div>

      {getUsersList &&
        getUsersList?.map((item, index) => (
          <div key={index} className="group-card-body">
            <div className="profile">
              <img src="https://i.ibb.co/xGrXcnP/profile.png" alt="" />
            </div>
            <div className="title">
              <h4 className="groupsName">{item.username}</h4>
              <p className="messageTitle">{item.email}</p>
            </div>
            {}

            {/*    <Button className="addBtn" size="small" >
              cancel
            </Button> */}

            {/* <Button className="addBtn" >
             Padding
             </Button> */}
            {getFndRequest.includes(item.userUid + currentUserInfo.uid) ?
            <>
            <Button className="addBtn mr-2" size="small" onClick={()=>handleFriendReqCancel(item)}>
              X
            </Button> 
            <Button
              className="addBtn"
             >
              P 
            </Button>
            </>
            :
            getFndRequest.includes(currentUserInfo.uid + item.userUid ) ? 
            <Button
              className="addBtn"
             >
              P 
            </Button>
          :
          <Button
              className="addBtn"
              onClick={() => handleFriendRequest(item)}
            >
              <IoMdAdd className="addIcon" />
            </Button>
          }
            
          </div>
        ))}
    </div>
  );
};

export default UsersList;
