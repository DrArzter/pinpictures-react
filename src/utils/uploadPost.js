import axios from "axios";

export default async function uploadPost() {
    const response = await axios.post('http://localhost:3000/api/posts', {
        type: 'createPost',
    });
    return response.data.data;
}