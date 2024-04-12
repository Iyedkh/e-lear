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
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:3000/courses');
                if (response.status === 200) {
                    setCourses(response.data);
                    setFilteredCourses(response.data); // Initialize filteredCourses with all courses
                } else {
                    console.error('Failed to fetch courses:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    // Function to handle search input change
    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
        filterCourses(event.target.value); // Filter courses based on search input
    };

    // Function to filter courses based on search input
    const filterCourses = (query) => {
        const filtered = courses.filter(course => course.category.toLowerCase().includes(query.toLowerCase()));
        setFilteredCourses(filtered);
    };

    return (
        <>
            <NavBar />
            <div className="container">
                {/* Search bar */}
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search by category"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                    />
                </div>
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
                    {filteredCourses.map(course => (
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
