// src/components/PrivateRoute.tsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [isValidSession, setIsValidSession] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      // 🔄 Listen for auth state changes (critical!)
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        const isAuth = session?.user && localStorage.getItem("authenticated") === "true";
        setIsValidSession(!!isAuth);
        setLoading(false);
      });

      // Initial check
      const { data: { session } } = await supabase.auth.getSession();
      setIsValidSession(!!(session?.user && localStorage.getItem("authenticated") === "true"));
      setLoading(false);

      return () => subscription?.unsubscribe();
    };

    validateSession();
  }, []);

  if (loading) return <div>Loading...</div>;
  return isValidSession ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;