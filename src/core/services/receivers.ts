import { TReceiverSource } from "@core/types";
import api from "./base";

async function findAll() {
  return api.get<TReceiverSource[]>("/receivers");
}

async function save(receiver: TReceiverSource) {
  return api.post<TReceiverSource>("/receivers", receiver);
}

async function update(receiver: TReceiverSource) {
  return api.put(`/receivers/${receiver.id}`, receiver);
}

async function removeById(id: string) {
  return api.delete(`/receivers/${id}`);
}

export default { findAll, save, update, removeById };
