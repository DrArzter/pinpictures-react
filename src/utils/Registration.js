import axios from "axios";

import * as utils from './index';
import { json } from "react-router-dom";

export default async function Registration(username, email, password) {
    
    if (!username || !email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    try {
        const response = await axios.post('http://localhost:3000/api/users', {
            type: 'register',
            name: username,
            email: email,
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
            return (userResponse.data.data);
        } else {
            console.error('Token not found in response');
        }
    } catch (error) {
        console.error('Invalid username or password', error);
        alert('Invalid username or password');
    }
}