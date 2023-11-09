import { TToast } from "@core/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

const toast = createSlice({
  name: "toast",
  initialState: {
    isOpen: false,
    content: null,
  } as TToast,
  reducers: {
    setIsOpen(state, action: PayloadAction<boolean>) {
      return { content: state.content, isOpen: action.payload };
    },
    setContent(state, action: PayloadAction<ReactNode>) {
      return { isOpen: state.isOpen, content: action.payload };
    },
  },
});

export const { setIsOpen, setContent } = toast.actions;
export default toast.reducer;
