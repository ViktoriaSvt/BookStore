import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getTrackingData } from '../../api/state-requests';
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {

  const [chartRequestData, setChartRequestData] = useState({
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

  const fetchTrackingData = async () => {

    const data = await getTrackingData();

    const labels = [...new Set([
      ...data.requestFails.map(item => item.errorType),
      ...data.querySlowLoading.map(item => item.errorType),
    ])];


    const requestFails = labels.map(errorType =>
      data.requestFails.find(item => item.errorType === errorType)?.count || 0
    );
    const querySlowLoading = labels.map(errorType =>
      data.querySlowLoading.find(item => item.errorType === errorType)?.count || 0
    );

    setChartRequestData({
      labels,
      datasets: [
        {
          label: 'Failed Requests',
          data: requestFails,
          backgroundColor: 'rgba(255, 99, 132, 0.8)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1,
        }
      ],
    });

    setChartQueryData({
      labels,
      datasets: [
        {
          label: 'Slow Query Runtimes',
          data: querySlowLoading,
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1,
        },
      ],
    });

  };

  useEffect(() => {
    fetchTrackingData();
    const interval = setInterval(fetchTrackingData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center p-4 max-w-4xl mx-auto">
      <div className="w-full p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-semibold mb-4">
          Admin Dashboard - Request Failures and Slow Queries
        </h2>
        <Bar
          data={chartRequestData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Server issues breakdown',
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) =>
                    `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Error Type',
                },
                barPercentage: 0.5,
                categoryPercentage: 0.5,
              },
              y: {
                title: {
                  display: true,
                  text: 'Count',
                },
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
                    `${tooltipItem.dataset.label}: ${tooltipItem.raw}`, // Customize tooltip to show label and value
                },
              },
            },

            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Query Type',
                },
                barPercentage: 0.5,
                categoryPercentage: 0.5,
              },
              y: {
                title: {
                  display: true,
                  text: 'Count',
                },
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
