// components/SupportForm.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import { supabase } from '../lib/supabaseClient';

interface SupportTicket {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function SupportForm() {
  const [formData, setFormData] = useState<SupportTicket>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('customer_service')
        .insert([formData]);

      if (error) throw error;

      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit form');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Subject
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Message
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 h-32"
              required
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded text-white ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>

        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        {success && (
          <div className="text-green-600 text-sm mt-2">
            ✅ Success! Your request has been submitted.
          </div>
        )}
      </form>
    </div>
  );
}
