// src/components/SupportForm.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import { supabase } from '../lib/supabaseClient';
import FormLayout from '@/components/layouts/FormLayout';

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
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false); // New state for form visibility

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('customer_service').insert([formData]);

      if (error) throw error;

      setModalMessage('Your Request Has Been Submitted, Our Team Will Contact You Soon!');
      setShowModal(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setModalMessage(err instanceof Error ? err.message : 'Failed To Submit Form');
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const Modal = ({
    message,
    onClose,
  }: {
    message: string;
    onClose: () => void;
  }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-black">
        <p className="text-lg font-brandonBold uppercase">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-primary hover:bg-gray-700 text-white py-2 rounded-full"
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <FormLayout>
      <div className="min-h-screen bg-black flex items-center justify-center">
        {!showForm ? (
          // Landing Page Content
          <div className="text-center space-y-8">
            <h1 className="text-4xl font-alternate text-white mb-4">
              Customer Support
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Fill a form and reach out to us
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-primary hover:bg-gray-700 text-white px-8 py-3 rounded-full text-lg font-brandonBold uppercase transition-colors"
            >
              Fill a Form
            </button>
          </div>
        ) : (
          // Form Content
          <div className="mt-24 p-6 max-w-md w-full bg-black text-white rounded shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-brandonBold uppercase mb-1">
                  Name
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Your Name"
                    className="w-full p-2 border rounded mt-1 text-black placeholder:font-sans"
                    required
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-brandonBold uppercase mb-1">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email Address"
                    className="w-full p-2 border rounded mt-1 text-black placeholder:font-sans"
                    required
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-brandonBold uppercase mb-1">
                  Subject
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter Your Subject of Issue"
                    className="w-full p-2 border rounded mt-1 text-black placeholder:font-sans"
                    required
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-brandonBold uppercase mb-1">
                  Message
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter Your Issue"
                    className="w-full p-2 border rounded mt-1 h-32 text-black placeholder:font-sans"
                    required
                  />
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 rounded-full text-white ${
                  loading ? 'bg-gray-400' : 'bg-primary hover:bg-gray-700'
                }`}
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </div>
        )}
      </div>
      {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}
    </FormLayout>
  );
}