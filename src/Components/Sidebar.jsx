import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiFillMessage, AiFillSetting } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { VscSignOut } from "react-icons/vsc";
import { getAuth, signOut } from "firebase/auth";
import { logUser } from "../Slice/userSlicer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Slider from "@mui/material/Slider";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const [zoom, setZoom] = useState(1);
  const navigate = useNavigate();
   const currentUserInfo = useSelector((state) => state?.userAuth?.value);
  const dispatch= useDispatch()
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    backgroundColor: "#fff",
  };

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(logUser(null))
        localStorage.removeItem('userinfo')
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div>
      <div className="navbar">
        <div className="navbar-container">
          <div
            //   onClick={handleOpen}
            className="navbarImg"
          >
            <img
              // src={isLoginUserData?.photoURL}
              alt=""
            />
            <p className="author">
             {currentUserInfo?.displayName.split(" ").slice(0, 2).join(" ")}
            </p>
          </div>
          <ul className="list">
            <li>
              <NavLink className="icon" to="/home">
                <AiOutlineHome></AiOutlineHome>
              </NavLink>
            </li>
            <li>
              <NavLink className="icon" to="/message">
                <AiFillMessage></AiFillMessage>
              </NavLink>
            </li>
            <li>
              <NavLink className="icon" to="/notification">
                <IoIosNotifications></IoIosNotifications>
              </NavLink>
            </li>
            <li>
              <NavLink className="icon" to="/setting">
                <AiFillSetting></AiFillSetting>
              </NavLink>
            </li>
            <li onClick={handleSignOut}>
              <NavLink className="logout">
                <VscSignOut></VscSignOut>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <Modal
        // open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <input
              //    onChange={(e)=>handleImageChange(e)}

              type="file"
            />
          </div>
          <div style={{ background: "#fff" }}>
            {/*  {dogImg && <Cropper
      image={dogImg}
      crop={crop}
      rotation={rotation}
      zoom={zoom}
      aspect={1}
      cropShape="round"
      showGrid={false}
      onCropChange={onCropChange}
      onCropComplete={onCropComplete}
      onZoomChange={onZoomChange}
    />} */}
          </div>
          <div>
            <div>
              <Typography variant="overline">Zoom</Typography>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </div>
            <div>
              <Typography variant="overline">Rotation</Typography>
              <Slider
                // value={rotation}
                min={0}
                max={360}
                step={1}
                aria-labelledby="Rotation"
                // onChange={(e, rotation) => setRotation(rotation)}
              />
            </div>
          </div>
          <Button
            //  onClick={showCroppedImage}
            variant="contained"
            color="primary"
          >
            Show Result
          </Button>

          {/* {croppedImage && <img src={croppedImage} alt="hello"/>} */}
        </Box>
      </Modal>
    </div>
  );
};

export default Sidebar;
