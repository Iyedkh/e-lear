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

        fetchCourses();
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
                        // when window width is >= 320px
                        320: {
                            slidesPerView: 1.5,
                            spaceBetween: 50
                        },
                        // when window width is >= 480px
                        480: {
                            slidesPerView: 1.5,
                            spaceBetween: 50
                        },
                        // when window width is >= 640px
                        640: {
                            slidesPerView: 4.4,
                            spaceBetween: 40
                        }
                    }}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                >
                    {courses.map(course => (
                        <SwiperSlide key={course._id}>
                            <Card course={course} /> {/* Pass the 'course' object as a prop */}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <Footer />
        </>
    );
};

export default Courses;
