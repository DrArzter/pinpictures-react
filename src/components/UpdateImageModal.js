import React, { useState, useRef } from "react";
import * as utils from "../utils";

export default function UpdateImageModal({ onClose, user, setUser, profile, setProfile }) {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
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
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await utils.uploadProfileImage(image, user.id);
      setUser(updatedUser);
      if (profile.name === user.name) {
        setProfile(updatedUser);
      }
      onClose();
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[999] bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="lg:w-1/2 w-11/12 bg-zinc-800 text-zinc-100 p-6 rounded-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
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
            <div
              className="w-5/6 mt-4 flex items-center justify-center cursor-pointer"
              onClick={handleImageClick}
            >
              <img
                src={imagePreview}
                style={{ maxWidth: "100%", height: "auto" }}
                alt="Preview"
                className="rounded-lg max-h-60"
              />
            </div>
          )}
          {!imagePreview && (
            <div
              className="w-5/6 mt-4 cursor-pointer"
              onClick={handleImageClick}
            >
              <div className="bg-zinc-700 text-zinc-400 p-6 rounded-lg flex items-center justify-center">
                <span>Click to select an image</span>
              </div>
            </div>
          )}
          <button
            type="submit"
            className="bg-zinc-700 hover:bg-zinc-600 font-bold py-2 px-4 rounded mt-4"
          >
            Update Image
          </button>
        </form>
      </div>
    </div>
  );
}
