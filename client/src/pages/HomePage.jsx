import React from 'react';

import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar';
import TopRatedCourses from '../components/TopRatedCourses';

const HomePage = () => {
   
        return (
            <>
                <NavBar />
                <div style={{ textAlign: 'center' }}>
                    <h1>Welcome to Home Page</h1>
                    <TopRatedCourses />
                    <Link to="/course">View Courses</Link>
                </div>
            </>
        );
    };
export default HomePage;
