import axios from 'axios';
import config from './config';

export default async function getPosts() {
    const response = await axios.get(`${config.apiUrl}/posts`);
    return response.data;
}