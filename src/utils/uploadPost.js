import axios from 'axios';
import Cookies from 'js-cookie';

export default async function uploadPost(title, description, image, author) {
    const formData = new FormData();
    formData.append('type', 'createPost');
    formData.append('name', title);
    formData.append('description', description);
    formData.append('image', image);
    if (title && description && image && Cookies.get('token')) {
        try {
            const response = await axios.post(`${config.apiUrl}/api/posts`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            });
            response.data.author = author;
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
    return console.error('Error during post creation');
}