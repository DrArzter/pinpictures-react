import axios from 'axios';
import config from './config';

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
  const formData = createFormData(title, description, images);

  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  try {
    const response = await axios.post(
      `${config.apiUrl}/posts`,
      formData,
      {
        headers,
        withCredentials: true,
      });

    response.data.author = author;
    response.data.comments = [];

    return response.data;

  } catch (error) {
    console.error('Error uploading post:', error);
    throw error;
  }
}
