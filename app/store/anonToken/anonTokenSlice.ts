import { createSlice } from "@reduxjs/toolkit";

const anonTokenSlice = createSlice({
  name: "anonToken",
  initialState: {
    anonToken: null,
  },
  reducers: {
    setAnonToken: (state, action) => {
      state.anonToken = action.payload;
    },
    removeAnonToken: (state) => {
      state.anonToken = null;
    },
  },
});
export const { setAnonToken, removeAnonToken } = anonTokenSlice.actions;
export default anonTokenSlice;
