import { Alert, Box, Button, Modal, TextField } from "@mui/material";

import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Group = () => {
  let groupData = [
    {
      groupName: "",
      groupTagLine: "",
    },
  ];
  const currentUserInfo = useSelector((state) => state?.userAuth?.value);
  const db = getDatabase();
  const [groupInfo, setGroupInfo] = useState(groupData);
  const [groupList, setGroupList] = useState([]);
  const [groupRequest, setGroupRequest] = useState([]);
  const [groupMemberList, setGroupMemberList] = useState([]);
  const [joinedGroupMemberList, setJoinedGroupMemberList] = useState([]);
  const [error, setError] = useState({
    groupNameError: "",
    groupTagLineError: "",
  });
  const [open3, setOpen3] = useState(false);
  const handleOpenTwo = () => {
     console.log("handleOpenTwo calling")
    setOpen3(true)};
  const handleCloseTwo = () => {
    console.log("handleCloseTwo calling")
    
    setOpen3(false)};

  useEffect(() => {
    const listUser = ref(db, "group/");
    onValue(listUser, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (currentUserInfo.uid != item.val().adminId) {
          // console.log("current id", currentUserInfo.uid, "admin", item.adminId);
          arr.push({ ...item.val(), groupId: item.key });
        }
      });
      setGroupList(arr);
    });
  }, []);
  useEffect(() => {
    const joinGroupRequest = ref(db, "groupReq/");
    onValue(joinGroupRequest, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (currentUserInfo.uid == item.val().userId) {
          arr.push(item.val().groupId);
        }
      });
      setGroupRequest(arr);
    });
  }, []);

  const handleInputChange = (e) => {
    setGroupInfo({ ...groupInfo, [e.target.name]: e.target.value });
    if (e.target.name === "groupName") {
      setError({ ...error, groupNameError: "" });
    }
    if (e.target.name === "groupTagLine") {
      setError({ ...error, groupTagLineError: "" });
    }
  };
  const handleSubmit = () => {
    const newError = {};
    if (!groupInfo.groupName) {
      newError.groupNameError = "write your groupName";
    }
    if (!groupInfo.groupTagLine) {
      newError.groupTagLineError = "write YOur groupTagLine";
    }
    setError({ ...error, ...newError });
    if (groupInfo.groupName && groupInfo.groupTagLine) {
      console.log("Hello word");
      set(push(ref(db, "group/")), {
        groupName: groupInfo.groupName,
        groupTagLine: groupInfo.groupTagLine,
        adminId: currentUserInfo.uid,
        adminName: currentUserInfo.displayName,
      }).then(() => {
        setOpen3(false);
        setGroupInfo({
          groupName: "",
          groupTagLine: "",
        });
      });
    }
  };

  
  const handleGroupJoinRequest = (item) => {
    console.log('handleGroupJoinRequest')
    set(push(ref(db, "groupReq/")), {
      groupName: item.groupName,
      groupTagLine: item.groupTagLine,
      groupId: item.groupId,
      adminId: item.adminId,
      adminName: item.adminName,
      userId: currentUserInfo.uid,
      userName: currentUserInfo.displayName,
    });
  };
  return (
    <div className="box  scroll-container">
      <div className="group-heading">
        <h3>Groups</h3>
        <Button onClick={handleOpenTwo} color="success">
          Create Group
        </Button>
        <div>
          </div>
          <Modal
            open={open3}
            onClose={handleCloseTwo}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <TextField
                id="margin-dense"
                margin="dense"
                label="Outlined"
                name="groupName"
                variant="outlined"
                onChange={(e) => handleInputChange(e)}
                sx={{ width: "100%" }}
              />
              {error.groupNameError && (
                <Alert severity="error">{error.groupNameError}</Alert>
              )}
              <TextField
                id="margin-none"
                onChange={(e) => handleInputChange(e)}
                name="groupTagLine"
                label="Filled"
                variant="outlined"
                sx={{ width: "100%", marginTop: "20px" }}
              />
              {error.groupTagLineError && (
                <Alert severity="error">{error.groupTagLineError}</Alert>
              )}
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{
                  marginTop: "20px",
                  padding: "20px 30px",
                  backgroundColor: "#5f35f5",
                }}
              >
                Submit
              </Button>
            </Box>
          </Modal>
        </div>
      

      {groupList.map((item, index) => (
        <div key={index} className="group-card-body">
          <div className="profile">
            <img src="https://i.ibb.co/xGrXcnP/profile.png" alt="" />
          </div>
          <div className="title">
            <h4 className="groupsName">{item.groupName} </h4>
            <p className="messageTitle">{item.groupTagLine}  {groupRequest.indexOf(item.groupId)}</p>
            <span>{item.adminName}</span>
          </div>

          {groupRequest.indexOf(item.groupId)  !== -1 ?  <Button className="addBtn">P</Button> : <Button
              className="addBtn"
              onClick={() => handleGroupJoinRequest(item)}
            >
              Join
            </Button>}

          
        </div>
      ))}
    </div>
  );
};
export default Group;
