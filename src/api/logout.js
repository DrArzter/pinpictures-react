import Cookies from 'js-cookie';

export default function logout(setUser) {
  try {
    Cookies.remove('token');
    window.location.reload();
    setUser(null);
  } catch (error) {
    
  }
}