import { TToast } from "@core/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

const toast = createSlice({
  name: "toast",
  initialState: {
    content: null,
  } as TToast,
  reducers: {
    setContent(state, action: PayloadAction<ReactNode>) {
      return { ...state, content: action.payload };
    },
  },
});

export const { setContent } = toast.actions;
export default toast.reducer;
