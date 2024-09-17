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

const getAddFriendUrl = () => {
    return `${config.apiUrl}/users/friend`;
};

export default async function addFriend(friendId) {
    try {
        const response = await axios.post(
            getAddFriendUrl(),
            { friendId },
            getHeaders()
        );
        return response.data;
    } catch (error) {
        console.error("Error adding friend:", error);
        throw error;
    }
}