import axios from "axios";

export default async function getUserByName(name) {
    const response = await axios.get(`http://localhost:3000/api/users/${name}`);
    return response.data;
}