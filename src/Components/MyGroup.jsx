import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { getDatabase, onValue, ref, remove, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { useSelector } from "react-redux";

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

const MyGroup = () => {
  const db = getDatabase();
  const currentUserInfo = useSelector((state) => state?.userAuth?.value);
  // const [groupInfo, setGroupInfo] = useState(groupData);
  const [myGroupList, setMyGroupList] = useState([]);
  const [groupJoiningRequestList, setGroupJoiningRequestList] = useState([]);
  const [groupMemberList, setGroupMemberList] = useState([]);
  const [joinedGroupMemberList, setJoinedGroupMemberList] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [openModelTwo, setOpenModelTwo] = useState(false);
  const [groupMember, setGroupMember] = useState([]);

  const handleCloseOne = () => {
    setOpenModel(false);
  };
  const handleCloseTwo = () => {
    setOpenModelTwo(false);
  };

  const handleOpen = (userRequest) => {
    console.log("handleOpen i am calling from my group");
    const joiningRequest = ref(db, "groupReq/");

    onValue(joiningRequest, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log(item, "and", userRequest);
        if (
          currentUserInfo.uid === userRequest.adminId &&
          userRequest.groupId == item.val().groupId
        ) {
          arr.push({ ...item.val(), groupRequestId: item.key });
        }
      });
      setGroupJoiningRequestList(arr);
    });

    setOpenModel(true);
  };

  useEffect(() => {
    const listUser = ref(db, "group/");
    onValue(listUser, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (currentUserInfo.uid === item.val().adminId) {
          console.log("current id", currentUserInfo.uid, "admin", item.adminId);
          arr.push({ ...item.val(), groupId: item.key });
        }
      });
      setMyGroupList(arr);
    });
  }, []);

  const handleGroupReqAccept = (acceptMember) => {
    console.log("item", acceptMember);
    set(
      ref(db, "groupMembers/" + (acceptMember.groupId + acceptMember.userId)),
      {
        ...acceptMember,
      },
    ).then(() => {
      remove(ref(db, "groupReq/" + acceptMember.groupRequestId));
    });
  };
  const handleGroupReqDelete = (item) => {
    remove(ref(db, "groupReq/" + item.groupRequestId));
  };
  const handleGroupMember = (acceptMember) => {
    const joiningRequest = ref(db, "groupMembers/");
    onValue(joiningRequest, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          currentUserInfo.uid === acceptMember.adminId &&
          acceptMember.groupId == item.val().groupId
        ) {
          arr.push({ ...item.val(), groupMemberId: item.key });
        }
      });
      setGroupMember(arr);
    });
    setOpenModelTwo(true);
  };

  const handleRemoveGropeMember = (item) => {
    console.log("remove group member", item);
    remove(ref(db, "groupMembers/" + item.groupMemberId));
  };
  return (
    <div className="box  scroll-container">
      <div className="group-heading">
        <h3>My Group</h3>
        <Button>
          <BsThreeDotsVertical></BsThreeDotsVertical>
        </Button>
      </div>

      {myGroupList.map((item, index) => (
        <div key={index} className="group-card-body">
          <div className="profile">
            <img src="https://i.ibb.co/xGrXcnP/profile.png" alt="" />
          </div>
          <div className="title">
            <h4 className="groupsName">{item.groupName}</h4>
            <p className="messageTitle">{item.groupTagLine}</p>
            <span>{item.adminName}</span>
          </div>
          <Button
            onClick={() => {
              handleOpen(item);
            }}
            variant="contained"
            sx={{ padding: "0px 10px", backgroundColor: "#5f35f5" }}
          >
            Request
          </Button>
          <Modal
            open={openModel}
            onClose={handleCloseOne}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <Typography
                  sx={{
                    display: "block",
                    fontSize: "24px",
                    borderBottom: "1px solid gray",
                    padding: "10px",
                  }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Join Request
                </Typography>
                {groupJoiningRequestList.map((item, index) => (
                  <div key={index}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${item.userName}`}
                        secondary={
                          <React.Fragment>
                            {" — This user wants to join This group…"}

                            <div style={{ marginTop: "10px" }}>
                              <Button
                                onClick={() => handleGroupReqAccept(item)}
                                variant="contained"
                                sx={{
                                  marginLeft: "5px",
                                  padding: "0px 10px",
                                  backgroundColor: "green",
                                  color: "white",
                                }}
                              >
                                Accept
                              </Button>
                              <Button
                                onClick={() => handleGroupReqDelete(item)}
                                variant="contained"
                                sx={{
                                  marginLeft: "5px",
                                  padding: "0px 10px",
                                  backgroundColor: "red",
                                  color: "white",
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
                ))}
              </List>
            </Box>
          </Modal>

          <Button
            onClick={() => {
              handleGroupMember(item);
            }}
            variant="contained"
            sx={{
              marginLeft: "5px",
              padding: "0px 10px",
              backgroundColor: "#5f35f5",
            }}
          >
            Member
          </Button>
          <Modal
            open={openModelTwo}
            onClose={handleCloseTwo}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <Typography
                  sx={{
                    display: "block",
                    fontSize: "24px",
                    borderBottom: "1px solid gray",
                    padding: "10px",
                  }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Group Member List
                </Typography>
                {groupMember?.map((item, index) => (
                  <div key={index}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${item.userName}`}
                        secondary={
                          <React.Fragment>
                            {" is group member"}

                            <div style={{ marginTop: "10px" }}>
                              <Button
                                onClick={() => handleRemoveGropeMember(item)}
                                variant="contained"
                                sx={{
                                  marginLeft: "5px",
                                  padding: "0px 10px",
                                  backgroundColor: "red",
                                  color: "white",
                                }}
                              >
                                Remove
                              </Button>
                            </div>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
                ))}
              </List>
            </Box>
          </Modal>
        </div>
      ))}
    </div>
  );
};

export default MyGroup;
