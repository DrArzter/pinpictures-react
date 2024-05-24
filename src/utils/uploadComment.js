import axios from "axios";
import Cookies from "js-cookie";
import config from "./config";

export default async function uploadComment(postId, comment, setCommentValues, posts, setPosts, user) {
    try {
        const response = await axios.post(`${config.apiUrl}/comments`, {
            postid: postId,
            comment: comment
        }, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        });

        const newComment = response.data;
        newComment.author = user.name;

        console.log('New comment from API:', newComment);

        setCommentValues(prevValues => ({
            ...prevValues,
            [postId]: ''
        }));

        return newComment;

    } catch (error) {
        console.error('Failed to add comment', error);
        throw error;
    }
}
