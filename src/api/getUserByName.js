import axios from "axios";
import config from "./config";  

export default async function getUserByName(name) {
  try {
    const response = await axios.get(`${config.apiUrl}/users/by-name/${name}`);
    return response.data;
    console.log(response.data);
  } catch (error) {
    console.error(`Error fetching user by name (${name}):`, error);
    throw error;
  }
}
