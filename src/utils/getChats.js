import axios from 'axios';
import Cookies from 'js-cookie';

export default async function getChats() {
    try {
        if (!Cookies.get('token')) {
            return null;
        }
        const response = await axios.get('http://localhost:3000/api/chats', {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        return null;
    }
}
