import axios from "axios";

export default async function getUserById(id) {
    console.log(id);
    const response = await axios.get(`${config.apiUrl}/users/by-id/${id}`);
    return response.data;
}