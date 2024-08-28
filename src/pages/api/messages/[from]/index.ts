import Message from "@/models/message.model";
import type { NextApiRequest, NextApiResponse } from "next";
import messageStore from "@/data/messageStore";
import { waitingClients } from "@/stores/clients.store";
import { RequestData, ResponseData } from "../../RequestResponseData";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        const from = req.query.from;
        if (!from || typeof from !== "string")
            throw new Error("Expected string");

        return res.status(200).json({
            message: "OK",
            messages: await messageStore.getMessageByFrom(from),
        });
    } catch (e: unknown) {
        return res
            .status(500)
            .json({ message: (e as any).message ?? JSON.stringify(e) });
    }
}
