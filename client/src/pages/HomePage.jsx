import React from 'react';

import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar';
import TopRatedCourses from '../components/TopRatedCourses';
import CoursesByCategory from '../components/CoursesByCategory';

const HomePage = () => {
   
        return (
            <>
                <NavBar />
                <div style={{ textAlign: 'center' }}>
                    <h1>Welcome to Infinite</h1>
                    <TopRatedCourses />
                    <Link to="/course">View Courses</Link>
                    <h4>See course by Category :</h4>
                    <CoursesByCategory category="Math" />
                </div>
            </>
        );
    };
export default HomePage;
