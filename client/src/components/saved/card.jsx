import React from "react";
import './Card.css';
import { Link } from "react-router-dom";
const Card = ({ savedCourse }) => {
    
    if (!savedCourse || !savedCourse.courseId || !savedCourse.courseId.title) {
       return ;
    }

    const { _id,title, description, imageUrl } = savedCourse.courseId;

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

                

                <div className="d-flex justify-content-center align-items-center">                 

                    <p className="enroll d-flex align-items-center gap-1">
                    <Link to={`/enroll/${_id}`}>Enroll Now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Card;
