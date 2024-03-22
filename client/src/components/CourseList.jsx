import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar';
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

    const EditOverlay = () => (
        <div className="overlay">
            <div className="edit-fields-container">
                <TextField
                    className="edit-field"
                    label="Title"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                />
                <TextField
                    className="edit-field"
                    label="Rating"
                    value={editedRating}
                    onChange={(e) => setEditedRating(e.target.value)}
                />
                <TextField
                    className="edit-field"
                    label="Description"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateCourse}
                >
                    Update
                </Button>
            </div>
        </div>
    );

    const styles = `
    .container {
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
        background-color: rgb(100, 100, 200);
        color: white;
        text-decoration: none;
        border-radius: 5px;
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
        display: block;
        width: 100%;
        padding: 10px 0;
        text-align: center;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .link:hover {
        background-color: rgb(80, 80, 180);
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
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
    }
    
    .edit-fields-container {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        max-width: 80%;
        width: 400px;
    }
    
    .edit-field {
        width: 100%;
        margin-bottom: 10px;
    }
    
    .edit-field label {
        font-weight: bold;
    }
    
    .edit-field input[type='file'] {
        display: none;
    }
    
    .edit-field label.upload-label {
        display: inline-block;
        padding: 8px 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
        cursor: pointer;
        background-color: #f0f0f0;
        transition: background-color 0.3s ease;
    }
    
    .edit-field label.upload-label:hover {
        background-color: #e0e0e0;
    }
    `;

    return (
        <>
            <NavBar />
            <style>{styles}</style>
            <div className="title">Courses Page</div>
            <Link to="/create-course" className="link">Create New Course</Link>
            <div className="container">
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
                                <MenuItem onClick={() => handleEditCourse(course)}>Edit</MenuItem>
                                <MenuItem onClick={() => handleDeleteCourse(course._id)}>Delete</MenuItem>
                            </Menu>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`http://localhost:3000${course.imageUrl}`}
                                alt={course.title}
                            />
                            {editCourse && editCourse._id === course._id && <EditOverlay />}
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
        </>
    );
};

export default CourseList;
