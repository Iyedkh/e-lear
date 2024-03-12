import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../service/courseService';
import '../styles/CourseDetailsPage.css';
const CourseDetailsPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseData = await getCourseById(id);
        setCourse(courseData);
      } catch (error) {
        console.error('Error fetching course details:', error.message);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Course Details</h2>
      <p>Title: {course.title}</p>
      <p>Rating: {course.rating}</p>
      <p>Category: {course.category}</p>
      <p>Comments: {course.comments.join(', ')}</p>
    </div>
  );
};

export default CourseDetailsPage;
