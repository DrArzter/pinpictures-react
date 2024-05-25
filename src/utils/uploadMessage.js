import axios from "axios";
import config from "./config";
import * as utils from "../utils";

const getHeaders = () => {
  return {
    headers: {
      'Authorization': utils.getAuthToken()
    }
  };
};

const getMessageUploadUrl = (chatId) => {
  return `${config.apiUrl}/chats/messages/${chatId}`;
};

export default async function uploadMessage(chatId, message) {
  try {
    const response = await axios.post(
      getMessageUploadUrl(chatId),
      { message },
      getHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading message:", error);
    return null;
  }
}
