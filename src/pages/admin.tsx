import Link from "next/link";
import { useState } from "react";
export default function () {
    const [messageText, setMessageText] = useState<string>();
    const [messageFrom, setMessageFrom] = useState<string>();
    const [statusText, setStatusText] = useState<string>();
    const [requestFailed, setRequestFailed] = useState<boolean>(false);
    const submit = async () => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const res = await fetch("/api/messages", {
            headers,
            method: "POST",
            body: JSON.stringify({
                message: {
                    text: messageText,
                    from: messageFrom,
                },
            }),
        });

        setRequestFailed(!res.ok);
        setStatusText(res.statusText);
        try {
            const resJson = await res.json();
            if (resJson.message) {
                setStatusText(resJson.message);
            }
        } catch {}
    };
    return (
        <>
            <div className="px-5 py-3 flex">
                <Link
                    className="text-blue-500 material-icons mt-[1px]"
                    href="/"
                >
                    arrow_back_ios
                </Link>
                <h1 className="text-xl font-mono font-bold">
                    Admin message interface
                </h1>
            </div>
            <div className="px-3 flex flex-1 flex-col pb-3">
                <label
                    className="font-bold"
                    htmlFor={
                        (messageFrom?.trim() ?? "") === ""
                            ? "fromInput"
                            : "textInput"
                    }
                >
                    New message
                </label>
                <input
                    id="fromInput"
                    value={messageFrom}
                    onChange={(e) => setMessageFrom(e.target.value)}
                    type="text"
                    placeholder="From"
                    className="bg-black p-2 border rounded flex-0"
                ></input>
                <textarea
                    id="textInput"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="bg-black border rounded p-2 my-2 flex-1"
                    placeholder="Text"
                ></textarea>
                <div
                    className={
                        requestFailed ? "text-red-400" : "text-green-400"
                    }
                >
                    {statusText}
                </div>
                <button
                    className="hover:text-black hover:bg-white p-2 transition-colors border rounded"
                    onClick={submit}
                >
                    Send
                </button>
            </div>
        </>
    );
}
