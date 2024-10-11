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

export default async function createChat(secondUserId) {
  try {
    const response = await axios.post(
      `${config.apiUrl}/chats`,
      { secondUserId },
      getHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
}
