import React, { useContext } from "react";
import ThemeContext from "../components/ThemeContext";
export default function ChatList({ chats, onChatSelect }) {

    const { isDarkMode } = useContext(ThemeContext);
    return (
        <div>
            {chats.map((chat) => (
                <button 
                    key={chat.chatId}
                    className="w-full p-2 mb-2 text-left hover:bg-yellow-500 hover:transform hover:scale-110 hover:transition hover:duration-300 transition duration-300 flex items-center"
                    onClick={() => onChatSelect(chat.chatId)}
                >
                    <img src={chat.displayPic} alt={chat.displayName} className="w-8 h-8 rounded-full mr-2" />
                    <div>
                        <div className="font-bold">{chat.displayName}</div>
                        <div className={'text-sm'}>
                            {chat.messageAuthorName}: {chat.message}
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
}
