// src/components/PrivateRoute.tsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [isValidSession, setIsValidSession] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const storedAuth = localStorage.getItem("authenticated") === "true";
        const userEmail = session?.user?.email?.toLowerCase().trim();
        const allowedEmails = import.meta.env.VITE_ALLOWED_EMAILS?.split(',') || [];

        setIsValidSession(
          !!session?.user && 
          storedAuth && 
          !!userEmail &&
          allowedEmails.includes(userEmail)
        );
      } catch (error) {
        console.error("Session check failed:", error);
        setIsValidSession(false);
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  return isValidSession ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;