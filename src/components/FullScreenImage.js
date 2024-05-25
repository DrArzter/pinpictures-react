import React from "react";

export default function FullScreenImage({ imageUrl, onClose }) {

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-50" onClick={onClose}>
            <img src={imageUrl} alt="FullScreenImage" className="max-h-full max-w-full object-contain p-10" />
        </div>

    )
}