import axios from 'axios';
import config from "./config";

export default async function getAllUsers() {
  try {
    const response = await axios.get(
      `${config.apiUrl}/admin/users`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching chats:', error);
    return null;
  }
}
