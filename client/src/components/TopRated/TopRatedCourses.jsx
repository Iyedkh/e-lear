import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper CSS
import CourseCard from "./CourseCard";
import './toprated.css';

const Courses = () => {
    const [topRatedCourses, setTopRatedCourses] = useState([]);

    useEffect(() => {
        const fetchTopRatedCourses = async () => {
            try {
                const response = await fetch('http://localhost:3000/courses/top-rated');
                if (!response.ok) {
                    throw new Error(`Failed to fetch top-rated courses: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setTopRatedCourses(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTopRatedCourses();
    }, []);

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12" className="mb-5 ">
                        <div className="course__top d-flex justify-content-between align-items-center">
                            <div className="course__top__left w-50">
                                <h2>Our Top Rated Courses</h2>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                                    consequatur libero quod voluptatibus ullam quia quas, vitae
                                    voluptatem recusandae reprehenderit!
                                </p>
                            </div>

                            <div className="w-50   text-end">
                                <a href="/userC">
                                    <button className="btn">See All</button>
                                </a>
                            </div>
                        </div>
                    </Col>
                    <div className="container mt-2">
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
                                    slidesPerView: 3.5,
                                    spaceBetween: 40
                                }

                            }
                        }
                            navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                            
                        >
                            {topRatedCourses.map(course => (
                                <SwiperSlide key={course._id}>
                                    <CourseCard course={course} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </Row>
            </Container>
        </section>
    );
};

export default Courses;
