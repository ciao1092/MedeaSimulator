import type { NextApiRequest, NextApiResponse } from "next";
import {
    waitingClients,
    clearWaitingClients,
    WaitingClient,
} from "@/stores/clients.store";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method !== "GET") {
            throw new Error("Unsupported method: " + req.method);
        } else {
            let isClientDisconnected: boolean = false;

            const waitForMessage = new Promise((resolve, reject) => {
                const client = { resolve, reject };
                waitingClients.set(client, undefined);

                // handle client closing connection before any data is sent
                res.on("close", () => {
                    isClientDisconnected = true;
                    waitingClients.delete(client);
                    reject(new Error("Connection closed"));
                });
            });

            if (!isClientDisconnected) {
                return res.status(200).json(await waitForMessage);
            }
        }
    } catch (e: unknown) {
        waitingClients.forEach(
            (_from: string | undefined, client: WaitingClient) =>
                client.reject(e)
        );
        clearWaitingClients();
        return res
            .status(500)
            .json({ message: (e as any).message ?? JSON.stringify(e) });
    }
}
