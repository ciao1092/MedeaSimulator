// import { Inter } from 'next/font/google';
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import AppIcon from "@/components/AppIcon";
import AppIconContainer from "@/components/AppIconContainer";
import AppIconRow from "@/components/AppIconRow";

import AppStoreIcon from "../../public/app_store.svg";
import AppleLogo from "../../public/apple.svg";
import AppleHealthIcon from "../../public/apple_health.svg";
import AppleMapsIcon from "../../public/apple_maps.svg";
import AppleMusicIcon from "../../public/apple_music.svg";
import PodcastsIcon from "../../public/apple_podcasts.svg";
import AppleTVIcon from "../../public/apple_tv.svg";
import AppleWalletIcon from "../../public/apple_wallet.svg";
import CalendarIcon from "../../public/calendar.svg";
import CameraIcon from "../../public/camera.svg";
import ClockIcon from "../../public/clock.svg";
import FaceTimeIcon from "../../public/facetime.svg";
import GoogleDriveIcon from "../../public/google_drive.svg";
import iMessageIcon from "../../public/imessage.svg";
import iOS_17_WallPaper from "../../public/iOS_17_WallPaper.png";
import iOSStatusRight from "../../public/ios_status_right.svg";
import MailIcon from "../../public/mail.svg";
import MedeaJpeg from "../../public/medea.jpg";
import NewsIcon from "../../public/news.svg";
import NotesIcon from "../../public/notes.svg";
import NotesWidget from "../../public/notes_widget.svg";
import PhoneIcon from "../../public/phone.svg";
import PhotosIcon from "../../public/photos.svg";
import SafariIcon from "../../public/safari.svg";
import SettingsIcon from "../../public/settings.svg";
import WeatherWidget from "../../public/weather_widget.svg";

// const inter = Inter({ subsets: ["latin"] });

type NotificationData = {
    key: number;
    title: string;
    body: string;
    icon: any;
    when: string;
    duration: number;
};

const NotificationTransitionDuration: number = 1000;

function generateRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function Home() {
    const [date, setDate] = useState(new Date());
    const [bootScreen, setBootScreen] = useState(false);
    const [bootScreenBarLevel, setBootScreenBarLevel] = useState(0);
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [notification, setNotification] = useState<
        NotificationData | undefined
    >(undefined);

    const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const firstUpdate = useRef(true);

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 500);
        return function cleanup() {
            clearInterval(timer);
        };
    }, []);

    const reboot = () => {
        setBootScreen(true);
        setBootScreenBarLevel(0);
        const timer = setInterval(() => {
            setBootScreenBarLevel((oldLevel) => {
                const newLevel = oldLevel + 30;
                console.log(newLevel);
                if (newLevel >= 100) {
                    setBootScreen(false);
                    clearInterval(timer);
                }
                return newLevel;
            });
        }, 1500);
    };

    // setNotification({
    //     icon: iMessageIcon,
    //     title: "Jason",
    //     body: "u r dum",
    //     when: "now",
    //     duration: 1000,
    // });

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

    const messages: { from: string; text: string }[] = [
        { from: "Pino", text: "Oh no 🫢😮" },
        { from: "Jason", text: "I am not sorry 😊" },
        { from: "ninw2", text: "OMG WHAT HAPPENED" },
    ];

    const bulkNotify = async () => {
        for (let i = 0; i < messages.length; i++) {
            const message = messages[i];
            ShowNotification({
                title: message.from,
                body: message.text,
                icon: iMessageIcon,
                when: "now",
                duration: 4000,
                key: i,
            });
            await new Promise((f) => setTimeout(f, 8000));
        }
    };

    useEffect(() => {
        if (firstUpdate.current) {
            console.log("Loaded");
            bulkNotify();
        }
    }, []);

    return (
        <>
            <div className="w-[332.5px] text-center mx-10 hidden">
                <h1 className="text-4xl my-5">iPhone 13.5</h1>
                <button className="text-blue-500 underline" onClick={reboot}>
                    Reboot
                </button>
            </div>

            <div
                id="iphone-screen"
                className="bg-[#000] box-content text-[#fff] border-[#000] border-[14px] rounded-[50px] m-0 w-[332.5px] h-[720px] overflow-hidden z-10"
                style={{
                    backgroundImage: `url(${MedeaJpeg.src})`,
                    backgroundSize: "cover",
                }}
            >
                <div
                    id="bootScreen"
                    className={
                        "h-[100%] bg-[#000] text-[#fff] justify-center items-center" +
                        " " +
                        (bootScreen ? "flex flex-col" : "hidden")
                    }
                >
                    <Image src={AppleLogo} alt="Apple logo" width={50} />
                    <div className="mt-[40px] h-[3px] w-[110px]  bg-gray-500 rounded-full">
                        <div
                            className="h-[3px] w-full bg-white rounded-full transition-[width] duration-500"
                            style={{ width: `${bootScreenBarLevel}%` }}
                        ></div>
                    </div>
                </div>
                <div className="px-[34px] pt-[9px] text-[14px] flex flex-row">
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
                        (notificationVisible ? "" : "translate-y-[-100vh]") +
                        " " +
                        (bootScreen ? "hidden" : "")
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
                            <h1 className="font-semibold">
                                {notification?.title}
                            </h1>
                            <h2 className="">{notification?.body}</h2>
                        </div>
                        <div className="float-end me-[10px]">
                            {notification?.when}
                        </div>
                    </div>
                </div>
                <div className="text-xs text-center">
                    <div className="pt-[25px] px-[24.3px] flex flex-row gap-[15px] h-[160px]">
                        <Image
                            className="flex-1 w-full h-auto"
                            height={undefined}
                            width={undefined}
                            src={NotesWidget}
                            alt="Notes Widget"
                        />
                        <Image
                            className="flex-1 w-full h-auto"
                            height={undefined}
                            width={undefined}
                            src={WeatherWidget}
                            alt="Weather Widget"
                        />
                        {/* <div className="h-[138px] flex-1 outline outline-2 rounded-[21px] bg-[#6f2]"></div> */}
                    </div>
                    <div className="px-[24.3px] flex flex-row gap-[15px]">
                        <div className="flex-1">Notes</div>
                        <div className="flex-1">Weather</div>
                    </div>

                    <div className="mt-[25px]">
                        <AppIconRow
                            apps={[
                                { icon: FaceTimeIcon, text: "FaceTime" },
                                { icon: CalendarIcon, text: "Calendar" },
                                { icon: PhotosIcon, text: "Photos" },
                                { icon: CameraIcon, text: "Camera" },
                            ]}
                        />

                        <AppIconRow
                            apps={[
                                { icon: MailIcon, text: "Mail" },
                                { icon: NotesIcon, text: "Notes" },
                                { icon: NewsIcon, text: "News" },
                                { icon: ClockIcon, text: "Clock" },
                            ]}
                        />

                        <AppIconRow
                            apps={[
                                { icon: AppleTVIcon, text: "Apple TV" },
                                { icon: PodcastsIcon, text: "Podcasts" },
                                { icon: AppStoreIcon, text: "App Store" },
                                { icon: AppleMapsIcon, text: "Maps" },
                            ]}
                        />

                        <AppIconRow
                            apps={[
                                { icon: AppleHealthIcon, text: "Health" },
                                { icon: AppleWalletIcon, text: "Wallet" },
                                { icon: AppleMusicIcon, text: "Music" },
                                { icon: GoogleDriveIcon, text: "Drive" },
                            ]}
                        />
                    </div>

                    <div className="mt-[22.3px]">
                        <div className="rounded-[100px] max-h-[25px] w-[68px] mx-auto bg-[#ffffff60] backdrop-blur-3xl px-[7px] py-[5px]">
                            Search
                        </div>
                    </div>
                    <div
                        id="dock"
                        className="rounded-[35px] box-border bg-[#ffffff60] backdrop-blur-3xl py-[15px] px-[16px] mx-[9px] mt-[20px]"
                    >
                        <div className="p-0 h-[53px] flex flex-row gap-[23px]">
                            <Image
                                src={PhoneIcon}
                                className="flex-1 w-full h-auto"
                                alt="Phone icon"
                            />
                            <Image
                                src={SafariIcon}
                                className="flex-1 w-full h-auto"
                                alt="Safari icon"
                            />
                            <Image
                                src={iMessageIcon}
                                className="flex-1 w-full h-auto"
                                alt="iMessage icon"
                                onClick={() =>
                                    ShowNotification({
                                        icon: iMessageIcon,
                                        title: "Jason",
                                        body: "u r dum",
                                        when: `Yesterday ${generateRandomInt(
                                            0,
                                            23
                                        )
                                            .toString()
                                            .padStart(
                                                2,
                                                "0"
                                            )}:${generateRandomInt(1, 59)
                                            .toString()
                                            .padStart(2, "0")}`,
                                        duration: 5000,
                                        key: generateRandomInt(0, 1000),
                                    })
                                }
                            />
                            <Image
                                onClick={reboot}
                                src={SettingsIcon}
                                className="flex-1 w-full h-auto"
                                alt="Settings icon"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
