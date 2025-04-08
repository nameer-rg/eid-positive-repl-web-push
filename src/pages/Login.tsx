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

  // Combined session handling with retry logic
  useEffect(() => {
    const handleAuthCheck = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        setModalMessage(`Authentication error: ${error.message}`);
        setShowModal(true);
        await supabase.auth.signOut();
        return;
      }

      const user = data?.session?.user;
      if (user && allowedEmails.includes(user.email)) {
        localStorage.setItem("authenticated", "true");
        navigate("/dashboard");
      } else {
        if (window.location.hash.includes("otp_expired")) {
          setModalMessage("Token expired. Please try logging in again.");
          setShowModal(true);
        }
        await supabase.auth.signOut();
        localStorage.removeItem("authenticated");
      }
    };

    let retries = 0;
    const attemptAuthCheck = async () => {
      await handleAuthCheck();
      if (!localStorage.getItem("authenticated") && retries < 3) {
        retries++;
        setTimeout(attemptAuthCheck, 1000);
      }
    };

    attemptAuthCheck();
  }, [navigate, allowedEmails]);

  // Handle login: verify allowed email, then send magic link
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
      setModalMessage("Please Check Your Email");
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
              {loading ? "Confirming..." : "Confirm Email"}
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </div>
      {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}
    </FormLayout>
  );
}