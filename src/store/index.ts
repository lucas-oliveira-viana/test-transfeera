import { configureStore } from "@reduxjs/toolkit";
import receiverReducer from "./Receiver.store";

const store = configureStore({
  reducer: {
    receivers: receiverReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
