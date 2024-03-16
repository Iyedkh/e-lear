import React, { useState } from 'react';
import axios from 'axios';

const CourseForm = () => {
    const [courseData, setCourseData] = useState({
        title: '',
        rating: 0,
        description: '',
        category: '',
        videoUrl: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/courses', {
                title: courseData.title,
                rating: courseData.rating,
                description: courseData.description,
                category: courseData.category,
                videoUrl: courseData.videoUrl
            });
            console.log('Course added successfully:', response.data);
            // Optionally, you can clear the form after successful submission
            setCourseData({
                title: '',
                rating: 0,
                description: '',
                category: '',
                videoUrl: ''
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
                    Description:
                    <input type="text" name="description" value={courseData.description} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Category:
                    <input type="text" name="category" value={courseData.category} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Video URL:
                    <input type="text" name="videoUrl" value={courseData.videoUrl} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Add Course</button>
            </form>
        </div>
    );
};

export default CourseForm;
