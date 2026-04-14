import { configureStore } from '@reduxjs/toolkit'
import  userSlicer from './Slice/userSlicer'


export default configureStore({
  reducer: {
    counter: userSlicer
  }
})