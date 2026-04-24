import { Button } from "@mui/material";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";

const FriendRequest = () => {
  const currentUserInfo = useSelector((state) => state?.userAuth?.value);
  const [getFndRequest, setGetFndRequest] = useState([]);
  const db = getDatabase();
  useEffect(() => {
    const fndRequestData = ref(db, "friendRequests");
    onValue(fndRequestData, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        console.log("  friend request id", item.val().whoReceiveID,'dddddd');
        if (item.val().whoReceiveID === currentUserInfo.uid)
          // console.log("I am  friend request id", item.val().whoReceiveID,'dddddd');
        arr.push({ ...item.val(), friendRequestID: item.key });
      });
      setGetFndRequest(arr);
    });
  }, []);
  const handleFriendRequestAccept = (items) => {
    set(push(ref(db, "friends")), {
      ...items,
    }).then(()=>{
       remove(ref(db, "friendRequests/" + items.friendRequestID));
    });
   ;
  };
  const handleFriendReqDelete = (items) => {
    remove(ref(db, "friendRequests/" + items.friendRequestID));
  };


  return (
    <div className="box">
      <div className="group-heading">
        <h3>Friend Request</h3>
        <Button>:</Button>
      </div>
      {getFndRequest.map((items, index) => (
        <div className="group-card-body">
          <div className="profile">
            <img src="https://i.ibb.co/xGrXcnP/profile.png" alt="" />
          </div>
          <div className="title">
          {currentUserInfo.uid === items.whoSendID ? <h4 className="groupsName">{items.whoReceiveName}</h4> : <h4 className="groupsName">{items.whoSendName}</h4>}
            
            {/* <p className="messageTitle">azhar@gmail.com</p> */}
          </div>

          {/*    <Button className="addBtn" size="small" >
              cancel
            </Button> */}

          {/* <Button className="addBtn" >
             Padding
             </Button> */}

          <Button
            className="addBtn"
            onClick={() => handleFriendRequestAccept(items)}
          >
            Accept
          </Button>
          <Button
            className="addBtn mr-2"
            size="small"
            onClick={() => handleFriendReqDelete(items)}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};

export default FriendRequest;
