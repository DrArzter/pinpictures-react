import axios from "axios";
import getUser from "./getUser";

export default async function Registration(username, email, password) {
    if (!username || !email || !password) {
        alert('Please fill in all fields');
        return;
    }
    try {
        const response = await axios.post('http://localhost:3000/api/users/register', {
            name: username,
            email: email,
            password: password
        });
        const token = response.data.token;
        if (token) {
            localStorage.setItem('token', token);
        }
        return response.data;
    } catch (error) {
        console.error('Error during registration:', error);
        alert('Error during registration. Please try again.');
        throw error;
    }
}