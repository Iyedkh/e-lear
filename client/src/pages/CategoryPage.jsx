// CategoryPage.js
import React, { useState, useEffect } from 'react';
import NavBar from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import axios from 'axios';
import CategoryCard from '../components/categoryForum/CategoryCard';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './CategoryPage.css';

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/categories');
                if (response.status === 200) {
                    setCategories(response.data);
                    setFilteredCategories(response.data);
                } else {
                    console.error('Failed to fetch categories:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
        filterCategories(event.target.value);
    };

    const filterCategories = (query) => {
        const filtered = categories.filter(category => category.name.toLowerCase().includes(query.toLowerCase()));
        setFilteredCategories(filtered);
    };

    return (
        <>
            <NavBar />
            <div className="container">
                <div className="hi">
                    <div className="search-container">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search by category"
                            value={searchInput}
                            onChange={handleSearchInputChange}
                        />
                    </div>
                    <div className="saved">
                        <Link to={`/create-category`} className="btn">Create Category</Link>
                    </div>
                </div>
               
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
                    {filteredCategories.map(category => (
                        <SwiperSlide key={category._id}>
                            <Link to={`/courses/${category._id}`}>
                                <CategoryCard category={category} />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <Footer />
        </>
    );
};

export default CategoryPage;
