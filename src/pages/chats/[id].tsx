import Link from "next/link";
import type { InferGetServerSidePropsType, GetStaticProps } from "next";
import chats, { Chat, Message } from "@/chats";

function getAllChatIds() {
    return chats.map((chat) => {
        return {
            params: {
                id: chat.id,
            },
        };
    });
}

export const getStaticPaths = async () => {
    const paths = getAllChatIds();
    return {
        paths,
        fallback: false,
    };
};

export function getChatById(id: string) {
    return chats.find((chat) => chat.id === id)!;
}

export const getStaticProps = async ({
    params,
}: {
    params: { id: string };
}) => {
    const chat: Chat = getChatById(params.id);
    return {
        props: {
            chat,
        },
    };
};

export default ({ chat }: { chat: Chat }) => {
    return (
        <>
            <div className="border-b border-b-[#555] flex justify-between px-4 py-3">
                <Link href="/messages" className="">
                    <span className="material-icons text-blue-500">
                        arrow_back_ios
                    </span>
                </Link>
                <div className="flex flex-col text-center">
                    <span className="material-icons">person</span>
                    {chat.from}
                </div>
                <span className="material-symbols-outlined text-blue-500">
                    info
                </span>
            </div>
            {chat.messages.map((message, key) => (
                <div
                    key={key}
                    className="rounded-[25px] bg-[#333] max-w-[75%] w-auto p-4 my-2 mx-3 text-start"
                >
                    {message.text}
                    <span className="float-end mt-[2em] text-[#999]">{message.when}</span>
                    <div className="clear-both"></div>
                </div>
            ))}
        </>
    );
};
