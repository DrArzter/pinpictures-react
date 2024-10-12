import axios from 'axios';
import config from "./config";

export default async function banUser(id, value, action) {
  try {    
    const response = await axios.post(
      `${config.apiUrl}/admin/user/${id}`,
       {action: action, value: value},
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
