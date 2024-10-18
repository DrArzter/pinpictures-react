import React, { useEffect, useState, useContext } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import ChatList from "../components/ChatList";
import Chat from "../components/Chat";
import ThemeContext from "../components/ThemeContext";

export default function Chats({ user }) {
    const [chats, setChats] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [socket, setSocket] = useState(null);
    const [isLoadingChats, setIsLoadingChats] = useState(true);
    const { isDarkMode } = useContext(ThemeContext);
    const [isLoadingChat, setIsLoadingChat] = useState(false);
    const [chatData, setChatData] = useState(null);

    useEffect(() => {
        let isComponentMounted = true;
        const ws = new WebSocket(`ws://localhost:3300/api/ws/chats`);
        setSocket(ws);
    
        ws.onopen = () => {
            ws.send(JSON.stringify({ type: "getAllChats" }));
        };
    
        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
    
            if (isComponentMounted) {
                switch (data.type) {
                    case "allChats":
                        setChats(data.chats);
                        setIsLoadingChats(false);
                        break;
                    case "chatMessages":
                        setChatData(data);
                        setIsLoadingChat(false);
                        break;
                    case "newMessage":
                        // Обновляем чат, если открыто соответствующее окно
                        if (data.chatId === selectedChatId) {
                            setChatData(prevData => ({
                                ...prevData,
                                messages: [...prevData.messages, data.message]
                            }));
                        }
                        // Обновляем список чатов
                        setChats(prevChats => {
                            // Находим чат с новым сообщением
                            let updatedChats = prevChats.map(chat => {
                                if (chat.chatId === data.chatId) {
                                    return {
                                        ...chat,
                                        message: data.message.message,
                                        messageAuthorName: data.message.senderName,
                                        messageTimestamp: data.message.created_at,
                                    };
                                }
                                return chat;
                            });
                            // Перемещаем обновленный чат наверх списка
                            const updatedChatIndex = updatedChats.findIndex(chat => chat.chatId === data.chatId);
                            if (updatedChatIndex !== -1) {
                                const updatedChat = updatedChats.splice(updatedChatIndex, 1)[0];
                                updatedChats = [updatedChat, ...updatedChats];
                            }
                            return updatedChats;
                        });
                        break;
                    default:
                        console.warn("Unknown message type:", data.type);
                }
            }
        };
    
        return () => {
            isComponentMounted = false;
            ws.close();
        };
    }, [user, selectedChatId]);

    const handleChatSelect = (chatId) => {
        setSelectedChatId(chatId);
        setChatData(null);
        setIsLoadingChat(true);
        socket.send(JSON.stringify({ type: "getChatMessages", chatId }));
    };

    const chatsContainerStyle = `flex mx-auto h-[80vh] flex-row w-3/4 p-6 gap-4 rounded-lg mt-8`;
    const chatListContainerStyle = `w-1/4 p-6 ${isDarkMode
        ? "bg-darkModeSecondaryBackground"
        : "bg-lightModeSecondaryBackground"
        } rounded-lg`;
    const chatContainerStyle = `w-3/4 p-6 ${isDarkMode
        ? "bg-darkModeSecondaryBackground"
        : "bg-lightModeSecondaryBackground"
        } rounded-lg`;

    return (
        <div className="w-full">
            <div className={chatsContainerStyle}>
                <div className={chatListContainerStyle}>
                    {isLoadingChats ? (
                        <LoadingIndicator />
                    ) : (
                        <ChatList chats={chats} onChatSelect={handleChatSelect} />
                    )}
                </div>
                <div className={chatContainerStyle}>
                    {isLoadingChat ? (
                        <LoadingIndicator />
                    ) : (
                        <Chat chat={chatData} socket={socket} user={user} />
                    )}
                </div>
            </div>
        </div>
    );
}
