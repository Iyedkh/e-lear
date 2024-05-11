import React, { useState, useEffect } from 'react';
import NavBar from '../Header/Header.jsx';
import Footer from "../Footer/Footer.jsx";
import axios from 'axios';
import Card from "./Card";
import { Link } from "react-router-dom";
import "./Courses.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import { Button, Menu, MenuItem } from '@mui/material';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await axios.get('http://localhost:3000/categories');
                const coursesResponse = await axios.get('http://localhost:3000/courses');
                if (categoriesResponse.status === 200 && coursesResponse.status === 200) {
                    setCategories(categoriesResponse.data);
                    setCourses(coursesResponse.data);
                    setFilteredCourses(coursesResponse.data); // Initialize filteredCourses with all courses
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // Function to handle search input change
    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
        filterCourses(event.target.value, selectedCategory); // Filter courses based on search input and selected category
    };

    // Function to filter courses based on search input and selected category
    const filterCourses = (query, category) => {
        let filtered = courses;

        // Filter by title
        if (query) {
            filtered = filtered.filter(course => 
                course.title.toLowerCase().includes(query.toLowerCase())
            );
        }

        // Filter by category
        if (category && category !== 'all') {
            filtered = filtered.filter(course => 
                course.category === category
            );
        }

        setFilteredCourses(filtered);
    };

    // Function to handle category select
    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
        setAnchorEl(null); // Close the menu after selecting category
        filterCourses(searchInput, categoryId); // Filter courses based on search input and selected category
    };

    // Function to handle menu open
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Function to handle menu close
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Function to get category name by ID
    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat._id === categoryId);
        return category ? category.name : '';
    };

    return (
        <>
            <NavBar />
            <div className="container">
                <div className="hi">
                    <div>
                        <Button
                            onClick={handleMenuOpen}
                            style={{
                                backgroundColor: '#17bf9e',
                                color: 'white',
                                padding: '10px 20px',
                                textTransform: 'none'
                            }}
                        >
                            Filter by Category
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem key="all" onClick={() => handleCategorySelect('')}>All</MenuItem>
                            {categories.map(category => (
                                <MenuItem key={category._id} onClick={() => handleCategorySelect(category._id)}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>
                    <div className="search-container">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search by Title"
                            value={searchInput}
                            onChange={handleSearchInputChange}
                        />
                    </div>
                    <div className="saved">
                        <Link to={`/saved`} className="btn">Saved Courses</Link>
                    </div>
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
                            <Card course={course} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <Footer />
        </>
    );
};

export default Courses;
