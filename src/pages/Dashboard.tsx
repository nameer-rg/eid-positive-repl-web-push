import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import FormLayout from '@/components/layouts/FormLayout';

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
        <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
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
            className="px-4 py-2 bg-red-600 text-white rounded"
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

  // Rest of your existing code remains the same until return statement...

  return (
    <FormLayout>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Support Tickets</h1>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Existing content remains the same */}

        {/* Delete Ticket Modal */}
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

        {/* Logout Confirmation Modal */}
        {showLogoutModal && <LogoutModal />}
      </div>
    </FormLayout>
  );
}