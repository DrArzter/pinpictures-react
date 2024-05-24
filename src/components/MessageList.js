import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function MessageList({ messages, setMessages, user }) {
    const messageListRef = useRef(null);


    useEffect(() => {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }, [messages]);
    
    return (
        <div className="flex flex-col space-y-4 overflow-y-auto lg:max-h-[70vh] max-h-[70vh] scrollbar" ref={messageListRef}>
            {user && messages.map((msg, index) => (
                <div 
                    key={index} 
                    className={`p-3 rounded-lg ${
                        msg.author === user.name ? "bg-zinc-700 text-zinc-300 self-end" : "bg-zinc-400 text-zinc-800 self-start"
                    }`}
                >
                    <div>{msg.message}</div>
                    <Link className="text-sm flex items-center gap-2" to={`/Profile/${msg.author}`}>
                        <p className="text-sm">{msg.author}</p>
                        <img className="w-8 h-8 rounded-full" src={`http://localhost:3000/${msg.picpath}`} alt={msg.author} />
                    </Link>
                </div>
            ))}
        </div>
    );
}
