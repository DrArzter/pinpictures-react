import axios from 'axios';
import config from "./config";

export default async function getPostById(id) {
  try {
    const response = await axios.get(
      `${config.apiUrl}/posts/id/${id}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}
