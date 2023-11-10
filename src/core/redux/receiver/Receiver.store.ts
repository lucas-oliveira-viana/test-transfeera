import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TReceiverSource, TReceiverToEdit } from "../../types";

const receiver = createSlice({
  name: "receivers",
  initialState: {
    receiverToEdit: null,
    source: null,
    sourceTotalCount: null
  },
  reducers: {
    setSource(state, action: PayloadAction<TReceiverSource[] | null>) {
      return { ...state, source: action.payload };
    },
    setToEdit(state, action: PayloadAction<TReceiverToEdit | null>) {
      return { ...state, receiverToEdit: action.payload };
    },
    setSourceTotalCount(state, action: PayloadAction<number | null>) {
      return { ...state, sourceTotalCount: action.payload };
    }
  },
});

export const { setSource, setToEdit, setSourceTotalCount } = receiver.actions;
export default receiver.reducer;
