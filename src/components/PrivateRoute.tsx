// src/components/PrivateRoute.tsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [isValidSession, setIsValidSession] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const isAuth = session?.user && localStorage.getItem("authenticated") === "true";
      setIsValidSession(!!isAuth);
      setLoading(false);
    };

    validateSession();
  }, []);

  if (loading) return <div>Loading...</div>; // Add a loading state
  return isValidSession ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;