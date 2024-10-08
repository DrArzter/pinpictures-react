import axios from "axios";
import * as utils from "../utils";

import config from "./config";

const getHeaders = () => {
  return {
    headers: {
      Authorization: utils.getAuthToken()
    }
  };
};

const getCreateChatUrl = () => {
  return `${config.apiUrl}/chats`;
};

export default async function createChat(secondUserId) {
  try {
    const response = await axios.post(
      getCreateChatUrl(),
      { secondUserId },
      getHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
}
