import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../Header/Header';
import '../courseForum/forum.css';

const EditForum = () => {
    const [editCourse, setEditCourse] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedRating, setEditedRating] = useState('');
    const [editedDescription, setEditedDescription] = useState('');

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
            window.location.reload(); // This line might not be necessary if you're using React Router for navigation
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    return (
        <>
            <NavBar />
            <div className="container">
                <h2>Edit Course</h2>
                <form onSubmit={handleUpdateCourse}>
                    <div className="form-group">
                        <label>Title:</label>
                        <input type="text" name="title" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Rating:</label>
                        <input type="number" name="rating" value={editedRating} onChange={(e) => setEditedRating(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea name="description" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)}></textarea>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
};

export default EditForum;
