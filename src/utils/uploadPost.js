import axios from 'axios';
import Cookies from 'js-cookie';
import config from './config';

const getUploadPostUrl = () => {
  return `${config.apiUrl}/posts`;
};

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
  images.forEach((image, index) => {
    formData.append('images', image);
  });
  return formData;
};

export default async function uploadPost(title, description, images, author) {
  if (!validateInputs(title, description, images)) {
    console.error('Error during post creation: Missing required fields or too many images');
    return;
  }

  const formData = createFormData(title, description, images);

  try {
    const response = await axios.post(getUploadPostUrl(), formData, {
      headers: getHeaders()
    });
    response.data.author = author;
    response.data.comments = [];
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error during post creation:', error);
    throw error;
  }
}