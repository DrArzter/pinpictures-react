import axios from "axios";
import Cookies from "js-cookie";

export default async function uploadMessage(chatId, message) {
    console.log(chatId, message);
    try {
        const response = await axios.post(
            `http://localhost:3000/api/chats/messages/${chatId}`,
            {
                message
            },
            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            }
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error uploading message:", error);
        return null;
    }
}
