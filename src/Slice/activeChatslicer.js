import { createSlice } from '@reduxjs/toolkit'

export const activeChatSlicer = createSlice({
  name: 'activeChat',
  initialState: {
    value:   localStorage.getItem("activeChat") ? JSON.parse(localStorage.getItem("activeChat")) : null
  },
  reducers: {
  
    activeChat:(state,action)=>{
         state.value = action.payload
    //   state.value = action.payload
    },

   
  }
})

// Action creators are generated for each case reducer function
export const {  activeChat } = activeChatSlicer.actions

export default activeChatSlicer.reducer