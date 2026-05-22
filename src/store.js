import { configureStore } from '@reduxjs/toolkit'
import  userSlicer from './Slice/userSlicer'
import activeChatSlicer from "./Slice/activeChatslicer"

export default configureStore({
  reducer: {
    userAuth: userSlicer,
    activeChat:activeChatSlicer
  }
})