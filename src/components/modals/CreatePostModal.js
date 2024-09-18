import React, { useState, useRef } from "react";
import FullScreenImage from "./FullScreenImageModal";
import { MdImageNotSupported } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";

import * as api from "../../api";
import * as utils from "../../utils";

export default function CreatePostModal({
  setCreatePostModal,
  posts,
  setPosts,
  filteredPosts,
  setFilteredPosts,
  user,
  notifications,
  setNotifications
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const responseData = await api.uploadPost(title, description, images, user.name);
  
      const newPost = responseData.newPost;
      const message = responseData.message;
      const status = responseData.status;
  
      setNotifications([...notifications, { message, status }]);
      setPosts([newPost, ...posts]);
      setFilteredPosts([newPost, ...filteredPosts]);
      closeModal();
    } catch (error) {
      const status = error.response?.data?.status || "error";
      const message = error.response?.data?.message || "An unexpected error occurred";
      
      setNotifications([...notifications, { message, status }]);
    } finally {
      setLoading(false);
    }
  }
  
  

  function closeModal() {
    setCreatePostModal(false);
  }

  function handleImageChange(e) {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 10) {
      setNotifications([...notifications, { message: 'You can only upload up to 10 images', status: 'error' }]);
      return;
    }
    setImages((prevImages) => [...prevImages, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prevPreviews) => [...prevPreviews, reader.result]);
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
    <div className="fixed inset-0 flex items-center justify-center z-[49] overflow-y-auto bg-black bg-opacity-50" onClick={handleClickOutside}>
      <div className="lg:w-1/2 w-11/12 bg-zinc-800 text-zinc-100 p-6 rounded-lg relative overflow-y-auto shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-[80vh] items-center">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="input w-5/6 rounded-md p-2 bg-zinc-700 border border-zinc-600 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 transition-all duration-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="input w-5/6 rounded-md p-2 bg-zinc-700 border border-zinc-600 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 transition-all duration-300 min-h-24 max-h-96"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            ref={fileInputRef}
            id="imageInput"
            type="file"
            name="images"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-5/6 mt-4 flex flex-wrap gap-2 overflow-y-auto">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  className="rounded-lg max-h-60 cursor-pointer"
                  onClick={() => handleImageClick(index)}
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-md p-2 opacity-75 hover:opacity-100 transition-opacity duration-200"
                  onClick={() => handleRemoveImage(index)}
                >
                  <MdImageNotSupported />
                </button>
              </div>
            ))}
          </div>
          {images.length < 10 && (
            <div className="w-full flex justify-center mt-2">
              <div
                className="relative flex items-center justify-center w-5/6 bg-zinc-700 text-zinc-400 p-6 rounded-lg cursor-pointer hover:bg-zinc-600 transition-colors duration-300"
                onClick={handleFileInputClick}
              >
                <span>Click to select images (max {10 - images.length})</span>
              </div>
            </div>
          )}
          <button
            type="submit"
            className={`bg-zinc-700 hover:bg-zinc-600 hover:text-yellow-500 text-white font-bold py-2 px-4 rounded mt-4 transition-colors duration-300 flex items-center ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={loading}
          >
            {loading && <FaSpinner className="animate-spin mr-2" />}
            {loading ? "Creating..." : "Create Post"}
          </button>
        </form>
      </div>
      {fullScreenImage && (
        <FullScreenImage imageUrl={fullScreenImage} onClose={() => setFullScreenImage(null)} />
      )}
    </div>
  );
}
