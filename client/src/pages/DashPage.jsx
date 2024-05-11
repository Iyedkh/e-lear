import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Line, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Import Chart.js to ensure proper registration of scales
import '../components/Dashboard/dash.css';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [comments, setComments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState(0); // Key for forcing remount

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesResponse, commentsResponse, categoriesResponse] = await Promise.all([
          axios.get('http://localhost:3000/courses'),
          axios.get('http://localhost:3000/comment/comments'), // Corrected endpoint URL
          axios.get('http://localhost:3000/categories')
        ]);
        setCourses(coursesResponse.data);
        setComments(commentsResponse.data);
        setCategories(categoriesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Prepare data for charts
  const courseLabels = courses.map(course => course.title);
  const courseRatings = courses.map(course => course.rating);
  const categoryNames = categories.map(category => category.name);
  const categoryCounts = categories.map(category => courses.filter(course => course.category === category._id).length);
  const commentCounts = comments.length;

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="dashboard-content">
          <div className="chart-container">
            <h2 className="chart-title">Bar Chart for Course Ratings</h2>
            <Bar
              key={`bar-chart-${key}`}
              data={{
                labels: courseLabels,
                datasets: [{
                  label: 'Ratings',
                  data: courseRatings,
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
            <h2 className="chart-title">Line Chart for Category Counts</h2>
            <Line
              key={`line-chart-${key}`}
              data={{
                labels: categoryNames,
                datasets: [{
                  label: 'Counts',
                  data: categoryCounts,
                  fill: false,
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
          <div className="chart-container">
            <h2 className="chart-title">Pie Chart for Comment Counts</h2>
            <Pie
              key={`pie-chart-${key}`}
              data={{
                labels: ['Comments', 'Courses without Comments'],
                datasets: [{
                  data: [commentCounts, courses.length - commentCounts],
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)'
                  ]
                }]
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
