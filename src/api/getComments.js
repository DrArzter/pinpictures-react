import axios from "axios";
import config from "./config";

export default async function getComments() {
  try {
    const response = await axios.get(`${config.apiUrl}/comments`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}
