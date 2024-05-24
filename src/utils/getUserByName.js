import axios from "axios";
import config from "./config";  


export default async function getUserByName(name) {
    const response = await axios.get(`${config.apiUrl}/users/by-name/${name}`);
    return response.data;
}