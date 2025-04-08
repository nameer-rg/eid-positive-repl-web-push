// src/pages/Login.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import FormLayout from '@/components/layouts/FormLayout';

export default function Login() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Allowed emails from env variable (comma separated)
  const allowedEmails = import.meta.env.VITE_ALLOWED_EMAILS?.split(',') || [];

  // Modal component for showing messages
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

  // Critical Fix: Handle OTP/magic link token from URL hash
  useEffect(() => {
    const handleAuth = async () => {
      // Extract token from URL hash (e.g., #access_token=...)
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');

      if (accessToken && refreshToken) {
        // Set the session manually
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (!error) {
          // Clear the URL hash after processing
          window.location.hash = '';
        }
      }

      // Check session after token handling
      const { data: { session }, error } = await supabase.auth.getSession();

      if (session?.user && allowedEmails.includes(session.user.email!)) {
        localStorage.setItem("authenticated", "true");
        navigate("/dashboard");
      } else if (error) {
        setModalMessage(`Error: ${error.message}`);
        setShowModal(true);
        await supabase.auth.signOut();
      }
    };

    handleAuth();
  }, [navigate, allowedEmails]);

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const normalizedEmail = email.trim().toLowerCase();
    if (!allowedEmails.includes(normalizedEmail)) {
      setModalMessage("This email is not authorized.");
      setShowModal(true);
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: normalizedEmail,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
      setModalMessage(error.message);
      setShowModal(true);
    } else {
      setModalMessage("Check your email for the login link!");
      setShowModal(true);
    }
    setLoading(false);
  };

  return (
    <FormLayout>
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="mt-24 p-6 max-w-md w-full bg-black text-white rounded shadow-md">
          <h1 className="text-xl font-brandonBold uppercase mb-4">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded text-black"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full text-white py-2 bg-primary hover:bg-gray-700"
            >
              {loading ? "Sending link..." : "Confirm Email"}
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </div>
      {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}
    </FormLayout>
  );
}