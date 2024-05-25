import axios from 'axios';
import * as utils from '../utils';
import config from './config';

// Формирование заголовков для запроса
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
    
    const response = await axios.get(getUserUrl(), headers);
    return response.data[0];
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}
