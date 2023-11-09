import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TReceiverApi, TReceiverFormData } from "../../types";

const receiver = createSlice({
  name: "receivers",
  initialState: {
    formData: null,
    apiResponse: null,
  },
  reducers: {
    setApiResponse(state, action: PayloadAction<TReceiverApi[] | null>) {
      return { formData: state?.formData, apiResponse: action.payload };
    },
    setFormData(state, action: PayloadAction<TReceiverFormData | null>) {
      return { apiResponse: state?.apiResponse, formData: action.payload };
    },
  },
});

export const { setApiResponse, setFormData } = receiver.actions;
export default receiver.reducer;
