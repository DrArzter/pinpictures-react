import axios from "axios";
import config from "./config";

export default async function uploadMessage(chatId, message) {

  const headers = {
    "Content-Type": "multipart/form-data",
  };

  try {
    const response = await axios.post(
      `${config.apiUrl}/chats/messages/${chatId}`,
      { message },
      {
        headers,
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading message:", error);
    return null;
  }
}
