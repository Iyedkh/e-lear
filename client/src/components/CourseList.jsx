import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/Header/Header';
import axios from 'axios';
import { Button, Menu, MenuItem } from '@mui/material';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');

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

        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/categories');
                if (response.status === 200) {
                    setCategories(response.data);
                } else {
                    console.error('Failed to fetch categories:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCourses();
        fetchCategories();
    }, []);

    const handleDeleteCourse = async (courseId) => {
        try {
            await axios.delete(`http://localhost:3000/courses/${courseId}`);
            console.log('Deleted course:', courseId);
            // Refresh course list
            const response = await axios.get('http://localhost:3000/courses');
            if (response.status === 200) {
                setCourses(response.data);
            } else {
                console.error('Failed to fetch courses:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
        setAnchorEl(null); // Close the menu after selecting category
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat._id === categoryId);
        return category ? category.name : '';
    };
    const styles = `
    .container {
        margin-top: 20px;
    }
    .h2{
        margin-bottom: 20px;
        text-align: center;
        font-family: Courier, monospace;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
    }

    th, td {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    th {
        background-color: #f2f2f2;
    }

    .action-buttons {
        display: flex;
        gap: 10px;
        justify-content: space-around;
    }
    .link {
        font-size: 18px;
        margin-bottom: 20px;
        display: block;
        width: fit-content;
        padding: 10px 20px;
        background-color: #17bf9e;
        color: white;
        text-decoration: none;
        border-radius: 26px;
        text-align: center;
    }
    .Title{
        text-align: center;
        margin-bottom: 15px;
        font-family: Courier, monospace;
    }
    `;

    return (
        <>
            <style>{styles}</style>
            <NavBar />
            <div className="container">
                <h2 className='h2'>Courses Page</h2>
                <div className='d-flex justify-content-evenly align-items-center gap-1'>
                    <Link to="/create-course" className="link">Create New Course</Link>
                    <Link to="/category" className="link">Category</Link>
                    <Link to="/quiz" className="link">Quiz</Link>
                    <Link to="#" className="link">Dashboard</Link>
                </div>
                <div>
                <Button
                    onClick={handleMenuOpen}
                        style={{
                            backgroundColor: '#17bf9e',
                            color: 'white',
                            padding: '10px 20px',
                            textTransform: 'none'  }}>
                Filter by Category</Button>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        {categories.map(category => (
                            <MenuItem key={category._id} onClick={() => handleCategorySelect(category._id)}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(course => (
                            (!selectedCategory || course.category === selectedCategory) && // Filter courses by selected category
                            <tr key={course._id}>
                                <td>{course.title}</td>
                                <td>{getCategoryName(course.category)}</td>
                                <td className="action-buttons">
                                    <Button component={Link} to={`/enroll/${course._id}`} variant="contained" color="primary">Enroll</Button>
                                    <Button component={Link} to={`/edit-course/${course._id}`} variant="contained">Update</Button>
                                    <Button onClick={() => handleDeleteCourse(course._id)} variant="contained" color="error">Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CourseList;
