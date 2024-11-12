import axios from 'axios';
import * as utils from '../utils';

import config from "./config";

export default async function getAllPosts() {
  try {
    const response = await axios.get(
      `${config.apiUrl}/admin/posts`,
      {
        withCredentials: true,
      });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return null;
  }
}
