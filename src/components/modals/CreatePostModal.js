import React, { useState, useRef, useContext } from "react";
import FullScreenImage from "./FullScreenImageModal";
import { MdImageNotSupported } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";

import ThemeContext from "../ThemeContext";
import * as api from "../../api";

export default function CreatePostModal({
  setCreatePostModal,
  posts,
  setPosts,
  user,
  notifications,
  setNotifications,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const { isDarkMode } = useContext(ThemeContext);

  const modalBackgroundClass = `fixed md:inset-[-2%] inset-0 z-50 overflow-auto flex items-center justify-center ${isDarkMode ? "bg-darkModeBackground bg-opacity-80" : "md:bg-black md:bg-opacity-40"
    }`;

  const modalContentClass = `relative 5xl:w-5/12 4xl:w-6/12 3xl:w-7/12 w-full md:h-5/6 h-full md:p-6 flex flex-col shadow-2xl md:rounded-lg ${isDarkMode ? "bg-darkModeBackground text-darkModeText" : "bg-lightModeBackground text-lightModeText"
    }`;

  const inputClass = `input w-5/6 rounded-md p-2 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:scale-110 ${isDarkMode ? "bg-darkModeBackground text-darkModeText border-zinc-600" : "bg-lightModeBackground text-lightModeText border-zinc-800"
    }`;

  const textAreaClass = `${inputClass} min-h-24 max-h-96`;

  const imageContainerClass = "w-5/6 flex flex-wrap gap-2 overflow-y-auto";

  const imagePreviewClass = "rounded-lg max-h-60 cursor-pointer";

  const removeImageButtonClass =
    "absolute top-2 right-2 bg-red-500 text-white rounded-md p-2 opacity-75 hover:opacity-100 transition-opacity duration-200";

  const fileInputButtonClass = `relative flex items-center justify-center w-5/6 p-6 rounded-lg cursor-pointer transition-colors duration-300 border ${isDarkMode
      ? "bg-darkModeBackground hover:bg-lightModeBackground hover:text-lightModeText text-darkModeText border-zinc-600 hover border-zinc-500"
      : "bg-lightModeBackground hover:bg-black hover:text-white text-lightModeText border-zinc-800"
    }`;

  const submitButtonClass = `bg-zinc-700 hover:bg-zinc-600 hover:text-yellow-500 text-white font-bold py-2 px-4 rounded mt-2 transition-colors duration-300 flex items-center ${loading ? "opacity-50 cursor-not-allowed" : ""
    }`;

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
      setNotifications([...notifications, { message: "You can only upload up to 10 images", status: "error" }]);
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
    <div className={modalBackgroundClass} onClick={handleClickOutside}>
      <div className={modalContentClass}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-[80vh] items-center">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className={inputClass}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className={textAreaClass}
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
          <div className={imageContainerClass}>
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  className={imagePreviewClass}
                  onClick={() => handleImageClick(index)}
                />
                <button
                  type="button"
                  className={removeImageButtonClass}
                  onClick={() => handleRemoveImage(index)}
                >
                  <MdImageNotSupported />
                </button>
              </div>
            ))}
          </div>
          {images.length < 10 && (
            <div className="w-full flex justify-center">
              <div className={fileInputButtonClass} onClick={handleFileInputClick}>
                <span>Click to select images (max {10 - images.length})</span>
              </div>
            </div>
          )}
          <button type="submit" className={submitButtonClass} disabled={loading}>
            {loading && <FaSpinner className="animate-spin mr-2" />}
            {loading ? "Creating..." : "Create Post"}
          </button>
        </form>
      </div>
      {fullScreenImage && <FullScreenImage imageUrl={fullScreenImage} onClose={() => setFullScreenImage(null)} />}
    </div>
  );
}
