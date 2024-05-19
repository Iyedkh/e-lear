import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper CSS
import { Link } from "react-router-dom"; // Import Link from React Router
import CategoryCard from "./CategoryCard";


const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3000/categories');
                if (!response.ok) {
                    throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

    

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12" className="mb-5 ">
                        <div className="category__top d-flex justify-content-between align-items-center">
                            <div className="category__top__left w-50">
                                <h2>Our Categories</h2>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                                    consequatur libero quod voluptatibus ullam quia quas, vitae
                                    voluptatem recusandae reprehenderit!
                                </p>
                            </div>

                            <div className="w-50   text-end">
                                <Link to="/Category">
                                    <button className="btn">See All</button>
                                </Link>
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

                            }}
                            navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                        >
                            {categories.map(category => (
                                <SwiperSlide key={category._id}>
                                    <Link to={`/courses/${category._id}`} className="cat">
                                        <CategoryCard category={category}  />
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </Row>
            </Container>
        </section>
    );
};

export default Categories;
