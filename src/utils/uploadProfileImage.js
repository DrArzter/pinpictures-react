import axios from 'axios';
import Cookies from 'js-cookie';
import config from './config';

const getUploadProfileImageUrl = (userId) => {
  return `${config.apiUrl}/users/${userId}/image`;
};

const getHeaders = () => {
  const token = Cookies.get('token');
  return {
    'Content-Type': 'multipart/form-data',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

const validateImageInput = (file) => {
  return file && Cookies.get('token');
};

const createImageFormData = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return formData;
};

export default async function uploadProfileImage(file, userId) {
  if (!validateImageInput(file)) {
    console.error('Error uploading profile image: Missing required fields or token');
    return;
  }

  const formData = createImageFormData(file);

  try {
    const response = await axios.post(getUploadProfileImageUrl(userId), formData, {
      headers: getHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
}
