import axios from "axios";
import Cookies from "js-cookie";

export default async function uploadComment(postId, comment, setCommentValues, posts, setPosts, user) {
    try {
        const response = await axios.post('http://localhost:3000/api/comments', {
            postid: postId,
            comment: comment
        }, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        });

        const newComment = response.data
        newComment.author = user.name

        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: post.comments ? [...post.comments, newComment] : [newComment]
                };
            }
            return post;
        });

        setPosts(updatedPosts);
        setCommentValues({});

    } catch (error) {
        console.error('Failed to add comment', error);
    }
}
