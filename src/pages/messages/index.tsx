import Link from "next/link";
import { useEffect, useState } from "react";
import Chat from "@/models/chat.model";
import { relativeDate } from "@/relativeDate";

export default () => {
    const [chats, setChats] = useState<Chat[]>([]);

    useEffect(() => {
        fetch("/api/chats").then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    if (data && data.chats) setChats(data.chats);
                });
            }
        });
    }, []);

    return (
        <>
            <div className="bg-[#333] pb-3">
                <div className="px-5 py-3 flex">
                    <Link
                        className="text-blue-500 material-icons mt-[3px]"
                        href="/"
                    >
                        arrow_back_ios
                    </Link>
                    <h1 className="text-2xl font-bold">Messages</h1>
                </div>
                <div className="px-5">
                    <input
                        className="bg-[#555] rounded w-full py-1 px-4"
                        placeholder="Search..."
                    ></input>
                </div>
            </div>
            <div className="bg-[#000] mt-4 overflow-y-auto max-h-[530px]">
                {chats.map((chat, key) => (
                    <Link href={"/messages/" + chat.from}>
                        <div key={key} className="px-[15px] text-[#888]">
                            <div className="border-b border-[#333] flex py-1">
                                <span
                                    className="material-icons p-3 text-white"
                                    style={{ fontSize: "23px" }}
                                >
                                    person
                                </span>
                                <div className="flex flex-col flex-1">
                                    <div className="flex flex-row flex-1">
                                        <b className="flex-1 text-white">
                                            {chat.from}
                                        </b>
                                        <span className="flex-0">
                                            {relativeDate(
                                                new Date(chat.lastMessageTime)
                                            )}
                                        </span>
                                        <span
                                            className="material-icons py-[5px] px-[10px] flex-0"
                                            style={{ fontSize: "14px" }}
                                        >
                                            arrow_forward_ios
                                        </span>
                                    </div>
                                    <span className="text-ellipsis overflow-hidden text-nowrap max-w-[15em]">
                                        {chat.lastMessage}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};
