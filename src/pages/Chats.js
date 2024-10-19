import React, { useEffect, useState, useContext } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import ChatList from "../components/ChatList";
import Chat from "../components/Chat";
import ThemeContext from "../components/ThemeContext";
import config from "../api/config";
import { useParams } from "react-router-dom";

export default function Chats({ user, socket, socketEvent, socketState }) {
    const [chats, setChats] = useState(null);
    const [chatData, setChatData] = useState(null);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadingChats, setIsLoadingChats] = useState(true);
    const [isLoadingChat, setIsLoadingChat] = useState(false);
    const { isDarkMode } = useContext(ThemeContext);

    let { id } = useParams();

    useEffect(() => {
        if (!socketEvent || socketState !== "open") return;
    
        const { type, chats: receivedChats, chatId, message } = socketEvent;
        if (!chats) {
            socket.send(JSON.stringify({ type: "getAllChats" }))
        }
        if (type === 'allChats') {
            setChats(receivedChats);
            setIsLoadingChats(false);
        }
    
        if (type === 'chatMessages') {
            setChatData(socketEvent);
            setIsLoadingChat(false);
        }
    
        if (type === 'newMessage' && chatId === selectedChatId) {
            setChatData((prevData) => ({
                ...prevData,
                messages: [...prevData.messages, message],
            }));
    
            setChats((prevChats) =>
                prevChats
                    .map((chat) =>
                        chat.chatId === chatId
                            ? { 
                                ...chat, 
                                message: message.message, 
                                messageAuthorName: message.senderName, 
                                messageTimestamp: message.created_at 
                              }
                            : chat
                    )
                    .sort((a, b) => (a.chatId === chatId ? -1 : 1))
            );
        }
    
        if (type === 'newMessage' && !selectedChatId) {
            setChats((prevChats) => [message.chat, ...prevChats]);
            setSelectedChatId(chatId);
        }
    }, [socketEvent, selectedChatId, isLoaded]);
    

    const handleChatSelect = (chatId) => {
        setSelectedChatId(chatId);
        setChatData(null);
        setIsLoadingChat(true);
        socket.send(JSON.stringify({ type: "getChatMessages", chatId }));
    };

    if (id && id !== selectedChatId) {
        handleChatSelect(id);
    }

    const containerStyle = `flex mx-auto h-[80vh] flex-row w-3/4 p-6 gap-4 rounded-lg mt-8`;
    const listStyle = `w-1/4 p-6 ${isDarkMode ? "bg-darkModeSecondaryBackground" : "bg-lightModeSecondaryBackground"} rounded-lg`;
    const chatStyle = `w-3/4 p-6 ${isDarkMode ? "bg-darkModeSecondaryBackground" : "bg-lightModeSecondaryBackground"} rounded-lg`;

    return (
        <div className="w-full">
            <div className={containerStyle}>
                <div className={listStyle}>
                    {isLoadingChats ? <LoadingIndicator /> : <ChatList chats={chats} onChatSelect={handleChatSelect} />}
                </div>
                <div className={chatStyle}>
                    {isLoadingChat ? <LoadingIndicator /> : <Chat chat={chatData} socket={socket} user={user} />}
                </div>
            </div>
        </div>
    );
}
