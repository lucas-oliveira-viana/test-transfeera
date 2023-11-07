import { createSlice } from "@reduxjs/toolkit";

const receiver = createSlice({
  name: "receivers",
  initialState: [],
  reducers: {
    set(_, param) {
      return param.payload;
    },
  },
});

export const { set } = receiver.actions;
export default receiver.reducer;
