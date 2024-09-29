import React from "react";
import Comment from "./Comment";

export default function CommentList({ comments }) {
  const sortedComments = comments.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <div className="overflow-y-auto mb-4">
      {sortedComments.length > 0 ? (
        sortedComments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))
      ) : (
        <p className="text-gray-500 text-sm">
          No comments yet. Be the first to comment!
        </p>
      )}
    </div>
  );
}