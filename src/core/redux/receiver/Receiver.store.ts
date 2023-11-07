import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TReceiver } from "../../../shared/types";

const receiver = createSlice({
  name: "receivers",
  initialState: [] as TReceiver[],
  reducers: {
    set(_, action: PayloadAction<TReceiver[]>) {
      return action.payload;
    },
  },
});

export const { set } = receiver.actions;
export default receiver.reducer;
