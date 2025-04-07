// src/components/PrivateRoute.tsx
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = localStorage.getItem('authenticated') === 'true';
  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
