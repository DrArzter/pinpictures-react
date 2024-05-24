import axios from 'axios';
import Cookies from 'js-cookie';
import config from './config';

export default async function getUser() {
    try {
        if (!Cookies.get('token')) {
            return null;
        }
        const response = await axios.get(`${config.apiUrl}/users`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });
        console.log(response.data[0]);
        return response.data[0];
    } catch (error) {
        return null;
    }
}
