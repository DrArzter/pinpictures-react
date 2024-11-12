import axios from 'axios';
import config from "./config";


export default async function setBananaLevel(id, value) {
  try {
    const response = await axios.post(
      `${config.apiUrl}/admin/user/${id}`,
      { action: 'setBananaLevel', value: value },
      {
        withCredentials: true
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching chats:', error);
    return null;
  }
}
