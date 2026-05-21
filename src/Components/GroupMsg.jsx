import { Button } from "@mui/material";
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const GroupMsg = () => {
  const db = getDatabase();
  const [myGroupList, setMyGroupList] = useState([]);
  const [myJoinedGroupList, setMyJoinedGroupList] = useState([]);
  const currentUserInfo = useSelector((state) => state?.userAuth?.value);
  useEffect(() => {
    const myCreatedGroupList = ref(db, "group");
    onValue(myCreatedGroupList, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), groupId: item.key });

        // console.log("I am  friend request id", item.val().whoReceiveID,'dddddd');
      });
      setMyGroupList(arr);
    });
  }, []);
  useEffect(() => {
    const joinedGroupList = ref(db, "groupMembers");
    onValue(joinedGroupList, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      setMyJoinedGroupList(arr);
    });
  }, []);

  console.log("myGroupList", myJoinedGroupList);

  return (
    <div>
      <div className="box scroll-container">
        <div className="group-heading">
          <h3>Groups List</h3>
        </div>
        {myGroupList.map((item, index) =>
          item.adminId === currentUserInfo.uid ? (
            <div className="group-card-body">
              <div className="profile">
                <img src={"https://i.ibb.co/xGrXcnP/profile.png"} alt="" />
              </div>
              <div className="title">
                <p className="messageTitle">Admin :{item?.adminName}</p>
                <h4 className="groupsName">groupName: {item?.groupName}</h4>
                <p className="messageTitle">
                  groupTagLine: {item?.groupTagLine}{" "}
                </p>
              </div>
              <Button
                variant="contained"
                sx={{ padding: "0px 10px", backgroundColor: "#5f35f5" }}
                //   onClick={()=>handleGroupMessage(item)}
              >
                Admin
              </Button>
            </div>
          ) : (
            myJoinedGroupList.map(
              (member, idx) =>
                currentUserInfo.uid == member.userId &&
                item.groupId === member.groupId && (
                  <div className="group-card-body">
                    <div className="profile">
                      <img
                        src={"https://i.ibb.co/xGrXcnP/profile.png"}
                        alt=""
                      />
                    </div>
                    <div className="title">
                      <p className="messageTitle">Admin :{member?.adminName}</p>
                      <h4 className="groupsName">
                        groupName: {member?.groupName}
                      </h4>
                      <p className="messageTitle">
                        groupTagLine: {member?.groupTagLine}{" "}
                      </p>
                    </div>
                    <Button
                      variant="contained"
                      sx={{
                        marginLeft: "5px",
                        padding: "0px 10px",
                        backgroundColor: "#5f35f5",
                      }}
                      // onClick={()=>handleGroupMessage(item)}
                    >
                      Member
                    </Button>
                  </div>
                ),
            )
          ),
        )}
      </div>
    </div>
  );
};

export default GroupMsg;
