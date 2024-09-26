import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FiLayers } from "react-icons/fi";

import ThemeContext from "./ThemeContext";

export default function Post({ post, user }) {

  const [isPostFullScreen, setIsPostFullScreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { isDarkMode } = useContext(ThemeContext);

  const hasMultipleImages = post.images && post.images.length > 1;

  return (
    <>
      <div
        key={post.id}
        className={`hover:scale-105 focus:scale-105 transition-transform duration-300 
        ${isDarkMode ? "bg-darkModeBackground text-darkModeText" : "bg-white text-black"}`} 
      >
        <div className="flex flex-col md:flex-row">
          <div className="w-full group relative">
            {post.images && (
              <>
                <div className={`w-full overflow-hidden rounded-lg 
                ${isDarkMode ? "bg-darkModeBackground" : "bg-lightModeBackground"}`}> 
                  {hasMultipleImages && (
                    <FiLayers
                      className={`absolute top-4 right-4 text-3xl transition-colors duration-300 
                      ${isDarkMode ? "text-darkModeText hover:text-yellow-400" : "text-darkModeText hover:text-yellow-500"}`}
                    />
                  )}
                  <Link to={{
                    pathname: `/post/${post.id}`,
                  }}>
                  <img
                    src={`${post.images[currentImageIndex].picpath}`}
                    alt={post.name}
                    className="w-full object-cover max-h-[512px]"
                  />
                  </Link>
                  <div className={`mt-[5px] 
                  ${isDarkMode ? "text-darkModeText" : "text-lightModeText"}`}>
                    <p className="text-[16px]">{post.name}</p>
                    <p className={`text-[16px] line-clamp-3 break-words 
                    ${isDarkMode ? "text-darkModeText" : "text-lightModeText"}`}>{post.description}</p>
                    <p className={`text-[16px] mt-[11px] 
                    ${isDarkMode ? "text-darkModeText" : "text-lightModeText"}`}>{post.author}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
