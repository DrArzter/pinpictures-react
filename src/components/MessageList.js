import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import config from '../utils/config';

export default function MessageList({ messages, user }) {
  const messageListRef = useRef(null);

  useEffect(() => {
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [messages]);

  const getProfilePicPath = (picpath) => {
    return picpath.startsWith("https://ui-avatars.com/")
      ? picpath
      : `${config.apiUrl.replace('/api', '/')}${picpath}`;
  };

  return (
    <div
      ref={messageListRef}
      className="flex flex-col space-y-4 overflow-y-auto lg:max-h-[70vh] max-h-[70vh] p-4 bg-zinc-800 rounded-lg"
    >
      {user && messages.map((msg, index) => (
        <div
          key={index}
          className={`p-3 rounded-lg flex flex-col ${
            msg.author === user.name ? "bg-zinc-700 text-zinc-300 self-end" : "bg-zinc-400 text-zinc-800 self-start"
          }`}
          style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
        >
          <div className="mb-1">{msg.message}</div>
          <Link to={`/profile/${msg.author}`} className="flex items-center gap-2 mt-2">
            <img
              src={getProfilePicPath(msg.picpath)}
              alt="Profile Picture"
              className="w-8 h-8 rounded-full"
            />
            <p className="text-sm">{msg.author}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
