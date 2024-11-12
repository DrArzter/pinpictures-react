import axios from "axios";
import config from "./config";

export default async function getMessages(id) {
  try {
    const response = await axios.get(
      `${config.apiUrl}/chats/messages/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
}
