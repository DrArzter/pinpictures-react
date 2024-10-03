import React, { useEffect, useState } from "react";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import { useParams } from "react-router-dom";

import * as api from "../api";

export default function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchChatData = async () => {
      const chatData = await api.getChatById(id);
      if (chatData) {
        setMessages(chatData);
      }
      fetchNewMessages(); 
    };

    fetchChatData();
  }, [id]);

  const fetchNewMessages = async () => {
    try {
      const newMessage = await api.getMessages(id);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
      setTimeout(fetchNewMessages, 3000); 
    }
  };

  const handleSend = async (message) => {
    await api.uploadMessage(id, { text: message });
  };

  const chatContainerClassName = `w-full lg:w-3/4 bg-zinc-800 p-6 rounded-lg flex flex-col`;  

  return (
    <div className="flex flex-col items-center mx-auto p-4">
      <div className={chatContainerClassName}>
        <div className="flex-grow overflow-y-auto">
          <MessageList messages={messages} user={user} />
        </div>
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}