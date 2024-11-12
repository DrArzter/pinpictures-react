import axios from 'axios';
import config from "./config";

export default async function getAllChatsApi() {
  try {
    const response = await axios.get(
      `${config.apiUrl}/admin/chats`,
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching chats:', error);
    return null;
  }
}
