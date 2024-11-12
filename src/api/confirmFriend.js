import axios from "axios";
import * as utils from "../utils";

import config from "./config";

export default async function confirmFriend(friendId) {
    try {
        const response = await axios.post(
            `${config.apiUrl}/users/friend/confirm`,
            { friendId },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error("Error deleting friend:", error);
        throw error;
    }
}