import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Ensure proper import
import '../components/Dashboard/dash.css';
const Dashboard = () => {
  const [transformedData, setTransformedData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/transformed-data');
        if (response && response.data) {
          setTransformedData(response.data);
        } else {
          throw new Error('Transformed data not found');
        }
      } catch (error) {
        console.error('Error fetching transformed data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="dashboard-content">
          {transformedData ? (
            <div className="chart-container">
              <h2 className="chart-title">Line Chart for Category Counts</h2>
              <Line
                data={{
                  labels: transformedData.categories.map(category => category.name),
                  datasets: [{
                    label: 'Course Counts',
                    data: transformedData.categories.map(category =>
                      transformedData.courses.filter(course => course.category === category.id).length
                    ),
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                  }]
                }}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </div>
          ) : (
            <p>No transformed data available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
