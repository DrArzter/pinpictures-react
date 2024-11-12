import axios from "axios";
import config from './config';

export default async function login(username, password) {
  try {
    const response = await axios.post(
      `${config.apiUrl}/users/login`,
      {
        name: username,
        password: password
      },
      {
        withCredentials: true
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    alert('Error during login. Please try again.');
    throw error;
  }
}
