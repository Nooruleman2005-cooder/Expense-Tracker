import { useEffect } from 'react';
import { auth } from '../firebaseconfig.js';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AuthWrapper = () => {
  const navigate = useNavigate();

  useEffect(() => {
    signOut(auth).then(() => {
      navigate('/login');
    });
  }, [navigate]);

  return null;
};

export default AuthWrapper;
