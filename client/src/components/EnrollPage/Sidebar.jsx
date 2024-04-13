import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EnrollPage.css';
const Sidebar = ({ courseId, onSelectCourse }) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:3000/courses');
                if (response.status === 200) {
                    setCourses(response.data);
                } else {
                    console.error('Failed to fetch courses:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="sidebar">
            <h3>Course Titles</h3>
            <ul>
                {courses.map(course => (
                    <li key={course._id} className={courseId === course._id ? 'active' : ''} onClick={() => onSelectCourse(course._id)}>
                        {course.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
