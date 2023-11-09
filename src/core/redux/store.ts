import { configureStore } from "@reduxjs/toolkit";
import receiverReducer from "./receiver/Receiver.store";
import pageReducer from "./page/Page.store";
import dialogReducer from "./dialog/Dialog.store";
import toastReducer from "./toast/Toast.store";

const store = configureStore({
  reducer: {
    receivers: receiverReducer,
    page: pageReducer,
    dialog: dialogReducer,
    toast: toastReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
