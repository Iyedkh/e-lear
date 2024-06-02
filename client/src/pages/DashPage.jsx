import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import '../components/Dashboard/dash.css';
import NavBar from '../components/Header/Header';
import 'chartjs-adapter-date-fns';
import { Button } from '@mui/material';

const USERS_PER_PAGE = 10;

const Dashboard = () => {
  const [transformedData, setTransformedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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

  const getUserGrowthData = () => {
    if (!transformedData || !transformedData.users) return [];

    const registrationDates = transformedData.users.map(user => new Date(user.registrationDate));
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

  const handleChangeRole = async (userId, newRole) => {
    try {
      await axios.put(`http://localhost:3000/auth/${userId}`, { role: newRole }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      // Refresh data
      const response = await axios.get('http://localhost:3000/transformed-data', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTransformedData(response.data);
    } catch (error) {
      console.error('Error changing user role:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/auth/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        // User deleted successfully
        window.alert('User deleted successfully!');
        // Remove the deleted user from the state
        setTransformedData(prevData => ({
          ...prevData,
          users: prevData.users.filter(user => user.id !== userId)
        }));
      } else {
        throw new Error(`Error deleting user: ${response.statusText}`); // Handle specific error
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      // Display user-friendly error message based on the error type
    }
  };

  // Function to handle pagination buttons (previous and next)
  const handlePageChange = (direction) => {
    if (direction === 'previous') {
      setCurrentPage(Math.max(currentPage - 1, 1)); // Prevent going below page 1
    } else if (direction === 'next') {
      const totalPages = Math.ceil(transformedData?.users.length / USERS_PER_PAGE);
      setCurrentPage(Math.min(currentPage + 1, totalPages)); // Prevent going beyond last page
    }
  };

  // Function to get users for the current page
  const getUsersForCurrentPage = () => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    return transformedData?.users.slice(startIndex, endIndex) || [];
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
                <p>{transformedData.counts?.userCount || 'N/A'}</p>
              </div>
              <div className="card">
                <h2>Number of Courses</h2>
                <p>{transformedData.counts?.courseCount || 'N/A'}</p>
              </div>
              <div className="card">
                <h2>Number of Categories</h2>
                <p>{transformedData.counts?.categoryCount || 'N/A'}</p>
              </div>
            </div>

            <div className="dashboard-content">
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
                  className="pie-chart"
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
                <h2 className="chart-title">Bar Chart for Quizzes by Course</h2>
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
              </div>
              <div className="chart-container">
                <h2 className="chart-title">Line Chart for User Growth Over Time</h2>
                <Line
                  data={{
                    datasets: [{
                      label: 'User Growth',
                      data: getUserGrowthData(),
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
                          unit: 'day',
                          tooltipFormat: 'yyyy-MM-dd' // Use a valid date format
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
              </div>
              <div className="user-list-container">
                <h2 className="user-list-title">User List</h2>
                <table className="user-list-table">
                  <thead>
                    <tr>
                      <th>#</th> {/* User number column */}
                      <th>Username</th>
                      <th>Email</th>
                      <th>City</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getUsersForCurrentPage().map((user, index) => (
                      <tr key={user.id}>
                        <td>{(currentPage - 1) * USERS_PER_PAGE + index + 1}</td> {/* Display user number */}
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.city}</td>
                        <td>{user.role}</td>
                        <td className="action-buttons">
                          <button
                            className="role"
                            onClick={() =>
                              handleChangeRole(user.id, user.role === 'user' ? 'admin' : 'user')
                            }
                          >
                            {user.role === 'user' ? 'Promote to Admin' : 'Demote to User'}
                          </button>
                          <button className="adminDelete" onClick={() => handleDeleteUser(user.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="pagination-buttons">
                  <Button className='Previous'
                    variant="contained"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange('previous')}
                    sx={{ backgroundColor: '#17bf9e', color: 'white' }}
                  >
                    Previous
                  </Button>
                  <span className="page-number">{currentPage}</span>
                  <Button className='next'
                    variant="contained"
                    disabled={currentPage === Math.ceil(transformedData?.users.length / USERS_PER_PAGE)}
                    onClick={() => handlePageChange('next')}
                    sx={{ backgroundColor: '#17bf9e', color: 'white' }}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
    </div>
  );
};

export default Dashboard;

