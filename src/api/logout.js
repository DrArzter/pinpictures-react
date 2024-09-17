import Cookies from 'js-cookie';

const clearAuthToken = () => {
  Cookies.remove('token');
};

export default function logout(setUser) {
  try {
    if (!Cookies.get('token')) {
      console.warn('No token found, user might already be logged out.');
      return;
    }

    clearAuthToken();
    setUser(null);
    console.log('User successfully logged out.');
  } catch (error) {
    console.error('Error during logout:', error);
  }
}
