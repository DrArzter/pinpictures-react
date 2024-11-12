import axios from "axios";
import config from "./config";

export default async function removeFriend(friendId) {
    try {
        const response = await axios.post(
            `${config.apiUrl}/users/friend/remove`,
            { friendId },
            {
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error deleting friend:", error);
        throw error;
    }
}