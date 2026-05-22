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
import { useDispatch, useSelector } from "react-redux";
import { FaComments } from "react-icons/fa";
import { activeChat } from "../Slice/activeChatslicer";

const FriendsList = ({ buttons }) => {
  const dispatch = useDispatch();
  const currentUserInfo = useSelector((state) => state?.userAuth?.value);
  const [getFnds, setGetFnds] = useState([]);
  const db = getDatabase();
  useEffect(() => {
    const fndRequestData = ref(db, "friends/");
    onValue(fndRequestData, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), friendId: item.key });
      });
      setGetFnds(arr);
    });
  }, []);
  const handleBlock = (items) => {
    console.log("block users", items);
    if (currentUserInfo.uid === items.whoSendID) {
      set(push(ref(db, "blocklist")), {
        blockId: items.whoReceiveID,
        blockName: items.whoReceiveName,
        blockById: items.whoSendID,
        blockByName: items.whoSendName,
      }).then(() => {
        remove(ref(db, "friends/", items.friendId));
      });
    } else {
      set(push(ref(db, "blocklist")), {
        blockId: items.whoSendID,
        blockName: items.whoSendName,
        blockById: items.whoReceiveID,
        blockByName: items.whoReceiveName,
      }).then(() => {
        remove(ref(db, "friends/", items.friendId));
      });
    }
  };
  const handleMsg = (items) => {
    if (currentUserInfo.uid === items.whoSendID) {
      dispatch(
        activeChat({
          type: "singleMsg",
          activeChatId: items.whoReceiveID,
          activeChatName: items.whoReceiveName,
        }),
      );
      localStorage.setItem(
        "activeChat",
        JSON.stringify({
          type: "singleMsg",
          activeChatId: items.whoReceiveID,
          activeChatName: items.whoReceiveName,
        }),
      );
    } else {
      dispatch(
        activeChat({
          type: "singleMsg",
          activeChatId: items.whoSendID,
          activeChatName: items.whoSendName,
        }),
      );
      localStorage.setItem(
        "activeChat",
        JSON.stringify({
          type: "singleMsg",
          activeChatId: items.whoSendID,
          activeChatName: items.whoSendName,
        }),
      );
    }
  };

  return (
    <div className="box  scroll-container">
      <div className="group-heading">
        <h3>Friends</h3>
        {/* <Button>Create Account</Button> */}
      </div>
      {getFnds?.map((items, index) => (
        <div className="group-card-body">
          <div className="profile">
            <img src="https://i.ibb.co/xGrXcnP/profile.png" alt="" />
          </div>
          <div className="title">
            {currentUserInfo.uid === items.whoSendID ? (
              <h4 className="groupsName">{items.whoReceiveName}</h4>
            ) : (
              <h4 className="groupsName">{items.whoSendName}</h4>
            )}
            {/* <p className="messageTitle">{items.who}</p> */}
          </div>

          {buttons === "msg" ? (
            <Button
              className="addBtn"
              onClick={() => {
                handleMsg(items);
              }}
            >
              <FaComments></FaComments>MSG
            </Button>
          ) : (
            <Button className="addBtn" onClick={() => handleBlock(items)}>
              block
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
