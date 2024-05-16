import axios from 'axios';
import { useState, useEffect } from 'react';

export default async function getPosts() {
    const response = await axios.get('http://localhost:3000/api/posts');
    return response.data;
}