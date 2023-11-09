import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TReceiverSource, TReceiverFormData } from "../../types";

const receiver = createSlice({
  name: "receivers",
  initialState: {
    formData: null,
    apiResponse: null,
  },
  reducers: {
    setSourceResponse(state, action: PayloadAction<TReceiverSource[] | null>) {
      return { formData: state?.formData, apiResponse: action.payload };
    },
    setFormData(state, action: PayloadAction<TReceiverFormData | null>) {
      return { apiResponse: state?.apiResponse, formData: action.payload };
    },
  },
});

export const { setSourceResponse, setFormData } = receiver.actions;
export default receiver.reducer;
