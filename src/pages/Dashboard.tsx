import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import FormLayout from '@/components/layouts/FormLayout';
import { X, LogOut } from 'lucide-react';

export default function Dashboard() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [ticketToDelete, setTicketToDelete] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Logout Modal component
  const LogoutModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-brandonBold uppercase mb-4">Confirm Logout</h2>
        <p className="mb-4">Are you sure you want to log out?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setShowLogoutModal(false)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 font-brandonBold uppercase text-white rounded"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('authenticated');
    navigate('/login');
    setShowLogoutModal(false);
  };

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

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      const allowedEmails = import.meta.env.VITE_ALLOWED_EMAILS?.split(',') || [];

      if (!user || !allowedEmails.includes(user.email)) {
        await supabase.auth.signOut();
        localStorage.removeItem('authenticated');
        navigate('/login');
        return;
      }

      localStorage.setItem('authenticated', 'true');
      fetchTickets();
    };

    checkSession();
  }, [navigate]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const setupTimer = () => {
      // Set timer for 2 minutes (120000ms) for testing
      timer = setTimeout(() => {
        handleLogout();
      }, 120000); // Change this to 10800000 for 3 hours (production)
    };

    // Reset timer on any user activity
    const resetTimer = () => {
      clearTimeout(timer);
      setupTimer();
    };

    // Event listeners for user activity
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);

    setupTimer(); // Initial timer setup

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
    };
  }, [navigate]);

  // Rest of the code remains the same...
  // Keep the deleteTicket function and return JSX as original

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
    setTicketToDelete(null);
  };

  return (
    <FormLayout>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-6xl text-white font-alternate">Support Tickets</h1>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="bg-primary text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-gray-700 font-brandonBold uppercase"
          >
            <LogOut className="h-5 w-5 inline-block align-middle" /> 
            <span className="inline-block align-middle">Logout</span>
          </button>
        </div>

        {loading ? (
          <p className="text-white">Loading...</p>
        ) : tickets.length === 0 ? (
          <p className="text-white">No tickets found.</p>
        ) : (
          <ul className="space-y-6">
            {tickets.map((ticket) => (
              <li key={ticket.id} className="space-y-2">
                <div className="p-4 border rounded bg-white shadow-sm text-black">
                  <p><strong>Name:</strong> {ticket.name}</p>
                  <p><strong>Email:</strong> {ticket.email}</p>
                  <p><strong>Subject:</strong> {ticket.subject}</p>
                  <p><strong>Message:</strong> {ticket.message}</p>
                </div>
                <button
                  onClick={() => setTicketToDelete(ticket.id)}
                  className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded flex items-center gap-1 font-brandonBold uppercase"
                >
                  <X className="h-5 w-5 inline-block align-middle" />
                  <span className="inline-block align-middle">Delete</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {ticketToDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
              <h2 className="text-xl font-brandBold uppercase mb-4">Confirm Deletion</h2>
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

        {showLogoutModal && <LogoutModal />}
      </div>
    </FormLayout>
  );
}