import axios from 'axios';

import config from './config';

export default async function logout(setUser) {
  try {
    const response = await axios.post(`${config.apiUrl}/users/logout`,
      {},
      {
        withCredentials: true
      }
    );
    setUser(null);
  } catch (error) {
    console.error('Error during logout:', error);
  }
}
