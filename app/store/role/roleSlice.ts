import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
  name: "role",
  initialState: {
    role: null,
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    removeRole: (state) => {
      state.role = null;
    },
  },
});

export const { setRole, removeRole } = roleSlice.actions;
export default roleSlice;
