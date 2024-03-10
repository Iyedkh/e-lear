import React from 'react';
import CourseItem from './CourseItem';

const CourseList = ({ courses }) => {
    return (
        <div>
            <h2>Available Courses</h2>
            {courses.map(course => (
                <CourseItem key={course.id} course={course} />
            ))}
        </div>
    );
};

export default CourseList;
