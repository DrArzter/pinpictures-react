import axios from 'axios';
import Cookies from 'js-cookie';
import config from './config';

export default async function likePost(postId) {
  try {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    const response = await axios.post(
      `${config.apiUrl}/posts/like/${postId}`,
      {},
      {
        headers,
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    console.error('Error liking post:', error);
    return null;
  }
}
