import React from 'react';

const CourseItem = ({ course }) => {
    return (
        <div>
            <h3>{course.title}</h3>
            <p>Rating: {course.rating}</p>
            <p>Category: {course.category}</p>
            {/* Add more details as needed */}
        </div>
    );
};

export default CourseItem;
