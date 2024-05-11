import React from 'react';
import { FaTrash } from 'react-icons/fa';
import './CategoryCard.css';

const CategoryCard = ({ category, onDelete }) => {
    const handleDelete = () => {
        onDelete(category._id); // Call onDelete function with category ID
    };

    return (
        <div className="category-card">
            <div className="category-card__img">
                <FaTrash className="category-card__delete-icon" onClick={handleDelete} />
                <img src={`http://localhost:3000${category.image}`} alt="Category" />
            </div>
            <div className="category-card__info">
                <h3>{category.name}</h3>
                <p>Description: {category.description}</p>
            </div>
        </div>
    );
};

export default CategoryCard;
