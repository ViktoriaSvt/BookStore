import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useGetUsers } from '../../hooks/useUserHooks';
import { demote, getAllUsers, promote } from '../../api/user-requests';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [view, setView] = useState('users'); 
  let [users, setUsers] = useGetUsers();

  const demoteHandler = async (id) => {
    await demote(id)
    setUsers(await getAllUsers());
  }

  const promoteHandler = async (id) => {
    await promote(id)
    setUsers(await getAllUsers());
  }


  users = users || [];


  return (
    <div className="flex flex-col items-center p-4 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Buttons for toggling views */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setView('users')}
          className="px-6 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition"
        >
          View Users
        </button>
      </div>

      {view === 'users' && (
        <div className="w-full space-y-4">
          <h2 className="text-center text-2xl font-semibold mb-4">Users List</h2>
          <div className="space-y-2">
            {users.map((user) => (
              <div key={user.email} className="flex justify-between items-center p-4 bg-blue-50 rounded-lg shadow-md">
                <div>
                  <h3 className="font-semibold text-blue-600">{user.username}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                {
                  user.role === 'USER' ? (
                    <button
                      className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition"
                      onClick={() => promoteHandler(user.id)}
                    >
                      Promote
                    </button>
                  ) : (
                    <button
                      className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
                      onClick={() => demoteHandler(user.id)}
                    >
                      Demote
                    </button>
                  )
                }
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
