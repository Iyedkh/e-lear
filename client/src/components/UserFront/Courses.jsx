import React, { useState, useEffect } from 'react';
import NavBar from '../Header/Header.jsx';
import Footer from "../Footer/Footer.jsx";
import axios from 'axios';
import Card from "./Card";
import { Link } from "react-router-dom";
import "./Courses.css";
import { Button, Menu, MenuItem } from '@mui/material';
import Category from "../categoryForum/Category.jsx";
const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 12; // 3 rows * 4 cards per row

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

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
        filterCourses(event.target.value, selectedCategory);
    };

    const filterCourses = (query, category) => {
        let filtered = courses;

        if (query) {
            filtered = filtered.filter(course => 
                course.title.toLowerCase().includes(query.toLowerCase())
            );
        }

        if (category && category !== 'all') {
            filtered = filtered.filter(course => 
                course.category === category
            );
        }

        setFilteredCourses(filtered);
        setCurrentPage(1); // Reset to first page after filtering
    };

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
        setAnchorEl(null);
        filterCourses(searchInput, categoryId);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat._id === categoryId);
        return category ? category.name : '';
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(filteredCourses.length / coursesPerPage)));
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const startIndex = (currentPage - 1) * coursesPerPage;
    const currentCourses = filteredCourses.slice(startIndex, startIndex + coursesPerPage);

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
                
                <div className="card-list-container">
                    {currentCourses.map(course => (
                        <Card key={course._id} course={course} />
                    ))}
                </div>

                <div className="pagination">
                    <Button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</Button>
                    <span>Page {currentPage} of {Math.ceil(filteredCourses.length / coursesPerPage)}</span>
                    <Button onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredCourses.length / coursesPerPage)}>Next</Button>
                </div>
            </div>
            <Category/>
            <Footer />
        </>
    );
};

export default Courses;
