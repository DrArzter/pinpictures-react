import React from "react";
import * as utils from "../utils";

export default function createPostForm() {
    return (
        <div>
            <input
                type="text"
                name="title"
                placeholder="Title"
                className="input"
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                className="input"
            />
            <input
                type="file"
                name="image"
                placeholder="Image"
                className="input"
            />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Create Post
            </button>
        </div>
    );
}