// src/components/PrivateRoute.tsx
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = localStorage.getItem('authenticated') === 'true';

  // Additional check to prevent stale localStorage state
  const validateSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  };

  return isAuth && validateSession() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;