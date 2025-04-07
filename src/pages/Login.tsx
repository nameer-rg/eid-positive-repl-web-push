import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const allowedEmails = import.meta.env.VITE_ALLOWED_EMAILS?.split(',') || [];

  // ✅ Check session on page load (after magic link redirect)
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;

      if (user) {
        if (allowedEmails.includes(user.email)) {
          localStorage.setItem('authenticated', 'true');
          navigate('/dashboard');
        } else {
          setError('❌ This email is not authorized.');
          await supabase.auth.signOut(); // Block unauthorized user
        }
      }
    };

    checkSession();
  }, [navigate]);

  // ✅ Send Supabase Magic Link
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'https://positive-travel-and-holidays.vercel.app/login',
      },
    });

    if (error) {
      setError(error.message);
    } else {
      alert('✅ Magic link sent! Check your inbox.');
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? 'Sending...' : 'Send Magic Link'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
