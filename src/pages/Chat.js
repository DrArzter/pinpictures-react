import React, { useEffect, useState } from "react";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import { useParams } from "react-router-dom";

import * as api from "../api";

export default function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const { id } = useParams();

  const chatContainerClassName = `w-full lg:w-3/4 bg-zinc-800 p-6 rounded-lg flex flex-col`;  

  return (
    <div className="flex flex-col items-center mx-auto p-4">
      <div className={chatContainerClassName}>
        <div className="flex-grow overflow-y-auto">
          <MessageList messages={messages} user={user} />
        </div>
        <MessageInput />
      </div>
    </div>
  );
}