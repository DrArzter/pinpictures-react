import axios from 'axios';
import { useState, useEffect } from 'react';

export default async function getUser() {
    const response = await axios.get('http://localhost:3000/api/user');
    return response.data;
}