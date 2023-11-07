import { configureStore } from "@reduxjs/toolkit";
import receiverReducer, { set } from "./Receiver.store";
import { RootState } from "../store";
import { TPixKey, TStatus } from "../../types";

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
    store.dispatch(set([]));
  });

  it("should set the receiver data in the store", () => {
    const data = [
      {
        id: "12345",
        name: "João da Silva",
        email: "joao.silva@exemplo.com",
        tax_id: "123.456.789-09",
        branch: "Filial Principal",
        account: "1234-56789-0",
        account_type: "Poupança",
        bank_name: "Banco de Exemplo",
        bank_code: "E123",
        pix_key: "joao.silva@banco",
        pix_key_type: "cpf" as TPixKey,
        status: "validado" as TStatus,
        created_at: "2023-11-07T12:00:00Z",
        updated_at: "2023-11-07T14:30:00Z",
      },
    ];

    store.dispatch(set(data));

    const state = store.getState();

    expect((state as RootState).receivers).toEqual(data);
  });

  it("should handle initial state", () => {
    const initialState = store.getState();

    expect((initialState as RootState).receivers).toEqual([]);
  });
});
