import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Comment = ({ comment }) => {

  const commentContainerClassName = `p-4 rounded-lg mb-2 flex items-start border border-yellow-500 shadow-md transition duration-300`;

  return (
    <div className={commentContainerClassName}>
      <div className="mr-4">
        <FaUserCircle size={40} className="text-gray-400" />
      </div>
      <div className="flex-1">
        <p className={'text-sm mb-1'}>
          {comment.comment}
        </p>
        <p className="text-xs text-gray-400">
          By:{" "}
          <Link
            to={`/profile/${comment.author}`}
            className="hover:underline text-yellow-400"
          >
            {comment.author}
          </Link>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(comment.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Comment;