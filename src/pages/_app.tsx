import '@/styles/globals.css';
import '@/styles/material-icons.css';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import iOSStatusRight from '../../public/ios_status_right.svg';
import MedeaJpeg from '../../public/medea.jpg';

import type { AppProps } from "next/app";
type NotificationData = {
    key: number;
    title: string;
    body: string;
    icon: any;
    when: string;
    duration: number;
};

const NotificationTransitionDuration: number = 1000;

export default function App({ Component, pageProps }: AppProps) {
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [notification, setNotification] = useState<
        NotificationData | undefined
    >(undefined);

    const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (notification !== undefined) {
            setNotificationVisible(true);
            notificationTimeoutRef.current = setTimeout(() => {
                setNotificationVisible(false);
                setTimeout(() => {
                    setNotification(undefined);
                }, NotificationTransitionDuration);
            }, notification.duration);
        }
        return function cleanup() {
            if (notificationTimeoutRef.current) {
                clearTimeout(notificationTimeoutRef.current);
                notificationTimeoutRef.current = null;
            }
        };
    }, [notification]);

    const ShowNotification = (newNotification: NotificationData) => {
        setNotificationVisible(false);
        setTimeout(() => {
            setNotification(undefined);
            setNotification(newNotification);
        }, NotificationTransitionDuration);
    };

    // const firstUpdate = useRef(true);
    const bulkNotify = async () => {
        alert("disabled")
        // const chats = await ChatStore.read();
        // for (let i = 0; i < chats.length; i++) {
        //     const chat = chats[i];
        //     for (let j = 0; j < chat.messages.length; j++) {
        //         const message = chat.messages[j];
        //         ShowNotification({
        //             title: chat.from,
        //             body: message.text,
        //             icon: iMessageIcon,
        //             when: "now",
        //             duration: 4000,
        //             key: i,
        //         });
        //         await new Promise((f) => setTimeout(f, 8000));
        //     }
        // }
    };
    // useEffect(() => {
    //     if (firstUpdate.current) {
    //         console.log("Loaded");
    //         bulkNotify();
    //     }
    // }, []);

    const [date, setDate] = useState(new Date());

    const pathname = usePathname();

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 500);
        return function cleanup() {
            clearInterval(timer);
        };
    }, []);

    return (
        <div
            id="phone-screen"
            className="bg-[#000] box-content text-[#fff] border-[#000] border-[14px] flex flex-col rounded-[50px] m-0 w-[332.5px] h-[720px] overflow-hidden z-10"
            style={{
                backgroundImage:
                    pathname === "/" ? `url(${MedeaJpeg.src})` : "",
                backgroundSize: "cover",
            }}
        >
            <div
                className={`px-[34px] pt-[9px] text-[14px] flex-0 flex flex-row ${
                    pathname === "/messages" ? "bg-[#333]" : "bg-transparent"
                }`}
            >
                <div className="flex-1 font-semibold">
                    {date.toLocaleTimeString("it", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </div>
                <div className="flex-0">
                    <Image
                        src={iOSStatusRight}
                        className="inline mt-[-2px]"
                        alt="status icons"
                        height={13}
                    />
                </div>
            </div>
            <div
                className={
                    `fixed w-[inherit] rounded-[24px] py-[2px] px-[6.4px] z-0 text-black text-xs transition-transform` +
                    " " +
                    (notificationVisible ? "" : "translate-y-[-100vh]")
                }
                style={{
                    transitionDuration: `${NotificationTransitionDuration}ms`,
                    transitionDelay: "0",
                }}
            >
                <div className="bg-[#ffffff60] backdrop-blur-3xl rounded-[24px] h-[56.25px] p-[12.3px]">
                    <Image
                        alt="app icon"
                        src={notification?.icon}
                        width={undefined}
                        height={undefined}
                        className="h-auto w-[33.5px] float-start"
                    />
                    <div className="ms-[10px] float-start">
                        <h1 className="font-semibold">{notification?.title}</h1>
                        <h2 className="">{notification?.body}</h2>
                    </div>
                    <div className="float-end me-[10px]">
                        {notification?.when}
                    </div>
                </div>
            </div>
            <Component {...pageProps} bulkNotify={bulkNotify} />
        </div>
    );
}
