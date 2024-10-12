import axios from 'axios';
import config from "./config";

export default async function getChats() {
  try {
    const response = await axios.get(
      `${config.apiUrl}/chats`,
      {
        withCredentials: true
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching chats:', error);
    return null;
  }
}
