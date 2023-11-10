import { TDialog } from "@core/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

const dialog = createSlice({
  name: "dialog",
  initialState: {
    content: null,
  } as TDialog,
  reducers: {
    setContent(state, action: PayloadAction<ReactNode>) {
      return { ...state, content: action.payload };
    },
  },
});

export const { setContent } = dialog.actions;
export default dialog.reducer;
