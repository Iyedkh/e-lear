import React from "react";
import './Card.css';

const Card = ({ savedCourse }) => {
    // Check if savedCourse and courseId exist and are populated
    if (!savedCourse || !savedCourse.courseId || !savedCourse.courseId.title) {
        return <div>Error: Course data is incomplete</div>;
    }

    const { title, description, category, rating, videoUrl, imageUrl } = savedCourse.courseId;

    return (
        <div className="course-card">
            <div className="course__img">
                <img src={`http://localhost:3000${imageUrl}`} alt={title} className="w-100" />
            </div>

            <div className="course__details">
                <h6 className="course__title mb-2">{title}</h6>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="lesson d-flex align-items-center gap-1">
                        <i className="ri-book-open-line"></i> Description:  
                        {description ? description : "No description available"}    
                    </p>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <p className="category d-flex align-items-center gap-1">
                        Category: {category ? category : "Unknown"}
                    </p>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <p className="rating d-flex align-items-center gap-1">
                        <i className="ri-star-fill"></i> Rating: {rating ? rating.join(', ') : "No rating"}
                    </p>

                    <p className="enroll d-flex align-items-center gap-1">
                        <a href={videoUrl}>Enroll Now</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Card;
