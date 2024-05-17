import axios from "axios";

export default async function getChats() {
    const response = await axios.get("http://localhost:3000/api/chats");
    return response.data.data;
}