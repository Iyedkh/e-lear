import React, { useState, useEffect } from 'react';
import Card from '../components/saved/card';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper CSS
const Courses = () => {
    // State variables
   
    const [savedCourses, setSavedCourses] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {

        const fetchSavedCourses = async () => {
            try {
                const response = await axios.get('http://localhost:3000/courses/saved');
                if (response.status >= 200 && response.status < 300) {
                    setSavedCourses(response.data);
                } else {
                    throw new Error(`Failed to fetch saved courses: ${response.status} ${response.statusText}`);
                }
            } catch (error) {
                console.error(error);
            }
        };

        
        fetchSavedCourses();
    }, []);

    return (
        <>
            
            <div className="container">
                
                <h1>Your Saved Courses</h1>
                <Swiper
                    breakpoints={{
                        320: { slidesPerView: 1.5, spaceBetween: 50 },
                        480: { slidesPerView: 1.5, spaceBetween: 50 },
                        640: { slidesPerView: 4.4, spaceBetween: 40 },
                    }}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                >
                    {savedCourses.map((savedCourse) => (
                        <SwiperSlide key={savedCourse._id}>
                            <Card savedCourse={savedCourse} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        
        </>
    );
};

export default Courses;
