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

  // Modal component (keep as-is)

  useEffect(() => {
    const handleTokenExchange = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');

      if (accessToken && refreshToken) {
        try {
          // 🔑 Force session update and wait for it to resolve
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) throw error;

          // 🚨 Clear URL hash *immediately* after success
          window.history.replaceState({}, document.title, window.location.pathname);

          // 🔄 Re-check session after a slight delay
          await new Promise(resolve => setTimeout(resolve, 500));
          const { data: { session } } = await supabase.auth.getSession();

          if (session?.user && allowedEmails.includes(session.user.email!)) {
            localStorage.setItem("authenticated", "true");
            navigate("/dashboard", { replace: true }); // Force replace
          }
        } catch (err) {
          setModalMessage("Login link expired or invalid.");
          setShowModal(true);
          await supabase.auth.signOut();
          localStorage.removeItem("authenticated");
        }
      } else {
        // 🛠️ Fallback: Check existing session
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user && allowedEmails.includes(session.user.email!)) {
          navigate("/dashboard", { replace: true });
        }
      }
    };

    handleTokenExchange();
  }, [navigate, allowedEmails]);

  // Rest of the file (keep handleLogin and return as-is)
}