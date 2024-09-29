import axios from "axios";
import * as utils from "../utils";

import config from "./config";

export default async function uploadComment(postId, comment, setCommentValues, user) {
  try {
    const response = await axios.post(
      `${config.apiUrl}/comments`,
      {
        postid: postId,
        comment: comment
      },
      {
        headers: {
          'Authorization': utils.getAuthToken()
        }
      }
    );

    const newComment = response.data.newComment;
    newComment.author = user.name;
    newComment.created_at = new Date().toLocaleString();
    
    return newComment;

  } catch (error) {
    console.error('Failed to add comment', error);
    throw error;
  }
}
