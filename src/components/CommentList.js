import React from "react";
import Comment from "./Comment";

export default function CommentList({ comments }) {
  return (
    <div className="max-h-60 overflow-y-auto mb-4">
      {comments.length > 0 ? (
        comments.map((comment) => <Comment key={comment.id} comment={comment} />)
      ) : (
        <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
}
