import React from 'react';
import CourseList from '../components/CourseList';

const CoursePage = ({ courses }) => {
    return (
        <div>
            <h1>Available Courses</h1>
            <CourseList courses={courses} />
        </div>
    );
};

export default CoursePage;
