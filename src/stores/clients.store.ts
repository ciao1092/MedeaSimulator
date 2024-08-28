import { ResponseData } from "@/pages/api/RequestResponseData";

export type WaitingClient = {
    resolve: (value: ResponseData) => void;
    reject: (reason?: any) => void;
};

let waitingClients: Map<WaitingClient, string | undefined> = new Map();

const clearWaitingClients = () => waitingClients.clear();

export { waitingClients, clearWaitingClients };
