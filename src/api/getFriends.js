import axios from "axios";
import config from "./config";

export default async function getFriends(name) {
    try {
      const response = await axios.get(`${config.apiUrl}/users/friend/${name}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching friends:', error);
      return null;
    }
  }