import api from "./base";

async function getReceivers() {
    return api.get('/receivers');
}

export default { getReceivers }