import axios from "axios";
import Cookies from 'js-cookie';

export default async function getChatById(id) {
    const response = await axios.get(`http://localhost:3000/api/chats/${id}`, {
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
        }
    }
    );
    console.log(response.data);
    return response.data;
}