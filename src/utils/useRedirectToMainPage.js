import { useNavigate } from 'react-router-dom';

const MAIN_PAGE_ROUTE = '/';

export default function useRedirectToMainPage() {
  const navigate = useNavigate();

  const redirectToMainPage = () => {
    navigate(MAIN_PAGE_ROUTE);
  };

  return redirectToMainPage;
}
