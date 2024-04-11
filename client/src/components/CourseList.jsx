import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/Header/Header';
import Footer from "../components/Footer/Footer";
import axios from 'axios';
import { Card, CardContent, Typography, CardMedia, Button, Menu, MenuItem, TextField } from '@mui/material';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [editCourse, setEditCourse] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedRating, setEditedRating] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);

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

        fetchCourses();
    }, []);

    const handleEditCourse = (course) => {
        setEditCourse(course);
        setEditedTitle(course.title);
        setEditedRating(course.rating);
        setEditedDescription(course.description);
    };

    const handleUpdateCourse = async () => {
        try {
            const updatedCourse = await axios.put(`http://localhost:3000/courses/${editCourse._id}`, {
                title: editedTitle,
                rating: editedRating,
                description: editedDescription
            });
            console.log('Updated course:', updatedCourse.data);
            // Clear edit form
            setEditCourse(null);
            setEditedTitle('');
            setEditedRating('');
            setEditedDescription('');
            window.location.reload();
        } catch (error) {
            console.error('Error updating course:', error);
        }
        
    };

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


    const styles = `
    .containere {
        background-color: aqua;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 20px;
        margin-top: 20px;
    }

    .card {
        width: calc(33.33% - 20px);
        margin-bottom: 20px;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
        position: relative;
    }

    .ellipsis-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: transparent;
        color: #000000;
        padding: 0;
        min-width: auto;
    }

    .edit-fields {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .edit-field {
        width: 100%;
    }

    .title {
        font-size: 24px;
        text-align: center;
        margin-bottom: 20px;
        padding: 10px;
        background-color: rgb(240, 240, 240);
        width: 100%;
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

    .card:hover {
        transform: translateY(-5px);
    }

    .card-content {
        padding: 20px;
    }

    .card-title {
        font-size: 20px;
        margin-bottom: 10px;
    }

    .rating {
        margin-bottom: 10px;
    }

    .description {
        margin-bottom: 20px;
    }

    .watch-button {
        margin-top:9px;
        display: block;
        width: 100%;
        padding: 10px 0;
        text-align: center;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        border: none;
        border-radius: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .link:hover {
        background-color: #2e7d32;
    }

    .watch-button:hover {
        background-color: #0056b3;
    }

    @media screen and (max-width: 767px) {
        .card {
            width: 100%; 
        }
    }

    @media screen and (min-width: 768px) {
        .container {
            width: 100%; 
            justify-content: space-around; 
        }
    }
    
    `;

    return (
        <>
            <NavBar />
            <style>{styles}</style>
            <div className="title">Courses Page</div>
            <div className='d-flex justify-content-evenly align-items-center gap-1'>
            <Link to="/create-course" className="link">Create New Course</Link>
            <Link to="/dash" className="link">Dashboard</Link>
            </div>
            <div className="containere">
                {courses.map(course => (
                    <Card key={course._id} className="card">
                        <CardContent>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleMenuOpen}
                                className="ellipsis-button"
                            >
                                ...
                            </Button>
                            <Menu
                                id="course-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem component={Link}  to={`/edit-course/${course._id}`} onClick={() => handleUpdateCourse(course._id)}>Edit</MenuItem>
                                <MenuItem onClick={() => handleDeleteCourse(course._id)}>Delete</MenuItem>
                            </Menu>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`http://localhost:3000${course.imageUrl}`}
                                alt={course.title}
                            />
                            {editCourse && editCourse._id === course._id }
                            <Typography gutterBottom variant="h5" component="div">
                                {course.title}
                            </Typography>
                            <Typography color="textSecondary">
                                Rating: {course.rating}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {course.description}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                href={course.videoUrl}
                                target="_blank"
                                className="watch-button"
                            >
                                Watch Now
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <br />
            <Footer />
        </>   
    );
     
};

export default CourseList;
