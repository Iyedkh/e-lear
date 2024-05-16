import React from 'react';
import './CategoryCard.css';

const CategoryCard = ({ category}) => {
   

    return (
        <div className="category-card">
            <div className="category-card__img">
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
