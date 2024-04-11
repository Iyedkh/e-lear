import React from "react";
import './CourseCard.css';
import axios from 'axios';
import { BsSave2Fill } from 'react-icons/bs';

const CourseCard = ({ course }) => { // Change 'item' to 'course'
    const { _id, title, lesson, students, rating, description, category, videoUrl, imageUrl } = course;
    const saveCourse = async () => {
        try {
          const response = await axios.post('http://localhost:3000/savecourse', { courseId: _id });
          console.log(response.data);
          // You can add logic here to show a success message or update UI if needed
        } catch (error) {
          console.error('Error saving course:', error);
          // You can add logic here to show an error message or handle the error in UI
        }
      };
    return (
        <div className="course-card" >
            <div className="course__img">
            <BsSave2Fill className="icon" onClick={saveCourse} />  
                <img src={`http://localhost:3000${imageUrl}`} alt={title} className="w-100" />
            </div>

            <div className="course__details">
                <h6 className="course__title mb-2">{title}</h6>

                <div className=" d-flex justify-content-between align-items-center">
                    <p className="category d-flex align-items-center gap-1">
                        category: {category}
                    </p>
                </div>

                <div className=" d-flex justify-content-between align-items-center">
                    <p className="lesson d-flex align-items-center gap-1">
                        <i className="ri-book-open-line"></i> Description:  
                        {description}    
                    </p>

                    <p className="students d-flex align-items-center gap-1">
                        <i className="ri-user-line"></i> {students}K
                    </p>
                </div>

                <div className=" d-flex justify-content-between align-items-center">
                    <p className="rating d-flex align-items-center gap-1">
                        <i className="ri-star-fill"></i> Rating: {rating.join(', ')}
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
