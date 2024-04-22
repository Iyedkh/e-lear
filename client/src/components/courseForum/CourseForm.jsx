import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../Header/Header';
import '../courseForum/forum.css';

const CourseForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        rating: '',
        description: '',
        category: '', // Updated to store category ID
        videoUrl: '',
        image: null
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

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
            setFormData({
                title: '',
                rating: '',
                description: '',
                category: '', // Reset category after submission
                videoUrl: '',
                image: null
            });
        } catch (error) {
            console.error('Error adding course:', error);
            alert('Error adding course. Please try again.');
        }
    };

    return (
        <>
            <NavBar />
            <div className="containere">
                <h2>Create New Course</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title:</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label>Category:</label>
                        <select name="category" value={formData.category} onChange={handleChange}>
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
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
