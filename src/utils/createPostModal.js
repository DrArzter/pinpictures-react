import React, { useState } from "react";
import * as utils from ".";

export default function CreatePostModal({ setCreatePostModal }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    function handleSubmit(e) {
        e.preventDefault(); // Prevent default form submission behavior
        utils.createPost(title, description, image).then(() => {
            closeModal();
        });
    }

    function closeModal() {
        setCreatePostModal(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="lg:w-1/2 w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-center bg-zinc-800 text-zinc-700 p-6 rounded-lg">
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
                >
                    Create Post
                </button>
            </div>
        </form>
    );
}
