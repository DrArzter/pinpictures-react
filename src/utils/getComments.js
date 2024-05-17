import axios from "axios";

export default async function getComments() {
    const response = await axios.get('http://localhost:3000/api/comments');
    return response.data.data;
}