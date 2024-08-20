import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Comment = ({ comment }) => (
  <div className="p-4 bg-gray-700 rounded-lg mb-2 flex items-start shadow-md hover:bg-gray-600 transition duration-300">
    <div className="mr-4">
      <FaUserCircle size={40} className="text-gray-400" />
    </div>
    <div className="flex-1">
      <p className="text-sm mb-1 text-gray-300">{comment.comment}</p>
      <p className="text-xs text-gray-400">
        By: <Link to={`/profile/${comment.author}`} className="hover:underline text-yellow-400">{comment.author}</Link>
      </p>
      <p className="text-xs text-gray-500 mt-1">{new Date(comment.created_at).toLocaleString()}</p>
    </div>
  </div>
);

export default Comment;
