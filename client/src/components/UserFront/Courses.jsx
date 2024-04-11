import React, { useState, useEffect } from 'react';
import NavBar from '../Header/Header.jsx';
import Footer from "../Footer/Footer.jsx";
import axios from 'axios';
import Card from "./Card";
import "./Courses.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper CSS

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [savedCourses, setSavedCourses] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

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
        
        const fetchSavedCourses = async () => {
            try {
                const response = await fetch('http://localhost:3000/savecourse');
                if (!response.ok) {
                    throw new Error(`Failed to fetch saved courses: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setSavedCourses(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCourses();
        fetchSavedCourses();
    }, []);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <NavBar />
            <div className="container ">
                <Swiper
                    breakpoints={{
                        320: { slidesPerView: 1.5, spaceBetween: 50 },
                        480: { slidesPerView: 1.5, spaceBetween: 50 },
                        640: { slidesPerView: 4.4, spaceBetween: 40 }
                    }}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                >
                    {courses.map(course => (
                        <SwiperSlide key={course._id}>
                            <Card course={course} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="container ">
                <h1>Your Saved Courses</h1>
                <Swiper
                    breakpoints={{
                        320: { slidesPerView: 1.5, spaceBetween: 50 },
                        480: { slidesPerView: 1.5, spaceBetween: 50 },
                        640: { slidesPerView: 4.4, spaceBetween: 40 }
                    }}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                >
                    {savedCourses.map(savedCourse => (
                        <SwiperSlide key={savedCourse._id}>
                            <Card course={savedCourse} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <Footer />
        </>
    );
};

export default Courses;
