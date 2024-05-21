import React, { useState, useRef, useEffect } from "react";

export default function MessageInput({ onSend }) {
    const [message, setMessage] = useState("");
    const textareaRef = useRef(null);

    const handleSend = () => {
        if (message.trim()) {
            onSend(message);
            setMessage("");
        }
    };

    const handleInputChange = (e) => {
        setMessage(e.target.value);
        resizeTextarea();
    };

    const resizeTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    useEffect(() => {
        resizeTextarea();
    }, [message]);

    return (
        <div className="flex mt-4">
            <textarea
                ref={textareaRef}
                className="flex-grow p-2 text-zinc-700 min-h-[40px] max-h-[200px] overflow-y-auto border rounded-l-lg resize-none"
                value={message}
                onChange={handleInputChange}
                placeholder="Type your message..."
                rows={1}
            />
            <button 
                className="p-2 bg-zinc-700 text-zinc-300 hover:bg-zinc-600 rounded-r-md" 
                onClick={handleSend}
            >
                Send
            </button>
        </div>
    );
}
