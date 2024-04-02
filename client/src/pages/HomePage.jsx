import React, { Fragment } from 'react';


import NavBar from '../components/Header/Header';
import HeroSection from "../components/Hero-Section/HeroSection";
import AboutUs from "../components/About-us/AboutUs";

import TopRatedCourses from '../components/TopRatedCourses';
import CoursesByCategory from '../components/CoursesByCategory';
import Footer from "../components/Footer/Footer";
const HomePage = () => {
   
        return (
            <>
            <Fragment>
                 <NavBar />
                 <HeroSection />
                 <AboutUs />
                 <TopRatedCourses />
                 <Footer />
            </Fragment>
               
                
            </>
        );
    };
export default HomePage;
