import React from "react";
import * as utils from "../utils";

export default function Chats( { user, chatList } ) {
    if (!user) {
        return (
            <div className="flex flex-col items-center mx-auto p-4">
                <div className="lg:w-3/4 bg-zinc-800 p-6 rounded-lg">
                    <h1 className="text-2xl font-bold mb-4">Chats</h1>
                    <p>Please log in to see your chats.</p>
                </div>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col items-center  mx-auto p-4">
                <div className="lg:w-3/4 bg-zinc-800 p-6 rounded-lg">
                    <h1 className="text-2xl font-bold mb-4">Chats</h1>
                    {chatList && (
                        <ul>
                            {chatList.map((chat, index) => (
                                <li key={index} className="mb-2">
                                    <a
                                        href={`/chats/${chat.id}`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        {chat.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        );
    }
}