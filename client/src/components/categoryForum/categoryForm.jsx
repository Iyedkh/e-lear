import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../Header/Header';
import '../categoryForum/forum.css';

const CategoryForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
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
        formDataToSend.append('name', formData.name);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('image', formData.image);

        try {
            await axios.post('http://localhost:3000/categories', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Category added successfully');
            // Clear the form data after successful submission
            setFormData({
                name: '',
                description: '',
                image: null
            });
        } catch (error) {
            console.error('Error adding category:', error);
            alert('Error adding category. Please try again.'); // Show error message in case of failure
        }
    };

    return (
        <>
            <NavBar />
            <div className="container">
                <h2>Create New Category</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
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

export default CategoryForm;
