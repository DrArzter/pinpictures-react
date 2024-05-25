import axios from "axios";
import Cookies from 'js-cookie';
import config from './config';

const validateInput = (username, email, password) => {
  if (!username || !email || !password) {
    alert('Please fill in all fields');
    return false;
  }
  return true;
};

const getRegistrationUrl = () => {
  return `${config.apiUrl}/users/register`;
};

const saveToken = (token) => {
  if (token) {
    Cookies.set('token', token);
  }
};

export default async function registration(username, email, password) {
  if (!validateInput(username, email, password)) {
    return;
  }

  try {
    const response = await axios.post(getRegistrationUrl(), {
      name: username,
      email: email,
      password: password
    });

    const token = response.data.token;
    saveToken(token);

    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    alert('Error during registration. Please try again.');
    throw error;
  }
}
