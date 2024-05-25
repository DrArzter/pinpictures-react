import axios from 'axios';
import config from './config';

const getPostsUrl = () => {
  return `${config.apiUrl}/posts`;
};

export default async function getPosts() {
  try {
    const response = await axios.get(getPostsUrl());
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}
