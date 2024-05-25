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
      try {
        const response = await utils.getChatById(id);
        if (response) {
          setMessages(response);
        }
        fetchMessages();
      } catch (error) {
        console.error("Failed to fetch chat:", error);
      }
    };

    fetchChats();
  }, [id]);

  const fetchMessages = async () => {
    try {
      const data = await utils.getMessages(id);
      setMessages((prevMessages) => [...prevMessages, ...data]);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      fetchMessages();
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      setTimeout(fetchMessages, 3000);
    }
  };

  const handleSend = async (message) => {
    try {
      const newMessage = { text: message };
      await utils.uploadMessage(id, newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="flex flex-col items-center mx-auto p-4 min-h-screen">
      <div className="w-full lg:w-3/4 bg-zinc-800 p-6 rounded-lg shadow-lg flex flex-col">
        <div className="flex-grow overflow-y-auto mb-4">
          <MessageList messages={messages} setMessages={setMessages} user={user} />
        </div>
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}
