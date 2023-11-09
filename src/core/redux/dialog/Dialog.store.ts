import { TDialog } from "@core/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

const dialog = createSlice({
  name: "dialog",
  initialState: {
    isOpen: false,
    content: null,
  } as TDialog,
  reducers: {
    setIsOpen(state, action: PayloadAction<boolean>) {
      return { content: state.content, isOpen: action.payload };
    },
    setContent(state, action: PayloadAction<ReactNode>) {
      return { isOpen: state.isOpen, content: action.payload };
    },
  },
});

export const { setIsOpen, setContent } = dialog.actions;
export default dialog.reducer;
