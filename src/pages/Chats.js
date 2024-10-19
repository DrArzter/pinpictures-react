import React, { useEffect, useState, useContext } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import ChatList from "../components/ChatList";
import Chat from "../components/Chat";
import ThemeContext from "../components/ThemeContext";
import config from "../api/config";

export default function Chats({ user }) {
    const [chats, setChats] = useState([]);
    const [chatData, setChatData] = useState(null);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadingChats, setIsLoadingChats] = useState(true);
    const [isLoadingChat, setIsLoadingChat] = useState(false);
    const { isDarkMode } = useContext(ThemeContext);
    const [socket, setSocket] = useState(null);
    const [socketEvent, setSocketEvent] = useState(null);
    const [socketState, setSocketState] = useState(null);

    const socketInit = () => {
        const ws = new WebSocket(`${config.wsUrl}/chats`);
        setSocket(ws);
    };

    useEffect(() => {
        if (!socket) socketInit();
    }, [socket]);

    useEffect(() => {
        setIsLoaded(true);
    }, [user]);

    useEffect(() => {
        if (!socket) return;

        socket.onopen = () => {
            socket.send(JSON.stringify({ type: "getAllChats" }));
            setSocketState("open");
        };

        socket.onerror = () => setSocketState("error");
        socket.onclose = () => setSocketState("closed");
        socket.onmessage = (event) => setSocketEvent(JSON.parse(event.data));
    }, [socket]);

    useEffect(() => {
        if (!socketEvent || !isLoaded) return;
    
        const { type, chats: receivedChats, chatId, message } = socketEvent;
    
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
    

    useEffect(() => {
        if (socketState === "error" || socketState === "closed") {
            setTimeout(socketInit, 3000);
        }
    }, [socketState]);

    const handleChatSelect = (chatId) => {
        setSelectedChatId(chatId);
        setChatData(null);
        setIsLoadingChat(true);
        socket.send(JSON.stringify({ type: "getChatMessages", chatId }));
    };

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
