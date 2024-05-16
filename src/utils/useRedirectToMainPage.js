import { useNavigate } from 'react-router-dom';

export default function useRedirectToMainPage() {

    const navigate = useNavigate();

    return () => {
        navigate('/');
    };
};