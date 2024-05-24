import axios from "axios";
import Cookies from "js-cookie";
import config from "./config";

export default async function createChat(secondUserId) {
  try {
    const response = await axios.post(
      `${config.apiUrl}/chats`,
      { secondUserId },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
