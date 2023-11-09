import { configureStore } from "@reduxjs/toolkit";
import { RootState } from "../store";
import pageReducer, { set } from "./Page.store";
import { PageEnum } from "@core/enum";

describe("Redux Store Test", () => {
  let store: ReturnType<typeof configureStore>;

  beforeAll(() => {
    store = configureStore({
      reducer: {
        page: pageReducer,
      },
    });
  });

  beforeEach(() => {
    store.dispatch(set(PageEnum.HOME));
  });

  it("should set the receiver data in the store", () => {
    store.dispatch(set(PageEnum.RECEIVER));

    const state = store.getState();

    expect((state as RootState).page).toEqual(PageEnum.RECEIVER);
  });

  it("should handle initial state", () => {
    const initialState = store.getState();

    expect((initialState as RootState).page).toEqual(PageEnum.HOME);
  });
});
