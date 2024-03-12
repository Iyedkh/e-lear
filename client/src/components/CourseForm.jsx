// CourseForm.js

import React, { useState } from 'react';
import axios from 'axios';

const CourseForm = () => {
    const [courseData, setCourseData] = useState({
        id: '',
        title: '',
        rating: 0,
        comments: [],
        category: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/courses', courseData);
            console.log('Course added successfully:', response.data);
            // Optionally, you can clear the form after successful submission
            setCourseData({
                id: '',
                title: '',
                rating: 0,
                comments: [],
                category: ''
            });
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    return (
        <div>
            <h2>Add New Course</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    ID:
                    <input type="text" name="id" value={courseData.id} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Title:
                    <input type="text" name="title" value={courseData.title} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Rating:
                    <input type="number" name="rating" value={courseData.rating} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Comments:
                    <input type="text" name="comments" value={courseData.comments} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Category:
                    <input type="text" name="category" value={courseData.category} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Add Course</button>
            </form>
        </div>
    );
};

export default CourseForm;
