import { configureStore } from "@reduxjs/toolkit";
import receiverReducer from "./receiver/Receiver.store";
import pageReducer from "./page/Page.store";
import dialogReducer from "./dialog/Dialog.store";

const store = configureStore({
  reducer: {
    receivers: receiverReducer,
    page: pageReducer,
    dialog: dialogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
