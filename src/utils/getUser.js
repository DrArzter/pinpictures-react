import axios from 'axios';

export default async function getUser() {
    try {
        const response = await axios.get('http://localhost:3000/api/users', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}
