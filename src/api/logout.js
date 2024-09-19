import Cookies from 'js-cookie';

const clearAuthToken = () => {
  Cookies.remove('token');
};

export default function logout(setUser) {
  try {
    const token = Cookies.get('token');

    if (!token) {
      console.warn('No token found, user might already be logged out.');
      return;
    }

    clearAuthToken();
    
    window.location.reload();
    
    setUser(null);
  } catch (error) {
    
  }
}