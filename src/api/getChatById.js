import axios from "axios";
import config from "./config";

export default async function getChatById(id) {
  try {
    const response = await axios.get(
      `${config.apiUrl}/chats/${id}`,
      {
        withCredentials: true
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching chat by ID:", error);
    throw error;
  }
}
