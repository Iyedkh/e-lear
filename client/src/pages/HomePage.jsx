import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCourses } from '../service/courseService';
import '../styles/HomePage.css';
const HomePage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getAllCourses();
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error.message);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Home Page</h2>
      <Link to="/create-course">Create New Course</Link>
      <ul>
        {courses.map(course => (
          <li key={course._id}>
            <Link to={`/courses/${course._id}`}>{course.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
