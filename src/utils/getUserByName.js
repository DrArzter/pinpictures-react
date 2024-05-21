import axios from "axios";

export default async function getUserByName(name) {
    console.log(name);
    const response = await axios.get(`http://localhost:3000/api/users/by-name/${name}`);
    console.log(response.data);
    return response.data;
}