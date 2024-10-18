import React, { useState, useEffect } from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import Message from './Message';

export default function Chat({ chat, socket, user }) {

    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const iconClassName = "lg:h-8 lg:w-8 md:h-6 md:w-6 hover-transform";

    useEffect(() => {
        if (chat) {
            setMessages(chat.messages);
            const handleMessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === 'newMessage' && data.chatId === chat.chatId) {
                    setMessages(prevMessages => [...prevMessages, data.message]);
                }
            };
            socket.addEventListener('message', handleMessage);

            return () => {
                socket.removeEventListener('message', handleMessage);
            };
        }
    }, [chat, socket]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMessage.trim() !== '') {
            socket.send(JSON.stringify({
                type: 'sendMessage',
                message: {
                    chatId: chat.chatId,
                    senderId: user.id,
                    message: newMessage,
                }
            }));
            setNewMessage('');
        }
    };

    if (!chat) {
        return (
            <div className="self-center mx-auto">
                <div className='flex flex-col items-center'>
                    <AiOutlineMessage className={iconClassName} />
                    <p>Select a chat</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto">
                {messages.length ? [...messages].reverse().map((msg, index) => {

                    const previousMsg = messages[index - 1];
                    const showAvatarAndName = !previousMsg || previousMsg.userid !== msg.userid;
                    const isCurrentUser = msg.userid === user.id;

                    return (
                        <Message
                            key={msg.id}
                            msg={msg}
                            isCurrentUser={isCurrentUser}
                            showAvatarAndName={showAvatarAndName}
                            user={user}
                        />
                    );
                }) : <p>No messages yet...</p>}
            </div>

            <form onSubmit={handleSubmit} className="flex mt-2">
                <input
                    type="text"
                    className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Enter a message..."
                />
                <button type="submit" className="p-2 bg-yellow-500 text-lightModeText hover-transform rounded ml-2">Send</button>
            </form>
        </div>
    );
}
