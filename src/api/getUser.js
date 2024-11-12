import axios from 'axios';
import Cookies from 'js-cookie';
import config from "./config";

export default async function getUser() {
  try {
    const response = await axios.get(
      `${config.apiUrl}/users`,
      {
        withCredentials: true
      }
    );
    Cookies.set('token', response.data.sessionToken	);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}
