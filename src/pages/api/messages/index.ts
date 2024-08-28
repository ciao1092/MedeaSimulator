import Message from "@/models/message.model";
import type { NextApiRequest, NextApiResponse } from "next";
import messageStore from "@/data/messageStore";
import { waitingClients } from "@/stores/clients.store";
import { RequestData, ResponseData } from "../RequestResponseData";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        if (req.method === "POST") {
            const requestData =
                typeof req.body === "string"
                    ? (JSON.parse(req.body) as RequestData)
                    : (req.body as RequestData);

            if (!requestData.message) {
                console.error(requestData);
                throw new Error("message is a required parameter");
            }
            const text = requestData.message.text;
            const from = requestData.message.from;
            if (!from) throw new Error("Missing required field: from");
            if (!text) throw new Error("Missing required field: text");
            const newMessage = await messageStore.newMessage({
                text,
                from,
            });
            res.status(201).json({ message: "Sent", created: newMessage });

            waitingClients.forEach((from, client) => {
                if (from && from !== newMessage.from) return;
                else {
                    client.resolve({ message: "OK", newMessage });
                }
            });

            return;
        } else if (req.method === "GET") {
            const messages = await messageStore.getAllMessages();
            return res.status(200).json({ message: "OK", messages });
        } else {
            return res.status(501).send({ message: "Not implemented" });
        }
    } catch (e: unknown) {
        console.error(e);
        return res
            .status(500)
            .json({ message: (e as any).message ?? JSON.stringify(e) });
    }
}
