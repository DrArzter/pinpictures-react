import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import config from "../api/config";

export default function MessageList({ messages, user }) {
  const messageListRef = useRef(null);

  useEffect(() => {
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [messages]);

  const getProfilePicPath = (picpath) => {
    return picpath.startsWith("https://ui-avatars.com/")
      ? picpath
      : `${config.apiUrl.replace("/api", "/")}${picpath}`;
  };

  const messageListClassName = `flex flex-col space-y-4 overflow-y-auto lg:max-h-[70vh] max-h-[70vh] p-4 bg-zinc-800 rounded-lg`;

  const getMessageClassName = (author) =>
    `p-3 rounded-lg flex flex-col ${
      author === user.name ? "bg-zinc-700 text-zinc-300 self-end" : "bg-zinc-400 text-zinc-800 self-start"
    }`;

  return (
    <div ref={messageListRef} className={messageListClassName}>
      {user &&
        messages.map((msg, index) => (
          <div
            key={index}
            className={getMessageClassName(msg.author)}
            style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
          >
            <div className="mb-1">{msg.message}</div>
            <Link to={`/profile/${msg.author}`} className="flex items-center gap-2 mt-2">
              <img
                src={getProfilePicPath(msg.picpath)}
                alt="Profile Picture"
                style={{ objectFit: "cover" }}
                className="w-8 h-8 rounded-full"
              />
              <p className="text-sm">{msg.author}</p>
            </Link>
          </div>
        ))}
    </div>
  );
}