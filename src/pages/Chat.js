import React, { useEffect, useState } from "react";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import { useParams } from "react-router-dom";
import * as utils from "../utils";

export default function Chat({ user }) {
    const [messages, setMessages] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchChats = async () => {
            const response = await utils.getChatById(id);
            if (response) {
                setMessages(response);
            }
        };
        fetchChats();
    }, [id]);

    const handleSend = async (message) => {
        const newMessage = { text: message };
        setMessages([...messages, newMessage]);
        const response = await utils.uploadMessage(id, newMessage);
        if (response) {
            setMessages(response);
        }
        
    };

    return (
        <div className="flex flex-col items-center mx-auto p-4">
            <div className="w-full lg:w-3/4 bg-zinc-800 p-6 rounded-lg flex flex-col">
                <div className="flex-grow overflow-y-auto">
                    <MessageList messages={messages} user={user} />
                </div>
                <MessageInput onSend={handleSend} />
            </div>
        </div>
    );
}
