import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PageEnum } from "@core/enum";

const page = createSlice({
  name: "page",
  initialState: PageEnum.HOME,
  reducers: {
    set(_, action: PayloadAction<PageEnum>) {
      return action.payload;
    },
  },
});

export const { set } = page.actions;
export default page.reducer;
