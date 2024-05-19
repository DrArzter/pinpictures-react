import React from "react";
import * as utils from "../utils";

export default function Chat({ user }) {
    return (
        <div className="flex flex-col items-center mx-auto p-4">
            <div className="w-full lg:w-3/4 bg-zinc-800 p-6 rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Chat</h1>
            </div>
        </div>
    );
}