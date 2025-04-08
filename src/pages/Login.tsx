// src/pages/Login.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import FormLayout from '@/components/layouts/FormLayout';

export default function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const allowedEmails = import.meta.env.VITE_ALLOWED_EMAILS?.split(',') || [];

  // ... (keep Modal component unchanged)

  useEffect(() => {
    const handleTokenExchange = async () => {
      try {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');

        // 1. Handle token exchange
        if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error) throw error;
          window.history.replaceState({}, document.title, window.location.pathname);
        }

        // 2. Validate session
        const { data: { session } } = await supabase.auth.getSession();

        // 3. Safer email check
        const userEmail = session?.user?.email?.toLowerCase().trim();
        if (userEmail && allowedEmails.includes(userEmail)) {
          localStorage.setItem("authenticated", "true");
          navigate("/dashboard", { replace: true });
        } else {
          localStorage.removeItem("authenticated");
          await supabase.auth.signOut();
        }

      } catch (err) {
        console.error("Login error:", err);
        setModalMessage("Authentication failed. Please try again.");
        setShowModal(true);
        await supabase.auth.signOut();
        localStorage.removeItem("authenticated");
      }
    };

    handleTokenExchange();
  }, [navigate, allowedEmails]);

  // ... (keep handleLogin and return unchanged)
}