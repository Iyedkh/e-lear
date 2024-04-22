import React, { useState, useEffect } from "react";
import './Card.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import { BsSave2Fill } from 'react-icons/bs';

const Card = ({ course }) => {
    const { _id, title, category, description, students, imageUrl, ratings } = course;
    const [categories, setCategories] = useState([]);

    // Function to calculate average rating
    const calculateAverageRating = () => {
        if (!ratings || ratings.length === 0) return 0;
        
        const totalRating = ratings.reduce((acc, curr) => acc + curr.stars, 0);
        return totalRating / ratings.length;
    };

    // Function to save course
    const saveCourse = async () => {
        try {
            const response = await axios.post('http://localhost:3000/courses/save', {
                courseId: _id,
            });
            console.log(response.data);
            // You can add logic here to show a success message or update UI if needed
        } catch (error) {
            console.error('Error saving course:', error);
            // You can add logic here to show an error message or handle the error in UI
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/categories');
                if (response.status === 200) {
                    setCategories(response.data);
                } else {
                    console.error('Failed to fetch categories:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat._id === categoryId);
        return category ? category.name : '';
    };

    return (
        <div className="course-card">
            <div className="course__img">
                <BsSave2Fill className="icon" onClick={saveCourse} />
                <img src={`http://localhost:3000${imageUrl}`} alt={title} className="w-100" />
            </div>

            <div className="course__details">
                <h6 className="course__title mb-2">{title}</h6>

                <div className="d-flex justify-content-between align-items-center">
                    <p className="category">Category: {getCategoryName(category)}</p>
                    <p className="students"><i className="ri-user-line"></i> {students}K</p>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <p className="description">{description}</p>
                    <p className="rating"><i className="ri-star-fill"></i> {calculateAverageRating().toFixed(2)}</p>
                </div>

                <div className="d-flex justify-content-center align-items-center">
                    <p className="enroll">
                        <Link to={`/enroll/${_id}`}>Enroll Now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Card;
