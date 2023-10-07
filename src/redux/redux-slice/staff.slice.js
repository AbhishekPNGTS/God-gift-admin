import { createSlice } from "@reduxjs/toolkit";
import {
  getTokenLocal,
  getUserLocal,
  setTokenLocal,
  setUserLocal,
} from "../../utils/localStorage.util.js";

const initialState = {
  v_user_info: getUserLocal(),
  x_auth_token: getTokenLocal(),
  User: [],
};

//internally using immer lib (can create mutable state)
export const staffSlice = createSlice({
  name: "staffData",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      setUserLocal(action.payload);
      state.v_user_info = action.payload;
    },
    updateToken: (state, action) => {
      setTokenLocal(action.payload);
      state.x_auth_token = action.payload;
    },
  },
});

// this is for dispatch
export const { updateUser, updateToken} =
  staffSlice.actions;

// this is for configureStore
export default staffSlice.reducer;
