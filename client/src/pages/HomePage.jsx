import React, { Fragment } from 'react';


import NavBar from '../components/Header/Header';
import HeroSection from "../components/Hero-Section/HeroSection";
import AboutUs from "../components/About-us/AboutUs";

import ChooseUs from "../components/Choose-us/ChooseUs";
import Features from "../components/Feature-section/Features";
import TopRatedCourses from '../components/TopRated/TopRatedCourses';
import Testimonials from "../components/Testimonial/Testimonials";
import Work from '../components/work/Work';
import Footer from "../components/Footer/Footer";
const HomePage = () => {
   
        return (
            <>
            <Fragment>
                 <NavBar />
                  <HeroSection />
                 <Work />
                 <AboutUs />
                 <TopRatedCourses />
                 <ChooseUs />
                 <Features />
                 <Testimonials/>
                 <Footer />
            </Fragment>
               
                
            </>
        );
    };
export default HomePage;
