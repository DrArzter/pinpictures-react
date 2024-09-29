import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FiLayers } from "react-icons/fi";

export default function Post({ post, user }) {

  const postContainerClassName = "hover:scale-105 focus:scale-105 transition-transform duration-300";

  const imageContainerClassName = "w-full overflow-hidden rounded-lg";

  const layersIconClassName = "absolute top-4 right-4 text-3xl transition-colors duration-300";

  const postDescriptionClassName = "text-[16px] line-clamp-3 break-words";

  const postAuthorClassName = "text-[16px] mt-[11px]";

  const hasMultipleImages = post.images && post.images.length > 1;


  return (
    <div key={post.id} className={postContainerClassName}>
      <div className="flex flex-col md:flex-row">
        <div className="w-full group relative">
          {post.images && (
            <>
              <div className={imageContainerClassName}>
                {hasMultipleImages && <FiLayers className={layersIconClassName} />}
                <Link to={`/post/${post.id}`}>
                  <img
                    src={post.images[0].picpath} 
                    alt={post.name}
                    className="w-full object-cover max-h-[512px]"
                  />
                </Link>
                <div className="mt-[5px]">
                  <p className="text-[16px]">{post.name}</p>
                  <p className={postDescriptionClassName}>{post.description}</p>
                  <p className={postAuthorClassName}>{post.author}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}