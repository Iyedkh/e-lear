import React from 'react';
import { FaTrash } from 'react-icons/fa';
import './CategoryCard.css';

const CategoryCard = ({ category, onDelete }) => {
    return (
        <div className="category-card">
            <div className="category-card__img">
                <FaTrash className="category-card__delete-icon" onClick={() => onDelete(category._id)} />
                <img src={`http://localhost:3000${category.image}`} alt="Category" />
            </div>
            <div className="category-card__info">
                <h3>{category.name}</h3>
                <p> Description :{category.description}</p>
            </div>
        </div>
    );
};

export default CategoryCard;
