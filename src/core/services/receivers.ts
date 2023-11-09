import { TReceiverApi } from "@core/types";
import api from "./base";

async function findAll() {
  return api.get<TReceiverApi[]>("/receivers");
}

async function save(receiver: TReceiverApi) {
  return api.post<TReceiverApi>("/receivers", receiver);
}

async function update(receiver: TReceiverApi) {
  return api.put(`/receivers/${receiver.id}`, receiver);
}

export default { findAll, save, update };
