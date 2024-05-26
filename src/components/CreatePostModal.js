import React, { useState, useRef } from "react";
import * as utils from "../utils";
import FullScreenImage from "./FullScreenImage";

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
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const fileInputRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newPost = await utils.uploadPost(title, description, images, user.name);
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
    const files = Array.from(e.target.files);
    if (files.length + images.length > 10) {
      console.error("You can upload a maximum of 10 images.");
      return;
    }
    setImages(prevImages => [...prevImages, ...files]);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prevPreviews => [...prevPreviews, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  }

  function handleImageClick(index) {
    setFullScreenImage(imagePreviews[index]);
  }

  function handleRemoveImage(index) {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  }

  function handleFileInputClick() {
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
            name="images"
            placeholder="Images"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-5/6 mt-4 flex flex-wrap gap-2">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  className="rounded-lg max-h-60 cursor-pointer"
                  onClick={() => handleImageClick(index)}
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1"
                  onClick={() => handleRemoveImage(index)}
                >
                  X
                </button>
              </div>
            ))}
            {images.length < 10 && (
              <div className="w-full flex justify-center mt-2">
                <div className="relative flex items-center justify-center w-full bg-zinc-700 text-zinc-400 p-6 rounded-lg cursor-pointer" onClick={handleFileInputClick}>
                  <span>Click to select images (max {10 - images.length})</span>
                </div>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-zinc-700 hover:bg-zinc-600 font-bold py-2 px-4 rounded mt-4"
          >
            Create Post
          </button>
        </form>
      </div>
      {fullScreenImage && (
        <FullScreenImage imageUrl={fullScreenImage} onClose={() => setFullScreenImage(null)} />
      )}
    </div>
  );
}
