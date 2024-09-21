import axios from 'axios';
import * as utils from '../utils';

import config from "./config";

const getHeaders = () => {
  const token = utils.getAuthToken();
  return token ? { headers: { Authorization: token } } : null;
};

export default async function setBananaLevel(id, value) {
  try {
    const headers = getHeaders();
    if (!headers) {
      return null;
    }
    
    const response = await axios.post(`${config.apiUrl}/admin/user/${id}`, {action: 'setBananaLevel', value: value}, headers);
    return response.data;
  } catch (error) {
    console.error('Error fetching chats:', error);
    return null;
  }
}
