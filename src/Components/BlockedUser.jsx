import { Button } from "@mui/material";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useSelector } from "react-redux";
const BlockedUser = () => {
   const currentUserInfo = useSelector((state) => state?.userAuth?.value);
  const [blockList, setBlockList] = useState([]);
  const db = getDatabase();
  useEffect(() => {
    const blockRef = ref(db, "blocklist");
    onValue(blockRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if(item.val().blockId != currentUserInfo.uid)
        arr.push({ ...item.val(), blockListId: item.key });
      });
      setBlockList(arr);
    });
  }, []);
  console.log("blockList", blockList);
  const handleUnblock = (item) => {
    remove(ref(db, "blocklist", item.blockListId));
  };
  return (
    <div className="box">
      <div className="group-heading">
        <h3>User List</h3>
        <Button>Create Account</Button>
      </div>

      {blockList.map((item, index) => (
        <div className="group-card-body" key={index}>
          <div className="profile">
            <img src="https://i.ibb.co/xGrXcnP/profile.png" alt="" />
          </div>
          <div className="title">
            <h4 className="groupsName">{item.blockName}</h4>
            {/* <p className="messageTitle">azhar@gmail.com</p> */}
          </div>
          <Button className="addBtn" onClick={() => handleUnblock(item)}>
            Unblock
          </Button>
        </div>
      ))}

      {/*    <Button className="addBtn" size="small" >
              cancel
            </Button> */}

      {/* <Button className="addBtn" >
             Padding
             </Button> */}
    </div>
  );
};

export default BlockedUser;
