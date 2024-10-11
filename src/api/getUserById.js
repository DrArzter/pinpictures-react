import axios from "axios";

import config from './config';

const getUserByIdUrl = (id) => {
  return ;
};

export default async function getUserById(id) {
  try {
    const response = await axios.get(`${config.apiUrl}/users/by-id/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user by ID (${id}):`, error);
    throw error;
  }
}
