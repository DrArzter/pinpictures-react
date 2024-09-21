import axios from 'axios';
import * as utils from '../utils';

import config from "./config";

const getHeaders = () => {
  const token = utils.getAuthToken();
  return token ? { headers: { Authorization: token } } : null;
};

export default async function banUser(id, value, action) {
  try {
    const headers = getHeaders();
    if (!headers) {
      return null;
    }
    
    const response = await axios.post(`${config.apiUrl}/admin/user/${id}`, {action: action, value: value}, headers);
    return response.data;
  } catch (error) {
    console.error('Error fetching chats:', error);
    return null;
  }
}
