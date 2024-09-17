import React, { useEffect, useState } from "react";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import { useParams } from "react-router-dom";

import * as api from "../api";
import * as utils from "../utils";


//TODO REFACTOR
export default function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchChats = async () => {
      const response = await api.getChatById(id);
      if (response) {
        setMessages(response);
      }
      fetchMessages();
    };
    fetchChats();
  }, []);

  const fetchMessages = async () => {
    try {
      const data = await api.getMessages(id);
      setMessages(messages => [...messages, data]);
      await fetchMessages();
    } catch (error) {
      setTimeout(() => {
        fetchMessages();
      }, 3000);
    }
  };

  const handleSend = async (message) => {
    const newMessage = { text: message };
    await api.uploadMessage(id, newMessage);
  };

  return (
    <div className="flex flex-col items-center mx-auto p-4">
      <div className="w-full lg:w-3/4 bg-zinc-800 p-6 rounded-lg flex flex-col">
        <div className="flex-grow overflow-y-auto">
          <MessageList messages={messages} setMessages={setMessages} user={user} />
        </div>
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}
