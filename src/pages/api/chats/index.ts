import Message from "@/models/message.model";
import type { NextApiRequest, NextApiResponse } from "next";
import messageStore from "@/data/messageStore";
import { ResponseData } from "../RequestResponseData";
import Chat from "@/models/chat.model";

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        const chats: Array<Chat> = [];
        const chatsMap: Map<string, Message> = new Map<string, Message>();
        const allMessages: Array<Message> = await messageStore.getAllMessages();
        for (const message of allMessages) {
            chatsMap.set(message.from, message);
        }

        chatsMap.forEach((lastMessage, from) => {
            chats.push({
                from,
                lastMessage: lastMessage.text,
                lastMessageTime: lastMessage.when.toString(),
            });
        });

        return res.status(200).json({ message: "OK", chats });
    } catch (e: unknown) {
        return res
            .status(500)
            .json({ message: (e as any).message ?? JSON.stringify(e) });
    }
}
