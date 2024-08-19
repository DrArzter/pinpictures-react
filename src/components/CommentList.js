import React from "react";

export default function CommentList({ post, comments }) {
    return (
        <div className="flex flex-col space-y-4">
            {comments.map((comment) => (
                <Comment
                    key={comment.id}
                    comment={comment}
                    postId={post.id}
                />
            ))}
        </div>
    );
}