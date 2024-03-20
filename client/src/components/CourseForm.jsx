import React, { useState } from 'react';
import axios from 'axios';

const CourseForm = () => {
    const [courseData, setCourseData] = useState({
        title: '',
        rating: 0,
        description: '',
        category: '',
        videoUrl: '',
        photo: null // New state for storing the selected photo file
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    // Function to handle file input change
    const handleFileChange = (e) => {
        setCourseData({ ...courseData, photo: e.target.files[0] }); // Store the selected file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(); // Create FormData object for file upload
            formData.append('photo', courseData.photo); // Append the selected file to FormData

            // Append other course data to FormData
            formData.append('title', courseData.title);
            formData.append('rating', courseData.rating);
            formData.append('description', courseData.description);
            formData.append('category', courseData.category);
            formData.append('videoUrl', courseData.videoUrl);

            const response = await axios.post('http://localhost:3000/courses', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set content type for FormData
                }
            });
            console.log('Course added successfully:', response.data);
            // Optionally, you can clear the form after successful submission
            setCourseData({
                title: '',
                rating: 0,
                description: '',
                category: '',
                videoUrl: '',
                photo: null
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
                <label>
    Photo:
    <input type="file" accept="image/*" name="image" onChange={handleFileChange} />
</label>
                <br />
                <button type="submit">Add Course</button>
            </form>
        </div>
    );
};

export default CourseForm;
