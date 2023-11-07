import { TReceiver } from "../types";
import api from "./base";

async function getReceivers() {
    return api.get<TReceiver[]>('/receivers');
}

export default { getReceivers }