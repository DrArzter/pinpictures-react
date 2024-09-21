import axios from 'axios';
import * as utils from '../utils';

import config from "./config";

const getHeaders = () => {
  const token = utils.getAuthToken();
  return token ? { headers: { Authorization: token } } : null;
};

export default async function getAllUsers() {
  try {
    const headers = getHeaders();
    if (!headers) {
      return null;
    }
    
    const response = await axios.get(`${config.apiUrl}/admin/users`, headers);
    return response.data;
  } catch (error) {
    console.error('Error fetching chats:', error);
    return null;
  }
}
