import { TReceiver } from "../../shared/types";
import api from "./base";

async function getReceivers() {
    return api.get<TReceiver[]>('/receivers');
}

export default { getReceivers }