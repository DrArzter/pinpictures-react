import axios from "axios";
import * as utils from "../utils";

import config from "./config";

export default async function addFriend(friendId) {
    try {
        const response = await axios.post(
            `${config.apiUrl}/users/friend`,
            { friendId },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error("Error adding friend:", error);
        throw error;
    }
}