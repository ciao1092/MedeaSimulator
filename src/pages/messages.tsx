import chats from "@/chats";
import Link from "next/link";

export default () => {
    return (
        <>
            <div className="bg-[#333] pb-3">
                <div className="px-5 py-3">
                    <Link className="text-blue-500 float-start" href="/">
                        Edit
                    </Link>
                    <a className="text-blue-500 float-end" href="#"></a>
                    <div className="clear-both"></div>
                </div>
                <div className="px-5">
                    <h1 className="text-2xl font-bold">Messages</h1>
                    <input
                        className="bg-[#555] rounded w-full py-1 px-4 mt-2"
                        placeholder="Search..."
                    ></input>
                </div>
            </div>
            <div className="bg-[#000] mt-4 overflow-y-auto max-h-[530px]">
                {chats.map((chat, key) => (
                    <Link href={"/chats/" + chat.id}>
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
                                            {
                                                chat.messages[
                                                    chat.messages.length - 1
                                                ].when
                                            }
                                        </span>
                                        <span
                                            className="material-icons py-[5px] px-[10px] flex-0"
                                            style={{ fontSize: "14px" }}
                                        >
                                            arrow_forward_ios
                                        </span>
                                    </div>
                                    <span className="text-ellipsis overflow-hidden text-nowrap max-w-[15em]">
                                        {
                                            chat.messages[
                                                chat.messages.length - 1
                                            ].text
                                        }
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
