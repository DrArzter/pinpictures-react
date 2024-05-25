import React, { useState, useRef, useEffect } from "react";

export default function MessageInput({ onSend }) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
      resizeTextarea();
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    resizeTextarea();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
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
    <div className="flex mt-4 items-center">
      <textarea
        ref={textareaRef}
        className="flex-grow p-2 text-zinc-700 bg-zinc-300 min-h-[40px] max-h-[200px] overflow-y-auto border border-zinc-600 rounded-l-lg resize-none focus:outline-none focus:ring-2 focus:ring-zinc-700"
        value={message}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        rows={1}
      />
      <button 
        className="p-2 bg-zinc-700 text-zinc-300 hover:bg-zinc-600 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-zinc-700 ml-1" 
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}
