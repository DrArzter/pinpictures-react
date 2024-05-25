import axios from "axios";
import config from "./config";

const getCommentsUrl = () => {
  return `${config.apiUrl}/comments`;
};

export default async function getComments() {
  try {
    const response = await axios.get(getCommentsUrl());
    return response.data.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}
