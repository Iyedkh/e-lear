// CoursesByCategoryPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import CourseCard from '../components/UserFront/Card';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const CoursesByCategoryPage = () => {
    const { categoryId } = useParams();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCoursesByCategory = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/courses/category/${categoryId}`);
                if (response.status === 200) {
                    setCourses(response.data);
                } else {
                    console.error('Failed to fetch courses:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCoursesByCategory();
    }, [categoryId]);

    return (
        <>
            <NavBar />
            <div className="container">
                <h2>Courses in this Category</h2>
                <Link to="/">Back to Categories</Link>
                <Swiper
                    breakpoints={{
                        320: {
                            slidesPerView: 1.5,
                            spaceBetween: 50
                        },
                        480: {
                            slidesPerView: 1.5,
                            spaceBetween: 50
                        },
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
                            <CourseCard course={course} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <Footer />
        </>
    );
};

export default CoursesByCategoryPage;
