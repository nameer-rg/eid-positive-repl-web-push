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

  const Modal = ({ message, onClose }: { message: string; onClose: () => void }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <p className="text-lg font-brandonBold uppercase">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-primary rounded-full text-white py-2"
        >
          Close
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    const handleTokenExchange = async () => {
      try {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');

        if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error) throw error;
          window.history.replaceState({}, document.title, window.location.pathname);
        }

        const { data: { session } } = await supabase.auth.getSession();
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const normalizedEmail = email.trim().toLowerCase();

    if (!allowedEmails.includes(normalizedEmail)) {
      setModalMessage("Unauthorized email.");
      setShowModal(true);
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: normalizedEmail,
        options: { emailRedirectTo: `${window.location.origin}/dashboard` },
      });
      if (error) throw error;
      setModalMessage("Check your email for the login link!");
    } catch (err) {
      setModalMessage(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
      setShowModal(true);
    }
  };

  return (
    <FormLayout>
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-black rounded-lg shadow-xl">
          <div className="p-8 space-y-6">
            <h1 className="text-2xl font-bold text-white text-center">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-medium transition-colors disabled:opacity-50"
              >
                {loading ? "Sending link..." : "Confirm Email"}
              </button>
            </form>
          </div>
        </div>
      </div>
      {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}
    </FormLayout>
  );
}