import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../Header/Header';
import '../courseForum/forum.css';

const CourseForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        rating: '',
        description: '',
        category: '',
        video: null, // Change from videoUrl to video
        image: null
    });
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});

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

    const handleVideoChange = (e) => {
        setFormData({ ...formData, video: e.target.files[0] }); // Handle video file change
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.title) formErrors.title = 'Title is required';
        if (!formData.description) formErrors.description = 'Description is required';
        if (!formData.category) formErrors.category = 'Category is required';
        if (!formData.video) formErrors.video = 'Video file is required'; // Validate video file
        if (!formData.image) formErrors.image = 'Image is required';
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) return;
    
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('rating', formData.rating);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('video', formData.video); // Ensure this field name matches
        formDataToSend.append('image', formData.image);
    
        try {
            const response = await axios.post('http://localhost:3000/courses', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Course added successfully');
            setFormData({
                title: '',
                rating: '',
                description: '',
                category: '',
                video: null,
                image: null
            });
        } catch (error) {
            console.error('Error adding course:', error.response ? error.response.data : error.message);
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
                        <input 
                            type="text" 
                            name="title" 
                            value={formData.title} 
                            onChange={handleChange} 
                        />
                        {errors.title && <p className="error">{errors.title}</p>}
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange}
                        ></textarea>
                        {errors.description && <p className="error">{errors.description}</p>}
                    </div>
                    <div className="form-group">
                        <label>Category:</label>
                        <select 
                            name="category" 
                            value={formData.category} 
                            onChange={handleChange}
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                        {errors.category && <p className="error">{errors.category}</p>}
                    </div>
                    <div className="form-group">
                        <label>Video:</label>
                        <input 
                            type="file" 
                            accept="video/*" 
                            onChange={handleVideoChange} 
                        />
                        {errors.video && <p className="error">{errors.video}</p>}
                    </div>
                    <div className="form-group">
                        <label>Image:</label>
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange} 
                        />
                        {errors.image && <p className="error">{errors.image}</p>}
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
};

export default CourseForm;
