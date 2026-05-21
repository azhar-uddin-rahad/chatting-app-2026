import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from "react-redux";

const UsersList = () => {
  const db = getDatabase();
  const [getUsersList, setGetUsersList] = useState([]);
  const currentUserInfo = useSelector((state) => state?.userAuth?.value);
const [getFndRequest,setGetFndRequest]=useState([]);
const [fnds,setFands]= useState([])
 const [blockID, setBlockID]= useState([]);
 const[blockList,setBlockList]= useState([])
  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      //   const data = snapshot.val();
      const arr = [];
      snapshot.forEach((items) => { 
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

useEffect(()=>{
    const fndRequestData= ref(db, "friends");
 onValue(fndRequestData, (snapshot) => {
   const arr = [];
   snapshot.forEach((item) => {
    arr.push(item.val().whoReceiveID + item.val().whoSendID  )
   });
   setFands(arr)
 })
  },[])

useEffect(() => {
    const blockRef = ref(db, "blocklist");
    onValue(blockRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {   
       arr.push(item.val().blockId + item.val().blockById);  
    });
    setBlockID(arr);
    });
  }, []);

  
  const handleFriendRequest = (item) => {
   
    set(ref(db, "friendRequests/" + (currentUserInfo.uid+item.userUid)), {
      whoSendID: currentUserInfo.uid,
      whoSendName: currentUserInfo.displayName,
      whoReceiveID: item.userUid,
      whoReceiveName: item.username,
    });
  };
  const handleFriendReqCancel=(item)=> {
  
     remove(ref(db,"friendRequests/"+ currentUserInfo.uid+item.userUid))
  }
  return (
    <div className="box scroll-container">
      <div className="group-heading">
        <h3>User List</h3>
        <Button>Create Account</Button>
      </div>

      {getUsersList &&
        getUsersList?.map((item, index) => 
          <div key={index}>
          {blockID.includes(item.userUid + currentUserInfo.uid)  || blockID.includes(currentUserInfo.uid + item.userUid) ? <></>:  <div  className="group-card-body">
            <div className="profile">
              <img src="https://i.ibb.co/xGrXcnP/profile.png" alt="" />
            </div>
            <div className="title">
             
              <h4 className="">{item.username}</h4>
              <p className="messageTitle">{item.email}</p>
            </div>
            

            {/*    <Button className="addBtn" size="small" >
              cancel
            </Button> */}

            {/* <Button className="addBtn" >
             Padding
             </Button> */}
            {getFndRequest.includes(item.userUid + currentUserInfo.uid) ?
            <>
            <div>
<Button className=" mr-2" size="small" onClick={()=>handleFriendReqCancel(item)}>
              X
            </Button> 
            
            <Button
             
             >
              P 
            </Button>
            </div>
            
            </>
            :
            getFndRequest.includes(currentUserInfo.uid + item.userUid ) ? 
            <Button
              className="addBtn"
             >
              P 
            </Button>
          :fnds.includes(item.userUid + currentUserInfo.uid)  || fnds.includes(currentUserInfo.uid + item.userUid) ? <Button
              className="addBtn" color="success" 
             >
              F
            </Button> :blockID.includes(item.userUid + currentUserInfo.uid)  || blockID.includes(currentUserInfo.uid + item.userUid) ? <Button
              className="addBtn" color="success" 
             >
              Block
            </Button>:

          <Button
              className="addBtn"
              onClick={() => handleFriendRequest(item)}
            >
              <IoMdAdd className="addIcon" />
            </Button>
          }
            
          </div>}
         </div>
        )}
    </div>
  );
};

export default UsersList;
