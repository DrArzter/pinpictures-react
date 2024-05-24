import axios from "axios";
import config from "./config";

export default async function getComments() {
    const response = await axios.get(`${config.apiUrl}/comments`);
    return response.data.data;
}