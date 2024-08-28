import Message from "@/models/message.model";

export type ResponseData = {
    message: string;
    [key: string]: any;
};

export type RequestData = {
    message: Message;
};
