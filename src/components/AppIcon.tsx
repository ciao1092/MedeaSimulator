import * as React from "react";
import Image from "next/image";

export default function AppIcon(props: {
    alt: string;
    src: any;
}) {
    return <Image className="flex-1 w-full h-auto" width={undefined} height={undefined} {...props} />;
}
