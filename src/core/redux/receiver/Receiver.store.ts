import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TReceiverSource, TReceiverToEdit } from "../../types";

const receiver = createSlice({
  name: "receivers",
  initialState: {
    receiverToEdit: null,
    source: null,
  },
  reducers: {
    setSource(state, action: PayloadAction<TReceiverSource[] | null>) {
      return { receiverToEdit: state?.receiverToEdit, source: action.payload };
    },
    setToEdit(state, action: PayloadAction<TReceiverToEdit | null>) {
      return { source: state?.source, receiverToEdit: action.payload };
    },
  },
});

export const { setSource, setToEdit } = receiver.actions;
export default receiver.reducer;
