import axios from "axios";

export default async function getUserById(id) {
    console.log(id);
    const response = await axios.get(`http://localhost:3000/api/users/by-id/${id}`);
    return response.data;
}