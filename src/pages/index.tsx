// import { Inter } from 'next/font/google';
// const inter = Inter({ subsets: ["latin"] });
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import AppIconRow from "@/components/AppIconRow";
import chats from "@/chats";
import { generateRandomInt } from "@/utils";

import AppStoreIcon from "../../public/app_store.svg";
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
import MailIcon from "../../public/mail.svg";
import NewsIcon from "../../public/news.svg";
import NotesIcon from "../../public/notes.svg";
import NotesWidget from "../../public/notes_widget.svg";
import PhoneIcon from "../../public/phone.svg";
import PhotosIcon from "../../public/photos.svg";
import SafariIcon from "../../public/safari.svg";
import SettingsIcon from "../../public/settings.svg";
import WeatherWidget from "../../public/weather_widget.svg";
import Link from "next/link";

type HomeProps = {
    bulkNotify: Function;
};

export default function Home(props: HomeProps) {
    return (
        <>
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
                        <Link href="/messages">
                            <Image
                                src={iMessageIcon}
                                className="flex-1 w-full h-auto"
                                alt="iMessage icon"
                            />
                        </Link>
                        <Image
                            src={SettingsIcon}
                            className="flex-1 w-full h-auto cursor-pointer"
                            alt="Settings icon"
                            onClick={
                                () => props.bulkNotify() // ShowNotification({
                                //     icon: iMessageIcon,
                                //     title: "Jason",
                                //     body: "u r dum",
                                //     when: `Yesterday ${generateRandomInt(0, 23)
                                //         .toString()
                                //         .padStart(2, "0")}:${generateRandomInt(
                                //         1,
                                //         59
                                //     )
                                //         .toString()
                                //         .padStart(2, "0")}`,
                                //     duration: 5000,
                                //     key: generateRandomInt(0, 1000),
                                // })
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
