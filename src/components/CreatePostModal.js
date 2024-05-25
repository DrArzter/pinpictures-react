import React, { useState, useRef } from "react";
import * as utils from "../utils";

export default function CreatePostModal({
  setCreatePostModal,
  posts,
  setPosts,
  filteredPosts,
  setFilteredPosts,
  user,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newPost = await utils.uploadPost(title, description, image, user.name);
      setPosts([newPost, ...posts]);
      setFilteredPosts([newPost, ...filteredPosts]);
      closeModal();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  function closeModal() {
    setCreatePostModal(false);
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }

  function handleImageClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[999] bg-black bg-opacity-50" onClick={handleClickOutside}>
      <div className="lg:w-1/2 w-11/12 bg-zinc-800 text-zinc-100 p-6 rounded-lg relative">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="input w-5/6 rounded-sm p-2 bg-zinc-700 border border-zinc-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="input w-5/6 rounded-sm p-2 bg-zinc-700 border border-zinc-600 min-h-24 max-h-96"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            ref={fileInputRef}
            id="imageInput"
            type="file"
            name="image"
            placeholder="Image"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="w-5/6 mt-4 flex items-center justify-center cursor-pointer" onClick={handleImageClick}>
              <img src={imagePreview} style={{ maxWidth: "100%", height: "auto" }} alt="Preview" className="rounded-lg max-h-60" />
            </div>
          )}
          {!imagePreview && (
            <div className="w-5/6 mt-4 cursor-pointer" onClick={handleImageClick}>
              <div className="bg-zinc-700 text-zinc-400 p-6 rounded-lg flex items-center justify-center">
                <span>Click to select an image</span>
              </div>
            </div>
          )}
          <button
            type="submit"
            className="bg-zinc-700 hover:bg-zinc-600 font-bold py-2 px-4 rounded mt-4"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}
