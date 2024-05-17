import axios from "axios";

export default async function uploadMessage() {
    const response = await axios.post('http://localhost:3000/api/chats');
    return response.data.data;
}