import {
  TPaginationQueryParams,
  TReceiverQueryParams,
  TReceiverSource,
} from "@core/types";
import api from "./base";

async function find(params: TReceiverQueryParams) {
  return api.get<TReceiverSource[]>("/receivers", { params });
}

async function save(receiver: TReceiverSource) {
  return api.post<TReceiverSource>("/receivers", receiver);
}

async function update(receiver: TReceiverSource) {
  return api.put(`/receivers/${receiver.id}`, receiver);
}

async function patch(receiver: Partial<TReceiverSource>) {
  return api.patch(`/receivers/${receiver.id}`, receiver);
}

async function removeById(id: string) {
  return api.delete(`/receivers/${id}`);
}

export default { find, save, update, patch, removeById };
