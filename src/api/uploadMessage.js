import axios from "axios";
import * as utils from "../utils";

import config from "./config";

const getHeaders = () => {
  return {
    headers: {
      'Authorization': utils.getAuthToken()
    }
  };
};

const getMessageUploadUrl = (chatId) => {
  return ;
};

export default async function uploadMessage(chatId, message) {
  try {
    const response = await axios.post(
      `${config.apiUrl}/chats/messages/${chatId}`,
      { message },
      getHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading message:", error);
    return null;
  }
}
