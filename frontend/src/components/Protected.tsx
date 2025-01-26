import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../utils/context/AuthContext';
import { jwtDecode } from 'jwt-decode';

interface ProtectedProps{
    children: JSX.Element
}

const Protected = ({ children }: ProtectedProps): JSX.Element => {
  const { token, logout } = useAuth();

  useEffect(() => {
    if (token) {
      try {
        const decodedToken: { exp: number } = jwtDecode(token.AccessToken)
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime) {
          logout();
        }
        
      } catch (error) {
        logout();
      }
    } else {
      logout();
    }
  }, [token, logout]);

  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}
export default Protected