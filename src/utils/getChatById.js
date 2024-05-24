import axios from "axios";
import Cookies from 'js-cookie';
import config from './config';

export default async function getChatById(id) {
    const response = await axios.get(`${config.apiUrl}/chats/${id}`, {
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
        }
    }
    );
    console.log(response.data);
    return response.data;
}