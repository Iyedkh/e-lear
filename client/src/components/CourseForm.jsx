
import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../components/Navbar';

const CourseForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        rating: '',
        description: '',
        category: '',
        videoUrl: '',
        image: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('rating', formData.rating);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('videoUrl', formData.videoUrl);
        formDataToSend.append('image', formData.image);

        try {
            await axios.post('http://localhost:3000/courses', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Course added successfully');
            // Clear the form data after successful submission
            setFormData({
                title: '',
                rating: '',
                description: '',
                category: '',
                videoUrl: '',
                image: null
            });
        } catch (error) {
            console.error('Error adding course:', error);
            alert('Error adding course. Please try again.'); // Show error message in case of failure
        }
    };

    return (
        <>
            <NavBar />
            <div className="container">
                <h2>Create New Course</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title:</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Rating:</label>
                        <input type="number" name="rating" value={formData.rating} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label>Category:</label>
                        <input type="text" name="category" value={formData.category} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Video URL:</label>
                        <input type="text" name="videoUrl" value={formData.videoUrl} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Image:</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
};

export default CourseForm;
