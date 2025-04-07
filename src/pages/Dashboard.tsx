import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;
      const allowedEmail = 'nammus2008@gmail.com';

      if (user?.email === allowedEmail || session) {
        fetchTickets();
      } else {
        navigate('/login');
      }
    };

    const fetchTickets = async () => {
      const { data, error } = await supabase
        .from('customer_service')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error('Error:', error.message);
      else setTickets(data || []);
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Support Tickets</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <ul className="space-y-4">
          {tickets.map((ticket, index) => (
            <li key={index} className="p-4 border rounded bg-white shadow-sm">
              <p><strong>Name:</strong> {ticket.name}</p>
              <p><strong>Email:</strong> {ticket.email}</p>
              <p><strong>Subject:</strong> {ticket.subject}</p>
              <p><strong>Message:</strong> {ticket.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
