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

  // Check session on page load (after magic link redirect)
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log("Session data:", data, error);  // Log session data
      const user = data?.session?.user;

      if (user) {
        console.log("User is signed in:", user);
        if (allowedEmails.includes(user.email)) {
          localStorage.setItem('authenticated', 'true');
          navigate('/dashboard');
        } else {
          setModalMessage('This Email is Not Authorized.');
          setShowModal(true);
          await supabase.auth.signOut();
        }
      } else {
        console.log("No active session found.");
      }
    };

    checkSession();
  }, [navigate, allowedEmails]);

  // Handle login: check allowed emails before sending magic link
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const normalizedEmail = email.trim().toLowerCase();
    if (!allowedEmails.includes(normalizedEmail)) {
      setModalMessage('This email is not authorized.');
      setShowModal(true);
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: normalizedEmail,
      options: {
        emailRedirectTo: 'https://positive-travel-and-holidays.vercel.app/dashboard',
      },
    });

    if (error) {
      setError(error.message);
      setModalMessage(error.message);
      setShowModal(true);
    } else {
      setModalMessage('Please Check Your Email');
      setShowModal(true);
    }

    setLoading(false);
  };

  return (
    <FormLayout>
      {/* Wrap content in a full-black container */}
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
              {loading ? 'Confirming...' : 'Confirm Email'}
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </div>
      {showModal && (
        <Modal message={modalMessage} onClose={() => setShowModal(false)} />
      )}
    </FormLayout>
  );
}

//console log