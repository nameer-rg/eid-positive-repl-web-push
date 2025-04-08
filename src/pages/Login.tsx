// src/pages/Login.tsx
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import FormLayout from '@/components/layouts/FormLayout';

export default function Login() {
  // Phase 'email' for sending OTP; phase 'otp' for verifying user-entered code.
  const [phase, setPhase] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Allowed emails from environment variables (comma separated)
  const allowedEmails = import.meta.env.VITE_ALLOWED_EMAILS?.split(',') || [];

  // Modal component for messages
  const Modal = ({ message, onClose }: { message: string; onClose: () => void }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <p className="text-lg font-brandonBold uppercase">{message}</p>
        <button onClick={onClose} className="mt-4 w-full bg-primary rounded-full text-white py-2">
          Close
        </button>
      </div>
    </div>
  );

  // Phase 1: Send OTP to the user's email.
  const handleSendOtp = async (e: React.FormEvent) => {
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
    // Send the OTP. Note: By default, Supabase will send an OTP if the email template includes {{ .Token }}.
    const { error } = await supabase.auth.signInWithOtp({
      email: normalizedEmail,
      options: {
        shouldCreateUser: false, // set false if you want to prevent auto sign-up.
        // For OTP flows, you typically don't redirect immediately.
        emailRedirectTo: "", 
      },
    });
    if (error) {
      setError(error.message);
      setModalMessage(error.message);
      setShowModal(true);
    } else {
      setModalMessage("OTP sent! Please check your email for the 6-digit code.");
      setShowModal(true);
      setPhase("otp");
    }
    setLoading(false);
  };

  // Phase 2: Verify the OTP code and log the user in.
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const normalizedEmail = email.trim().toLowerCase();
    const { data, error } = await supabase.auth.verifyOtp({
      email: normalizedEmail,
      token: otp,
      type: 'email',
    });
    if (error) {
      setError(error.message);
      setModalMessage(error.message);
      setShowModal(true);
    } else {
      // Successful OTP verification returns a session.
      localStorage.setItem("authenticated", "true");
      navigate("/dashboard");
    }
    setLoading(false);
  };

  return (
    <FormLayout>
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="mt-24 p-6 max-w-md w-full bg-black text-white rounded shadow-md">
          {phase === 'email' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <h1 className="text-xl font-brandonBold uppercase mb-4">Admin Login</h1>
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
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <h1 className="text-xl font-brandonBold uppercase mb-4">Enter OTP</h1>
              <input
                type="text"
                placeholder="Enter the 6-digit code"
                className="w-full p-2 border rounded text-black"
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full text-white py-2 bg-primary hover:bg-gray-700"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}
        </div>
      </div>
      {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}
    </FormLayout>
  );
}
