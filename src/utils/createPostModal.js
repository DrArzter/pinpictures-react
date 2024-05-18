import React, { useState } from "react";
import * as utils from ".";

export default function CreatePostModal({ setCreatePostModal, posts, setPosts, user }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        await utils.uploadPost(title, description, image, user.name).then((newPost) => {
            setPosts([newPost, ...posts]);
            closeModal();
        });
    }

    function closeModal() {
        setCreatePostModal(false);
    }

    return (
        <div className="lg:w-1/2 w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform flex flex-col gap-4 items-center bg-zinc-800 text-zinc-700 p-6 rounded-lg z-[999]">
            <input
                type="text"
                name="title"
                placeholder="Title"
                className="input w-5/6 rounded-sm p-1"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                name="description"
                placeholder="Description"
                className="input w-5/6 rounded-sm p-1 min-h-24 max-h-96"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="file"
                name="picpath"
                placeholder="Image"
                className="input w-5/6 rounded-sm p-1"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
            />
            <button
                type="submit"
                className="bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleSubmit}
            >
                Create Post
            </button>
        </div>
    );
}
