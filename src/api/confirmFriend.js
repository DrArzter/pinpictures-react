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

const getConfirmFriendUrl = () => {
    return ;
};


export default async function confirmFriend(friendId) {
    try {
        const response = await axios.post(
            `${config.apiUrl}/users/friend/confirm`,
            { friendId },
            getHeaders()
        );
        return response.data;
    } catch (error) {
        console.error("Error deleting friend:", error);
        throw error;
    }
}