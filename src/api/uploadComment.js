import axios from "axios";
import * as utils from "../utils";

import config from "./config";

const addCommentToPost = (posts, postId, newComment) => {
  const updatedPosts = [...posts];
  console.log(updatedPosts);
  const postIndex = updatedPosts.findIndex(post => post.id === postId);
  updatedPosts[postIndex].comments = [...updatedPosts[postIndex].comments, newComment];
  return updatedPosts;
};

const resetCommentValues = (setCommentValues) => {
  setCommentValues({});
};

export default async function uploadComment(postId, comment, setCommentValues, posts, setPosts, user) {
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
    console.log(newComment);

    setPosts(prevPosts => {
      const updatedPosts = addCommentToPost(prevPosts, postId, newComment);
      resetCommentValues(setCommentValues);
      return updatedPosts;
    });

  } catch (error) {
    console.error('Failed to add comment', error);
    throw error;
  }
}
