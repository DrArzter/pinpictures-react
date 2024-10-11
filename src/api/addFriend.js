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

export default async function addFriend(friendId) {
    try {
        const response = await axios.post(
            `${config.apiUrl}/users/friend`,
            { friendId },
            getHeaders()
        );
        return response.data;
    } catch (error) {
        console.error("Error adding friend:", error);
        throw error;
    }
}