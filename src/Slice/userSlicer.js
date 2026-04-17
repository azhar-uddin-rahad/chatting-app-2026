import { createSlice } from '@reduxjs/toolkit'

export const userSlicer = createSlice({
  name: 'counter',
  initialState: {
    value:  localStorage.getItem('userinfo')? JSON.parse(localStorage.getItem('userinfo')) : null
  },
  reducers: {
  
    logUser:(state,action)=>{
      state.value = action.payload
    },

    /* 

  
    incrementByAmount: (state, action) => {
      state.value += action.payload
    } */
  }
})

// Action creators are generated for each case reducer function
export const {  logUser } = userSlicer.actions

export default userSlicer.reducer