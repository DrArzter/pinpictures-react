
import Cookies from 'js-cookie';

export default function getAuthToken(){
  const token = Cookies.get('token');
  return token ? `Bearer ${token}` : null;
};
