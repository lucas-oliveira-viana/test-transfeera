import { configureStore } from "@reduxjs/toolkit";
import receiverReducer from "./receiver/Receiver.store";
import pageReducer from "./page/Page.store";

const store = configureStore({
  reducer: {
    receivers: receiverReducer,
    page: pageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
