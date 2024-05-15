import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie, Scatter, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import '../components/Dashboard/dash.css';
import NavBar from '../components/Header/Header';

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
      <NavBar />
      <h1 className="dashboard-title">Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="dashboard-content">
          {transformedData ? (
            <>
              <div className="chart-container">
                <h2 className="chart-title">Bar Chart for Category Counts</h2>
                <Bar
                  data={{
                    labels: transformedData.categories.map(category => category.name),
                    datasets: [{
                      label: 'Course Counts',
                      data: transformedData.categories.map(category =>
                        transformedData.courses.filter(course => course.category === category.id).length
                      ),
                      backgroundColor: 'rgba(75, 192, 192, 0.2)',
                      borderColor: 'rgba(75, 192, 192, 1)',
                      borderWidth: 1
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
              <div className="chart-container">
                <h2 className="chart-title">Pie Chart for Courses by Category</h2>
                <Pie
                  className='pie-chart'
                  data={{
                    labels: transformedData.categories.map(category => category.name),
                    datasets: [{
                      label: 'Courses',
                      data: transformedData.categories.map(category =>
                        transformedData.courses.filter(course => course.category === category.id).length
                      ),
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)'
                      ],
                      borderWidth: 1
                    }]
                  }}
                />
              </div>
              <div className="chart-container">
                <h2 className="chart-title">Scatter Plot for Comments by Course</h2>
                <Bar
                  data={{
                    datasets: [{
                      label: 'Quizzes by Course',
                      data: transformedData.quizzes.map(quiz => ({
                        x: quiz.title, // Assuming quiz ID as x-axis data
                        y: quiz.questions.length // Number of questions as y-axis data
                      })),
                      backgroundColor: 'rgba(255, 99, 132, 0.6)',
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 1
                    }]
                  }}
                  options={{
                    scales: {
                      x: {
                        type: 'category',
                        title: {
                          display: true,
                          text: 'Quiz ID'
                        }
                      },
                      y: {
                        title: {
                          display: true,
                          text: 'Number of Questions'
                        },
                        beginAtZero: true
                      }
                    }
                  }}
                />
              </div>
              <div className="chart-container">
                <h2 className="chart-title">Line Chart for Average Ratings Over Time</h2>
                <Line
                data={{
                  labels: transformedData.courses.map(course => course.title), // Use course titles as labels
                  datasets: [{
                    label: 'Average Rating',
                    data: transformedData.courses.map(course => course.averageRating), // Use average ratings as data
                    fill: false,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
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
            </>
          ) : (
            <p>No transformed data available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
