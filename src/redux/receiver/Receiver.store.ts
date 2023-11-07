import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Receiver = {
  id: number;
  name: string;
};

const receiver = createSlice({
  name: "receivers",
  initialState: [],
  reducers: {
    set(_, action: PayloadAction<Receiver[]>) {
      return action.payload;
    },
  },
});

export const { set } = receiver.actions;
export default receiver.reducer;
