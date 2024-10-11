import axios from 'axios';
import Cookies from 'js-cookie';

import config from './config';

const getHeaders = () => {
  const token = Cookies.get('token');
  return {
    'Content-Type': 'multipart/form-data',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

export default async function likePost(postId) {
  try {
    const headers = getHeaders();
    const response = await axios.post(`${config.apiUrl}/posts/like/${postId}`, {}, { headers });
    return response;
  } catch (error) {
    console.error('Error liking post:', error);
    return null;
  }
}