import axios from 'axios';
import Cookies from 'js-cookie';
import config from './config';

export default async function getChats() {
    try {
        if (!Cookies.get('token')) {
            return null;
        }
        const response = await axios.get(`${config.apiUrl}/chats`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching chats:', error);
        return null;
    }
}
