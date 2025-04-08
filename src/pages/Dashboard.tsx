import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import FormLayout from '@/components/layouts/FormLayout';
import { X, LogOut } from 'lucide-react'; // Added icon imports

export default function Dashboard() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [ticketToDelete, setTicketToDelete] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
1
  // Logout Modal component (unchanged)
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

  // Rest of the code remains the same until return...

  return (
    <FormLayout>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-6xl text-white font-alternate">Support Tickets</h1>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="bg-primary text-white px-4 py-1 rounded hover:bg-gray-700 font-brandonBold uppercase transition-colors"
          >
            <LogOut className="h-5 w-5" /> {/* Icon replaced */}
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : tickets.length === 0 ? (
          <p>No tickets found.</p>
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
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  <X className="h-4 w-4" /> {/* Icon replaced */}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Rest of the code remains unchanged */}
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