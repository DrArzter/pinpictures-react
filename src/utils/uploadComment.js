import axios from "axios";
import getComments from "./getComments";

export default async function uploadComment (postId, comment, setCommentValues) {
    axios.post('http://localhost:3000/api/posts', {
      type: "addComment",
      id: postId,
      content: comment
    }, {
      headers: {
        'Authorization': localStorage.getItem('token'),
      }
    })
      .then(response => {
        getComments(postId);
        setCommentValues({});
      })
      .catch(error => {
        console.error('Failed to add comment', error);
      });
};

