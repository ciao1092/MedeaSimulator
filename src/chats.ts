export type Message = { id: string; text: string; when: string };
export type Chat = { id: string; from: string; messages: Array<Message> };
const jasonMessages: Message[] = [
    {
        id: "1",
        text: "You could have stayed in Corinth if you only",
        when: "Yesterday, 10:50",
    },
    {
        id: "2",
        text: "I am not sorry 😊",
        when: "Yesterday, 15:34",
    },
    {
        id: "3",
        text: "Hahahah",
        when: "Now",
    },
];

const Chats: Chat[] = [
    {
        id: "1",
        from: "Jason",
        messages: jasonMessages,
    },
];

export default Chats;
