import axios from "axios";
import { useState, useEffect } from 'react';

import * as utils from './index';

export default async function Login(username, password, setUser) {
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
            setUser(userResponse.data.data);
            utils.RedirectToMainPage();
        } else {
            console.error('Token not found in response');
        }
    } catch (error) {
        console.error('Invalid username or password', error);
        alert('Invalid username or password');
    }
}    