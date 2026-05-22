import React, { useEffect, useState } from 'react'
import { BiDotsVertical } from 'react-icons/bi';
import { BsFileEarmarkImage } from 'react-icons/bs';
import { Button } from "@mui/material";
import moment from 'moment/moment';

import ModalImage from 'react-modal-image';
import { getDatabase, onValue, push, ref,set } from 'firebase/database';
import { useSelector } from 'react-redux';
const ChatBox = () => {
const [msg, setMsg] = useState("");

  const [messageList, setMessageList] = useState([]);
  const [groupMessageList, setGroupMessageList] = useState([]);
  const db = getDatabase();
  const [progress, setProgress] = useState(0);
  const [showEmoji, setShowEmoji] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [audioUp, setAudioUp] = useState("");
   const currentUserInfo = useSelector((state) => state?.userAuth?.value);
  const activeChatInfo= useSelector(state => state?.activeChat.value);
  console.log('active Chat',activeChatInfo)
    useEffect(() => {
      console.log("Hello world")
    const starCountRef = ref(db, "singlemsg/");
    onValue(starCountRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        console.log(item.val());
        if (
          (item.val().whoSendId === currentUserInfo.uid &&
            item.val().whoReceivedId === activeChatInfo.activeChatId) ||
          (item.val().whoSendId === activeChatInfo.activeChatId &&
            item.val().whoReceivedId === currentUserInfo.uid)
        ) {
       
        console.log('loading message', item.val())
        arr.push(item.val());
         }
      }); 
      setMessageList(arr);
    });
  }, [activeChatInfo?.activeChatId]);
