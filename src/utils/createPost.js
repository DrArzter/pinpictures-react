import axios from 'axios';
import Cookies from 'js-cookie';

export default async function createPost(title, description, image) {
    const formData = new FormData();
    formData.append('type', 'createPost');
    formData.append('name', title);
    formData.append('description', description);
    formData.append('image', image);
    if (title && description && image && Cookies.get('token')) {
        try {
            const response = await axios.post('http://localhost:3000/api/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
    return console.error('Error during post creation');
}