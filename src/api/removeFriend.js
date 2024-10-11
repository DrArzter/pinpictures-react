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
    return ;
};

export default async function removeFriend(friendId) {
    try {
        const response = await axios.post(
            `${config.apiUrl}/users/friend/remove`,
            { friendId },
            getHeaders()
        );
        return response.data;
    } catch (error) {
        console.error("Error deleting friend:", error);
        throw error;
    }
}