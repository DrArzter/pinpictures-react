import axios from "axios";
import * as utils from "../utils";

import config from "./config";

const getHeaders = () => {
  const token = utils.getAuthToken();
  return token ? { headers: { Authorization: token } } : null;
};

export default async function getMessages(id) {
  try {
    const headers = getHeaders();
    if (!headers) {
      throw new Error('No authorization token found');
    }

    const response = await axios.get(`${config.apiUrl}/chats/messages/${id}`, headers);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
}
