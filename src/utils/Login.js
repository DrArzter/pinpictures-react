import axios from "axios";
import Cookies from 'js-cookie';

export default async function Login(username, password) {
    try {
        const response = await axios.post('http://localhost:3000/api/users/login', {
            name: username,
            password: password
        });
        const token = response.data.token;
        if (token) {
            Cookies.set('token', token);
        }
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        alert('Error during login. Please try again.');
        throw error;
    }
}
