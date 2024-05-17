import axios from "axios";

export default async function Login(username, password) {
    try {
        const response = await axios.post('http://localhost:3000/api/users/login', {
            name: username,
            password: password
        });
        const token = response.data.token;
        if (token) {
            localStorage.setItem('token', token);
        }
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        alert('Error during login. Please try again.');
        throw error;
    }
}
