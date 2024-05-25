import axios from "axios";
import Cookies from 'js-cookie';
import config from './config';

const getLoginUrl = () => {
  return `${config.apiUrl}/users/login`;
};

const saveToken = (token) => {
  if (token) {
    Cookies.set('token', token);
  }
};

export default async function login(username, password) {
  try {
    const response = await axios.post(getLoginUrl(), {
      name: username,
      password: password
    });

    const token = response.data.token;
    saveToken(token);

    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    alert('Error during login. Please try again.');
    throw error;
  }
}
