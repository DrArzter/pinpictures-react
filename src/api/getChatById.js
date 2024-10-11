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

export default async function getChatById(id) {
  try {
    const response = await axios.get(`${config.apiUrl}/chats/${id}`, getHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching chat by ID:", error);
    throw error;
  }
}
