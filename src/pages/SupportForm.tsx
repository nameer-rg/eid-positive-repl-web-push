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
  const [showForm, setShowForm] = useState(false);

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

  const Modal = ({ message, onClose }: { message: string; onClose: () => void }) => (
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
      <div className="min-h-screen bg-black relative flex flex-col">
        {/* Header Section - shown only when form is hidden */}
        {!showForm && (
          <div className="absolute top-40 w-full px-4 text-center z-50">
            <h1 className="font-alternate text-white text-6xl sm:text-5xl inline-block whitespace-nowrap">
              Customer Support
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-md mx-auto leading-relaxed">
              Reach out to our dedicated support team for personalized assistance
            </p>
          </div>
        )}

        {!showForm ? (
          // Landing Page Content
          <div className="flex-grow flex items-center justify-center">
            <div className="text-center">
              <button
                onClick={() => setShowForm(true)}
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary hover:bg-gray-700 text-white px-4 py-4 rounded-full text-lg font-brandonBold uppercase transition-colors mt-20"
              >
                Fill Support Form
              </button>
            </div>
          </div>
        ) : (
          // Form Content
          <div className="flex-grow flex items-center justify-center px-4">
            <div className="max-w-md w-full">
              <div className="text-center mb-4">
                <h2 className="text-3xl font-alternate text-white mb-6 mt-10">
                  Support Request Form
                </h2>
                <p className="text-gray-300">
                  Please fill in the details below and our team will respond within 24 hours
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 bg-black p-6 rounded shadow-md">
                <div>
                  <label className="block text-sm font-brandonBold uppercase mb-1 text-white">
                    Name
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Your Full Name"
                      className="w-full p-2 border rounded mt-1 text-black placeholder:font-sans"
                      required
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-brandonBold uppercase mb-1 text-white">
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
                  <label className="block text-sm font-brandonBold uppercase mb-1 text-white">
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
                  <label className="block text-sm font-brandonBold uppercase mb-1 text-white">
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
          </div>
        )}

        {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}
      </div>
    </FormLayout>
  );
}
