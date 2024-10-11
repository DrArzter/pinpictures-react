import axios from 'axios';
import * as utils from '../utils';

import config from "./config";

const getHeaders = () => {
  const token = utils.getAuthToken();
  return token ? { headers: { Authorization: token } } : null;
};

const getUserUrl = () => {
  return `${config.apiUrl}/users`;
};

export default async function getUser() {
  try {
    const headers = getHeaders();
    if (!headers) {
      return null;
    }
    const response = await axios.get(getUserUrl(), headers, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}
