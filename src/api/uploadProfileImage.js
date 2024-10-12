import axios from 'axios';
import config from './config';

const createImageFormData = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return formData;
};

export default async function uploadProfileImage(file, userId) {

  const formData = createImageFormData(file);
  const headers = {
    'Content-Type': 'multipart/form-data'
  };

  try {
    const response = await axios.post(
      `${config.apiUrl}/users/${userId}/image`,
      formData,
      {
        headers: headers,
        withCredentials: true
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
}
