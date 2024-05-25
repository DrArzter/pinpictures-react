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

const validateInputs = (title, description, image) => {
  return title && description && image && Cookies.get('token');
};

const createFormData = (title, description, image) => {
  const formData = new FormData();
  formData.append('type', 'createPost');
  formData.append('name', title);
  formData.append('description', description);
  formData.append('image', image);
  return formData;
};

export default async function uploadPost(title, description, image, author) {
  if (!validateInputs(title, description, image)) {
    console.error('Error during post creation: Missing required fields');
    return;
  }

  const formData = createFormData(title, description, image);
  
  try {
    const response = await axios.post(getUploadPostUrl(), formData, {
      headers: getHeaders()
    });
    response.data.author = author;
    return response.data;
  } catch (error) {
    console.error('Error during post creation:', error);
    throw error;
  }
}
