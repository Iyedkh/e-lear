import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/Header/Header';
import axios from 'axios';
import { Button, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import './CourseList.css';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteCourseId, setDeleteCourseId] = useState(null);
   

    const coursesPerPage = 10;

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

    const handleDeleteCourse = async () => {
        if (!deleteCourseId) return;
        try {
            await axios.delete(`http://localhost:3000/courses/${deleteCourseId}`);
            console.log('Deleted course:', deleteCourseId);
            setDeleteCourseId(null);
            setShowDeleteDialog(false);
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
        setAnchorEl(null);
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat._id === categoryId);
        return category ? category.name : '';
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));
    };

    const filteredCourses = selectedCategory
        ? courses.filter(course => course.category === selectedCategory)
        : courses;

    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
    const currentCourses = filteredCourses.slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage);

    return (
        <>
            <NavBar />
            <h2 className='h23'>Courses Page</h2>
            <div className="container-list">
                <div className="sidebar">
                    <Link to="/create-course" className="link">Create New Course</Link>
                    <Link to="/category" className="link">Category</Link>
                    <Link to="/quiz" className="link">Quiz</Link>
                    <Link to="/dash" className="link">Dashboard</Link>
                    <Link to="/users">User List</Link>
                </div>

                <div className="content"> 
                    <Button
                        onClick={handleMenuOpen}
                        style={{
                            backgroundColor: '#17bf9e',
                            color: 'white',
                            padding: '10px 20px',
                            textTransform: 'none',
                            marginTop: '20px'
                        }}>
                        Filter by Category
                    </Button>
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
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCourses.map((course, index) => (
                                <tr key={course._id}>
                                    <td>{(currentPage - 1) * coursesPerPage + index + 1}</td>
                                    <td>{course.title}</td>
                                    <td>{getCategoryName(course.category)}</td>
                                    <td className="action-buttons">
                                        <Button component={Link} to={`/enroll/${course._id}`} variant="contained" color="primary">Enroll</Button>
                                        <Button component={Link} to={`/edit-course/${course._id}`} variant="contained">Update</Button>
                                        <Button onClick={() => { setDeleteCourseId(course._id); setShowDeleteDialog(true); }} variant="contained" color="error">Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <Button variant="contained" disabled={currentPage === 1} onClick={handlePreviousPage}>
                            Previous
                        </Button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <Button variant="contained" disabled={currentPage === totalPages} onClick={handleNextPage}>
                            Next
                        </Button>
                    </div>
                </div>
            </div>

            <Dialog
                open={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this course?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowDeleteDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteCourse} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CourseList;
