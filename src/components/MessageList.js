import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function MessageList({ messages, user }) {
    const messageListRef = useRef(null);

    useEffect(() => {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }, [messages]);

    return (
        <div className="flex flex-col space-y-4 overflow-y-auto lg:max-h-[70vh] max-h-[70vh] scrollbar" ref={messageListRef}>
            {messages.map((msg, index) => (
                <div 
                    key={index} 
                    className={`p-3 rounded-lg ${
                        msg.author === user.name ? "bg-zinc-700 text-zinc-300 self-end" : "bg-zinc-400 text-zinc-800 self-start"
                    }`}
                >
                    <div>{msg.message}</div>
                    <Link className="text-sm" to={`/Profile/${msg.author}`}>{msg.author}</Link>
                </div>
            ))}
        </div>
    );
}