useEffect(() => {
    const starCountRef = ref(db, "groupmsg/");
    onValue(starCountRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        console.log(item.val());
        arr.push(item.val());
      });
      setGroupMessageList(arr);
    });
  }, [activeChatInfo?.activeChatId]);
  
 const handleMessage = (e) => {
    setMsg(e.target.value);
  };

  const handleSendMessage =()=>{
    if(activeChatInfo.type === "groupMsg"){
      if(msg != ""){
          set(push(ref(db, "groupmsg/")), {
          whoSendName: currentUserInfo.displayName,
          whoSendId: currentUserInfo.uid,
          whoReceivedId: activeChatInfo.activeChatId,
          whoReceiveName: activeChatInfo.activeChatName,
          msg: msg,
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
        });
      }
    }
    else{
       if(msg != ""){
          set(push(ref(db, "singlemsg/")), {
          whoSendName: currentUserInfo.displayName,
          whoSendId: currentUserInfo.uid,
          whoReceivedId: activeChatInfo.activeChatId,
          whoReceiveName: activeChatInfo.activeChatName,
          msg: msg,
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
        });
      }
    }
  }
  console.log(msg)
  return (
    <div>
      <div className="chatBoxContainer">
      <div className="chatBox">
        <div className="profileSection">
          <div className="profileContent">
            <div className="profilePicture">
              <img src={"https://i.ibb.co/xGrXcnP/profile.png"} alt="" />
            </div>
            <div>
              <p>{activeChatInfo?.activeChatName}</p>
              <p>Online</p>
            </div>
          </div>
          <p>
            <BiDotsVertical></BiDotsVertical>
          </p>
        </div>
        <div className="middleContent">
           {activeChatInfo?.type === "singleMsg"
            ? messageList.map((item, index) =>
                item?.whoSendId === currentUserInfo?.uid &&
                activeChatInfo?.activeChatId === item?.whoReceivedId ?
                  <div key={index} className="msg">
                    {item.msg && (
                      <>
                        <div className="sendMsg">
                          <div className="sendMsContent">
                            <p>{item.msg}</p>
                          </div>
                          <div className="sendMsArrow"></div>
                        </div>
                        <p className="time">
                        {moment(20111031, "YYYYMMDD hh:mm").fromNow()} 
                        </p>
                      </>
                    ) }
                  </div>
                    : item.whoSendId === activeChatInfo.activeChatId &&
                  item.whoReceivedId === currentUserInfo.uid && 
                    <div key={index} className="msg">
                      {item.msg && 
                      <>
            <div className="getMsg">
              <div className="getMsContent">
                            <p>{item.msg}</p>
                          </div>

              <div className="getMsgArrow"></div>
            </div>
            <p className="time"> {moment(20111031, "YYYYMMDD hh:mm").fromNow()} </p>
             </>
            }    
          </div>
            ) :  groupMessageList.map((item, index) =>
                item.whoSendId === currentUserInfo.uid ? 
                  <div key={index} className="msg">
                    {item.msg &&  <>
                        <div className="sendMsg">
                          <div className="sendMsContent">
                            <p>{item.msg}</p>
                          </div>
                          <div className="sendMsArrow"></div>
                        </div>
                        <p className="time">
                        {moment(20111031, "YYYYMMDD hh:mm").fromNow()} 
                        </p>
                      </>
                          }
                    </div>
                    :  item.whoReceivedId == activeChatInfo.activeChatId && 
                    <div key={index} className="msg">
                      {item.msg && 
                        <>
                          <div className="getMsg">
                            <div className="getMsgContent">
                              <p>{item.msg}</p>
                            </div>
                            <div className="getMsgArrow"></div>
                          </div>
                          <p className="time">
                            {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                          </p>
                        </>
                        }
                        </div>
                        
                        )}

       {/*    <div className="msg">
            <div className="getImg">
              <ModalImage
                small={"https://www.theaureview.com/wp-content/uploads/2022/10/BIGSOUND_2022-7578.jpg"}
                large={"https://www.theaureview.com/wp-content/uploads/2022/10/BIGSOUND_2022-7578.jpg"}
                alt="Hello World!"
              />

              <div className="getImgArrow"></div>
            </div>
            <p className="time">Today, 2:02pm</p>
          </div>

          <div className="msg">
            <div className="sendImg">
              <ModalImage
                small={"https://www.theaureview.com/wp-content/uploads/2022/10/BIGSOUND_2022-7578.jpg"}
                large={"https://www.theaureview.com/wp-content/uploads/2022/10/BIGSOUND_2022-7578.jpg"}
                alt="picture"
              />

              <div className="sendImgArrow"></div>
            </div>
            <p className="time">Today, 2:02pm</p>
          </div>

         <div className="msg">
            <div className="getVideo">
              <video width="320" height="240" controls></video>
              <div className="getMsgArrow"></div>
            </div>
            <p className="time">Today, 2:02pm</p>
          </div>
          <div className="msg">
            <div className="sendVideo">
            <video width="320" height="240" controls></video>
              <div className="sendVideoArrow"></div>
            </div>
            <p className="time">Today, 2:02pm</p>
          </div> 

       <div className="msg">
            <div className="getVoice">
              <audio controls></audio>
            </div>
            <p className="time">Today, 2:02pm</p>
          </div>
          <div className="msg">
            <div className="sendVoice">
              <audio controls></audio>
            </div>
            <p className="time">Today, 2:02pm</p>
          </div> */}
        
      </div>
     {/*  {progress != 0 && (
        <LinearProgressWithLabel value={progress}></LinearProgressWithLabel>
      )} */}
      <div className="messageInputBox">
        <div className="inputBox">
          <input
            // onKeyUp={handleKeyPress}
          onChange={(e) => handleMessage(e)}
          type="text"
           value={msg}
          />
         {/*  {audioUrl && (
            <audio src={audioUrl} className="audioContainer"  controls></audio>
          )}
          <BsFillEmojiSmileUpsideDownFill
            onClick={() => setShowEmoji(!showEmoji)}
            style={{
              fontSize: "40px",
              position: "absolute",
              right: "20%",
              bottom: "10px",
              color: "#407BFF",
            }}
          ></BsFillEmojiSmileUpsideDownFill>
          <AudioRecorder
            onRecordingComplete={addAudioElement}
            audioTrackConstraints={{
              noiseSuppression: true,
              echoCancellation: true,
            }}
            downloadOnSavePress={true}
            downloadFileExtension="webm"
          /> */}

          {/* {showEmoji && (
            <div className="emoji">
              <EmojiPicker onEmojiClick={handleEmoji} />
            </div>
          )} */}
        </div>
        <label htmlFor="uploadImg">
          <BsFileEarmarkImage
            style={{
              fontSize: "40px",
              position: "absolute",
              right: "15%",
              bottom: "10px",
            }}
          ></BsFileEarmarkImage>

          <input
            type="file"
            // onChange={(e) => {
            //   handleImageUpload(e);
            // }}
            style={{ display: "none" }}
            id="uploadImg"
          />
        </label>
        {/* {audioUrl && (
          <>
            <Button
            //   onClick={handleAudioMessage}
              variant="contained"
              
              sx={{
                background: "#5f35f5",
                padding: "10px 30px",
                color: "#fff",
              }}
            >
              Send
            </Button>
            <Button
            //   onClick={() => setAudioUrl("")}
              variant="contained"
              sx={{
                background: "#5f35f5",
                padding: "10px 30px",
                color: "#fff",
              }}
            >
              X
            </Button>
          </>
        )} */}

     
          <Button
          onClick={handleSendMessage}
            variant="contained"
            sx={{ background: "#5f35f5", padding: "10px 30px", color: "#fff" }}
          >
            Send
          </Button>
       
      </div>
    </div>
    </div>
    </div>
  )
}

export default ChatBox