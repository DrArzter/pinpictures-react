import axios from 'axios';
import config from "./config";

export default async function getPosts(page) {
  try {
    const response = await axios.get(`${config.apiUrl}/posts/${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}
