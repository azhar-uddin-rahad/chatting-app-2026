import React from "react";
import Grid from "@mui/material/Grid";
import FriendsList from "../Components/FriendsList";
import GroupMsg from "../Components/GroupMsg";
import ChatBox from "../Components/ChatBox";
import FriendRequest from "../Components/FriendRequest";
import MyGroup from "../Components/MyGroup";
import UsersList from "../Components/UsersList";
import BlockedUser from "../Components/BlockedUser";
import Group from "../Components/Group";

const Message = () => {
  return (
    <div className="groupContainer">
      <div className="allMessageList">
        <div className="friendMassage">
          <FriendsList buttons="msg" />
        </div>
        <div className="JoinGroupMessage">
          <GroupMsg />
        </div>
      </div>
      <div className="messageContainer">
         <ChatBox />
      </div>
    </div>
  );
};

export default Message;


