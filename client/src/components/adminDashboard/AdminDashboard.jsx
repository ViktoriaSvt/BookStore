import { useEffect, useState } from 'react';
import { getTrackingData } from '../../api/state-requests'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useGetUsers } from '../../hooks/useUserHooks';
import { demote, getAllUsers, promote } from '../../api/user-requests';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [view, setView] = useState('charts'); 
  let [users, setUsers] = useGetUsers();

  const demoteHandler = async (id) => {
    await demote(id)
    setUsers(await getAllUsers());
  }

  const promoteHandler = async (id) => {
    await promote(id)
    setUsers(await getAllUsers());
  }

  // const data = {
  //   labels: labels,
  //   datasets: [{
  //     label: 'My First Dataset',
  //     data: [65, 59, 80, 81, 56, 55, 40],
  //     backgroundColor: [
  //       'rgba(255, 99, 132, 0.2)',
  //       'rgba(255, 159, 64, 0.2)',
  //       'rgba(255, 205, 86, 0.2)',
  //       'rgba(75, 192, 192, 0.2)',
  //       'rgba(54, 162, 235, 0.2)',
  //       'rgba(153, 102, 255, 0.2)',
  //       'rgba(201, 203, 207, 0.2)'
  //     ],
  //     borderColor: [
  //       'rgb(255, 99, 132)',
  //       'rgb(255, 159, 64)',
  //       'rgb(255, 205, 86)',
  //       'rgb(75, 192, 192)',
  //       'rgb(54, 162, 235)',
  //       'rgb(153, 102, 255)',
  //       'rgb(201, 203, 207)'
  //     ],
  //     borderWidth: 1
  //   }]
  // };


  const [chartRequestData, setChartRequestData] = useState({
    labels: [56, 456, 66], //make empty once using the api
    datasets: [{
      label: 'Failed requests',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)'
      ],
      borderWidth: 1
    }]
  });

  const [chartQueryData, setChartQueryData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Failed Requests',
        data: [],
        backgroundColor: 'rgba(199, 13, 0, 0.8)',
        borderColor: 'rgb(189, 33, 6)',
        borderWidth: 1,
      },
      {
        label: 'Slow Query Runtimes',
        data: [],
        backgroundColor: 'rgba(0, 150, 250, 0.8)',
        borderColor: 'rgb(0, 183, 255)',
        borderWidth: 1,
      },
    ],
  });

  users = users || [];



  // const fetchTrackingData = async () => {

  //   const data = await getTrackingData();

  //   const labels = [...new Set([
  //     ...data.requestFails.map(item => item.errorType),
  //     ...data.querySlowLoading.map(item => item.errorType),
  //   ])];


  //   const requestFails = labels.map(errorType =>
  //     data.requestFails.find(item => item.errorType === errorType)?.count || 0
  //   );
  //   const querySlowLoading = labels.map(errorType =>
  //     data.querySlowLoading.find(item => item.errorType === errorType)?.count || 0
  //   );

  //   setChartRequestData({
  //     labels,
  //     datasets: [
  //       {
  //         label: 'Failed Requests',
  //         data: requestFails,
  //         backgroundColor: 'rgba(255, 99, 132, 0.8)',
  //         borderColor: 'rgb(255, 99, 132)',
  //         borderWidth: 1,
  //       }
  //     ],
  //   });

  //   setChartQueryData({
  //     labels,
  //     datasets: [
  //       {
  //         label: 'Slow Query Runtimes',
  //         data: querySlowLoading,
  //         backgroundColor: 'rgba(54, 162, 235, 0.8)',
  //         borderColor: 'rgb(54, 162, 235)',
  //         borderWidth: 1,
  //       },
  //     ],
  //   });

  // };

  // useEffect(() => {
  //   fetchTrackingData();
  //   const interval = setInterval(fetchTrackingData, 60000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="flex flex-col items-center p-4 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Buttons for toggling views */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setView('charts')}
          className="px-6 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition"
        >
          View Charts
        </button>
        <button
          onClick={() => setView('users')}
          className="px-6 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition"
        >
          View Users
        </button>
      </div>

      {view === 'charts' && (
        <div className="w-full space-y-6">
          <h2 className="text-center text-2xl font-semibold mb-4">Admin Dashboard - Request Failures and Slow Queries</h2>
          <Bar
            data={chartRequestData}
            options={{
              responsive: true,
              plugins: {
                title: { display: true, text: 'Server issues breakdown' },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) =>
                      `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
                  },
                },
              },
              scales: {
                x: {
                  title: { display: true, text: 'Error Type' },
                  barPercentage: 0.5,
                  categoryPercentage: 0.5,
                },
                y: {
                  title: { display: true, text: 'Count' },
                  beginAtZero: true,
                },
              },
            }}
          />
          <Bar
            data={chartQueryData}
            options={{
              responsive: true,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) =>
                      `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
                  },
                },
              },
              scales: {
                x: {
                  title: { display: true, text: 'Query Type' },
                  barPercentage: 0.5,
                  categoryPercentage: 0.5,
                },
                y: {
                  title: { display: true, text: 'Count' },
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      )}

      {/* Users List View */}
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
