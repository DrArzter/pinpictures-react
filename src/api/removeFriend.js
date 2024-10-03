import axios from "axios";
import * as utils from "../utils";

import config from "./config";

const getHeaders = () => {
    return {
        headers: {
            Authorization: utils.getAuthToken()
        }
    };
};

const getRemoveFriendUrl = () => {
    return `${config.apiUrl}/users/friend/remove`;
};

export default async function removeFriend(friendId) {
    try {
        const response = await axios.post(
            getRemoveFriendUrl(),
            { friendId },
            getHeaders()
        );
        return response.data;
    } catch (error) {
        console.error("Error deleting friend:", error);
        throw error;
    }
}