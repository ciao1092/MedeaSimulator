import * as fsPromises from "fs/promises";
import * as fs from "fs";
import { doWithLock } from "@/locking";
import Message from "@/models/message.model";

const messageStoreLock: string = "messageStoreLock";

const dataFile: string = "src/data/messages.json";

if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify(Array()));
}

async function getAllMessages(): Promise<Message[]> {
    return await doWithLock(messageStoreLock, async function () {
        const messageFileData: string = (
            await fsPromises.readFile(dataFile)
        ).toString();
        return JSON.parse(messageFileData) as Array<Message>;
    });
}

async function getMessageByFrom(from: string): Promise<Message[]> {
    return (await getAllMessages()).filter((m) => m.from === from);
}

async function newMessage({
    text,
    from,
}: {
    from: string;
    text: string;
}): Promise<Message> {
    const messages: Array<Message> = await getAllMessages();
    const newMessage: Message = {
        id: messages.length,
        from,
        text,
        when: new Date(),
    };
    const newMessages: Array<Message> = [...messages, newMessage];
    await doWithLock(messageStoreLock, async () => {
        await fsPromises.writeFile(dataFile, JSON.stringify(newMessages));
    });
    return newMessage;
}

export default {
    getMessageByFrom,
    newMessage,
    getAllMessages,
};
