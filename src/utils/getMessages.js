import axios from "axios";
import Cookies from 'js-cookie';
import config from './config';

export default async function getMessages(id) {
    const response = await axios.get(`${config.apiUrl}/chats/messages/${id}`, {
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
        }

    }
    );
    return response.data;
}