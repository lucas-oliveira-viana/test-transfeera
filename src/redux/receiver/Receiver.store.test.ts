import { configureStore } from "@reduxjs/toolkit";
import receiverReducer, { Receiver, set } from "./Receiver.store";
import { RootState } from "../store";

describe("Redux Store Test", () => {
  let store: ReturnType<typeof configureStore>;

  beforeAll(() => {
    store = configureStore({
      reducer: {
        receivers: receiverReducer,
      },
    });
  });

  beforeEach(() => {
    store.dispatch(set([]))
  })

  it("should set the receiver data in the store", () => {
    const data: Receiver[] = [{ id: 1, name: "John Doe" }];

    store.dispatch(set(data));

    const state = store.getState();

    expect((state as RootState).receivers).toEqual(data);
  });

  it("should handle initial state", () => {
    const initialState = store.getState();

    expect((initialState as RootState).receivers).toEqual([]);
  });
});
