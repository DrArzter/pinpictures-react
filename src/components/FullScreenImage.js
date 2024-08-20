import React from "react";
import { FaRegWindowClose } from "react-icons/fa";

export default function FullScreenImage({ imageUrl, onClose }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="absolute top-0 right-0 p-4">
        <FaRegWindowClose className="text-white hover:text-red-500 transition duration-300 text-3xl cursor-pointer" onClick={onClose} />
      </div>
      <img src={imageUrl} alt="FullScreenImage" className="max-h-full max-w-full object-contain p-10" />
    </div>
  );
}
