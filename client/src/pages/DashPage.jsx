import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import '../components/Dashboard/dash.css';
import NavBar from '../components/Header/Header';
import 'chartjs-adapter-date-fns';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [transformedData, setTransformedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeUnit, setTimeUnit] = useState('day'); // State to manage the time unit

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/transformed-data', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
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

  const getUserGrowthData = (users) => {
    if (!users) return [];

    const registrationDates = users.map(user => new Date(user.registrationDate));
    registrationDates.sort((a, b) => a - b);

    const growthData = registrationDates.reduce((acc, date) => {
      const formattedDate = date.toISOString().split('T')[0]; // Extract YYYY-MM-DD
      if (acc[formattedDate]) {
        acc[formattedDate]++;
      } else {
        acc[formattedDate] = 1;
      }
      return acc;
    }, {});

    const cumulativeGrowth = [];
    let cumulativeCount = 0;
    for (const [date, count] of Object.entries(growthData)) {
      cumulativeCount += count;
      cumulativeGrowth.push({ x: date, y: cumulativeCount });
    }

    return cumulativeGrowth;
  };

  const calculateCategoryPercentages = (categories, courses) => {
    const totalCourses = courses.length;
    return categories.map(category => {
      const courseCount = courses.filter(course => course.category === category.id).length;
      return (courseCount / totalCourses * 100).toFixed(1); // Convert to percentage
    });
  };

  return (
    <div className="dashboard">
      <NavBar />
      <h1 className="dashboard-title">Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
        
          <div className="card-container">
            <div className="card">
              <h2>Number of Users</h2>
              <p>{transformedData?.counts?.userCount || 'N/A'}</p>
            </div>
            <div className="card">
              <h2>Number of Courses</h2>
              <p>{transformedData?.counts?.courseCount || 'N/A'}</p>
            </div>
            <div className="card">
              <h2>Number of Categories</h2>
              <p>{transformedData?.counts?.categoryCount || 'N/A'}</p>
            </div>
          </div>

          <div className="dashboard-content">
            <div className="chart-container">
              <h2 className="chart-title">Courses by Category</h2>
              {transformedData?.categories && transformedData?.courses && (
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
              )}
            </div>
            <div className="chart-container">
              <h2 className="chart-title">Courses by Category</h2>
              {transformedData?.categories && transformedData?.courses && (
                <Pie
                  className="pie-chart"
                  data={{
                    labels: transformedData.categories.map(category => category.name),
                    datasets: [{
                      label: 'Courses',
                      data: calculateCategoryPercentages(transformedData.categories, transformedData.courses),
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
                  options={{
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                          }
                        }
                      }
                    }
                  }}
                />
              )}
            </div>
            <div className="chart-container">
              <h2 className="chart-title">Number of Questions By Quiz</h2>
              {transformedData?.quizzes && (
                <Bar
                  data={{
                    datasets: [{
                      label: 'Quizzes by Course',
                      data: transformedData.quizzes.map(quiz => ({
                        x: quiz.title,
                        y: quiz.questions.length
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
                          text: 'Quiz Title'
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
              )}
            </div>
            <div className="chart-container">
              <h2 className="chart-title">User Growth Over Time</h2>
              <div className="time-unit-buttons">
                <Button
                  variant="contained"
                  onClick={() => setTimeUnit('day')}
                  sx={{ backgroundColor: timeUnit === 'day' ? '#17bf9e' : 'grey', color: 'white' }}
                >
                  Day
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setTimeUnit('month')}
                  sx={{ backgroundColor: timeUnit === 'month' ? '#17bf9e' : 'grey', color: 'white' }}
                >
                  Month
                </Button>
              </div>
              {transformedData?.users && (
                <Line
                  data={{
                    datasets: [{
                      label: 'User Growth',
                      data: getUserGrowthData(transformedData.users),
                      backgroundColor: 'rgba(54, 162, 235, 0.6)',
                      borderColor: 'rgba(54, 162, 235, 1)',
                      borderWidth: 1,
                      fill: false // No filling under the line
                    }]
                  }}
                  options={{
                    scales: {
                      x: {
                        type: 'time',
                        time: {
                          unit: timeUnit,
                          tooltipFormat: timeUnit === 'day' ? 'yyyy-MM-dd' : 'yyyy-MM',
                        },
                        title: {
                          display: true,
                          text: 'Date'
                        }
                      },
                      y: {
                        title: {
                          display: true,
                          text: 'Number of Users'
                        },
                        beginAtZero: true
                      }
                    }
                  }}
                />
              )}
            </div>
            
            
          </div>
          
        </>
      )}
    </div>
  );
};

export default Dashboard;
