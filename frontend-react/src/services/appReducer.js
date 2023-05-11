import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    uid: 0,
    calenderPopup: "",
    data: {}
  },
  reducers: {
    setUid: (state, action) => {
      let uid = action.payload
      console.log({ uid })
      localStorage.setItem("uid", uid);
      state.uid = uid
    },
    setCalenderPopup: (state, action) => {
      state.calenderPopup = action.payload
    },
    setData: (state, action) => {
      state.data = action.payload
    },
    updateTodos: (state, action) => {
      if (state.data[state.calenderPopup]) {
        state.data[state.calenderPopup].push(action.payload.text)
      } else {
        state.data[state.calenderPopup] = [action.payload.text]
      }
    },
    deleteTodo: (state, action) => {
      state.data[state.calenderPopup].splice(action.payload.index, 1);
    },
    editTodo: (state, action) => {
      state.data[state.calenderPopup][action.payload.editIndex] = action.payload.editText;
    },
  },
})

// Action creators are generated for each case reducer function
export const appActions = appSlice.actions

export default appSlice.reducer