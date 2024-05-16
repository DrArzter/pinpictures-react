import axios from "axios";
import * as utils from './index';

export  default async function Login(username, password) {
    try {
        const response = await axios.post('http://localhost:3000/api/users', {
            type: 'login',
            name: username,
            password: utils.hashPassword(password)
        });
        const token = response.data.token;
        if (token) {
            localStorage.setItem('token', token);
            const userResponse = await axios.get('http://localhost:3000/api/users', {
                headers: {
                    'Authorization': token
                }
            });
            return userResponse.data.data;
        } else {
            console.error('Token not found in response');
            return null;
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Error during login. Please try again.');
        throw error;
}

}
