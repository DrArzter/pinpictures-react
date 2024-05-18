import React from "react";
import * as utils from ".";

export default function createPostForm() {
    function handleSubmit(e) {
        e.preventDefault();
    }
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-center bg-zinc-800 text-zinc-700 p-6 rounded-lg">
            <input
                type="text"
                name="title"
                placeholder="Title"
                className="input w-5/6 rounded-sm p-1"
            />
            <textarea
                type="text"
                name="description"
                placeholder="Description"
                className="input w-5/6 rounded-sm p-1 min-h-24 max-h-96"
            />
            <input
                type="file"
                name="image"
                placeholder="Image"
                className="input"
            />
            <button
                type="submit"
                onClick={() => utils.createPost()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Create Post
            </button>
        </div>
    );
}