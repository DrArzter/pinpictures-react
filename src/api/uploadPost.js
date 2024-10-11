import axios from 'axios';
import Cookies from 'js-cookie';

import config from './config';

const getHeaders = () => {
  const token = Cookies.get('token');
  return {
    'Content-Type': 'multipart/form-data',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

const validateInputs = (title, description, images) => {
  return title && description && images.length > 0 && images.length <= 10 && Cookies.get('token');
};

const createFormData = (title, description, images) => {
  const formData = new FormData();
  formData.append('name', title);
  formData.append('description', description);
  images.forEach((image) => {
    formData.append('images', image);
  });
  return formData;
};

export default async function uploadPost(title, description, images, author) {
  if (!validateInputs(title, description, images)) {
    return;
  }

  const formData = createFormData(title, description, images);

  try {
    const response = await axios.post(`${config.apiUrl}/posts`, formData, {
      headers: getHeaders()
    });
    response.data.author = author;
    response.data.comments = [];
    return response.data;
  } catch (error) {
    throw error;
  }
}