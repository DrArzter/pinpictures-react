import axios from "axios";
import config from "./config";  

const getUserByNameUrl = (name) => {
  return `${config.apiUrl}/users/by-name/${name}`;
};

export default async function getUserByName(name) {
  try {
    const response = await axios.get(getUserByNameUrl(name));
    return response.data;
  } catch (error) {
    console.error(`Error fetching user by name (${name}):`, error);
    throw error;
  }
}
