import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [ticketToDelete, setTicketToDelete] = useState<string | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to log out the user
  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('authenticated');
    navigate('/login');
  };

  // Fetch tickets from Supabase
  const fetchTickets = async () => {
    const { data, error } = await supabase
      .from('customer_service')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tickets:', error.message);
    } else {
      setTickets(data || []);
    }
    setLoading(false);
  };

  // Check session on component mount
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      const allowedEmails =
        import.meta.env.VITE_ALLOWED_EMAILS?.split(',') || [];

      if (user) {
        if (allowedEmails.includes(user.email)) {
          localStorage.setItem('authenticated', 'true');
          fetchTickets();
        } else {
          await supabase.auth.signOut();
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    checkSession();
  }, [navigate]);

  // Auto logout after 3 hours (10,800,000 ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      handleLogout();
    }, 10800000);
    return () => clearTimeout(timer);
  }, [navigate]);

  // Delete a ticket by id
  const deleteTicket = async (ticketId: string) => {
    const { error } = await supabase
      .from('customer_service')
      .delete()
      .eq('id', ticketId);
    if (error) {
      console.error('Error deleting ticket:', error.message);
      setError('Failed to delete ticket.');
    } else {
      setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
      setError('');
    }
    setTicketToDelete(null); // close the modal
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
          {tickets.map((ticket) => (
            <li
              key={ticket.id}
              className="p-4 border rounded bg-white shadow-sm flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p><strong>Name:</strong> {ticket.name}</p>
                <p><strong>Email:</strong> {ticket.email}</p>
                <p><strong>Subject:</strong> {ticket.subject}</p>
                <p><strong>Message:</strong> {ticket.message}</p>
              </div>
              <button
                onClick={() => setTicketToDelete(ticket.id)}
                className="mt-2 md:mt-0 bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Custom confirmation modal */}
      {ticketToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this ticket?</p>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setTicketToDelete(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteTicket(ticketToDelete)}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
