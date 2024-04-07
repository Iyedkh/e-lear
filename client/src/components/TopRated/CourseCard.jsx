import React from "react";
import './CourseCard.css';
const CourseCard = ({ course }) => { // Change 'item' to 'course'
    const { title, lesson, students, rating, description, category, videoUrl, imageUrl } = course;

    return (
        <div className="course-card" >
            <div className="course__img">
                <img src={`http://localhost:3000${imageUrl}`} alt={title} className="w-100" />
            </div>

            <div className="course__details">
                <h6 className="course__title mb-2">{title}</h6>

                <div className=" d-flex justify-content-between align-items-center">
                    <p className="category d-flex align-items-center gap-1">
                         {category}
                    </p>
                </div>

                <div className=" d-flex justify-content-between align-items-center">
                    <p className="lesson d-flex align-items-center gap-1">
                        <i className="ri-book-open-line"></i> {lesson} Lessons
                    </p>

                    <p className="students d-flex align-items-center gap-1">
                        <i className="ri-user-line"></i> {students}K
                    </p>
                </div>

                <div className=" d-flex justify-content-between align-items-center">
                    <p className="rating d-flex align-items-center gap-1">
                        <i className="ri-star-fill"></i> {rating.join(', ')}
                    </p>

                    <p className="enroll d-flex align-items-center gap-1">
                        <a href="{videoUrl}"> Enroll Now</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
