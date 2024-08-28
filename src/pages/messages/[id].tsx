import Link from "next/link";
import Chat from "@/models/chat.model";
import { useEffect, useRef, useState } from "react";
import Message from "@/models/message.model";
import { relativeDate } from "@/relativeDate";
import NotFound from "../[...notfound]";

const getChats = async (): Promise<Chat[]> =>
    (await fetch("http://localhost:3000/api/chats").then((r) => r.json()))
        .chats;

let chats: Chat[] | undefined = undefined;

async function getAllChatIds() {
    if (!chats) chats = await getChats();
    return chats.map((chat: Chat) => {
        return {
            params: {
                id: chat.from,
            },
        };
    });
}

export const getStaticPaths = async () => {
    const paths = await getAllChatIds();
    return {
        paths,
        fallback: false,
    };
};

export async function getChatsByFrom(from: string): Promise<Chat | undefined> {
    if (!chats) chats = await getChats();
    return chats.find((chat) => chat.from === from);
}

export const getStaticProps = async ({
    params,
}: {
    params: { id: string };
}) => ({
    props: {
        chat: (await getChatsByFrom(params.id)) ?? null,
    },
});

export default ({ chat }: { chat: Chat | undefined }) => {
    if (!chat) return <NotFound />;

    const [fetcherId, setFetcherId] = useState(0);
    const fetching = useRef(false);

    const fetcherDebug = (fetcherId: number, ...args: any) => {
        const consoleLogArgs: any = [
            "%cfetcher" + fetcherId,
            `background-color: hsl(${
                (fetcherId * 10) % 360
            }, 100%, 50%); color: black; border-radius: 8px; border: 3px solid black; padding: 2px;`,
            ...args,
        ];
        console.info(...consoleLogArgs);
    };

    const [messages, setMessages] = useState<Message[] | undefined>(undefined);

    // useEffect(() => {
    //     fetch("/api/chats/subscribe").then(async (r) => {
    //         let json = await r.json();
    //         setMessages([...messages, json.newMessage]);
    //     })
    // }, [messages]);

    useEffect(() => {
        fetch(`/api/messages/${chat.from}`).then(async (r) => {
            if (!r.ok) {
                alert("Error while fetching. Status: " + r.statusText);
            } else {
                let json = await r.json();
                setMessages(json.messages);
            }
        });
    }, []);

    /** Subscribe for new messages from the API */
    const subscribe = async (abortSignal: AbortSignal) => {
        const fid = fetcherId;

        if (fetching.current === true || messages === undefined) {
            return;
        }

        fetching.current = true;
        try {
            fetcherDebug(fid, "Running with messages =", messages);
            fetcherDebug(fid, "Fetching...");
            const r = await fetch(`/api/messages/${chat.from}/subscribe`, {
                signal: abortSignal,
            });
            fetcherDebug(fid, "Fetch returned, handling response");

            if (r.ok) {
                let json = await r.json();
                let existentMessages: Message[] = messages ?? [];
                setMessages([...existentMessages, json.newMessage]);
                fetcherDebug(fid, "Messages set");
            } else throw new Error(r.statusText);
        } catch (e) {
            fetcherDebug(fid, e);
        } finally {
            fetcherDebug(fid, "I'm out!");
            setFetcherId(fetcherId + 1);
            fetching.current = false;
        }
    };

    useEffect(() => {
        const abortController = new AbortController();
        const abortSignal = abortController.signal;
        const interval = setInterval(async () => {
            await subscribe(abortSignal);
        }, 0);
        return () => {
            clearInterval(interval);
            abortController.abort(
                new DOMException(
                    "Dependency changed or component unloaded",
                    "Abort"
                )
            );
        };
    }, [messages, fetcherId]);

    const [messagesEnd, setMessagesEnd] = useState<HTMLDivElement | null>(null);

    const scrollToBottom = (behavior: ScrollBehavior = "smooth") =>
        messagesEnd?.scrollIntoView({ behavior });

    useEffect(() => scrollToBottom("instant"), [messages]);

    return (
        <>
            <div className="border-b border-b-[#555] flex justify-between px-4 py-3 flex-0">
                <Link href="/messages" className="">
                    <span className="material-icons text-blue-500">
                        arrow_back_ios
                    </span>
                </Link>
                <div className="flex flex-col text-center">
                    <span className="material-icons">person</span>
                    {chat.from}
                </div>
                <span
                    className="cursor-pointer material-symbols-outlined text-blue-500"
                    onClick={() => alert("Message count: " + messages?.length)}
                >
                    info
                </span>
            </div>

            <div
                className="overflow-y-scroll flex-1"
                style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
            >
                {messages?.map((message, key) => {
                    if (message)
                        return (
                            <>
                                <div className="flex justify-center pt-1">
                                    {relativeDate(message.when)}
                                </div>
                                <div
                                    key={key}
                                    className="rounded-[25px] bg-[#333] max-w-[75%] w-auto p-4 my-2 mx-3 text-start"
                                >
                                    {message.text}
                                    <span className="float-end mt-[2em] text-[#999]">{`${new Date(
                                        message.when
                                    ).toLocaleString()}`}</span>
                                    <div className="clear-both"></div>
                                </div>
                            </>
                        );
                })}
                <div
                    key="messageEndEl"
                    className="float-start clear-both"
                    ref={(el) => setMessagesEnd(el)}
                ></div>
            </div>
        </>
    );
};
