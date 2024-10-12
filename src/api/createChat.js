import axios from "axios";
import * as utils from "../utils";

import config from "./config";

export default async function createChat(secondUserId) {
  try {
    const response = await axios.post(
      `${config.apiUrl}/chats`,
      { secondUserId },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
}
