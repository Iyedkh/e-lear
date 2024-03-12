import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourseById } from '../service/courseService';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await fetchCourseById(id);
        setCourse(data);
      } catch (error) {
        console.error('Error fetching course:', error.message);
      }
    };

    fetchCourse();
  }, [id]);

  return (
    <div>
      <h2>Course Details</h2>
      {course && (
        <div>
          <h3>{course.title}</h3>
          <p>Rating: {course.rating}</p>
          <p>Category: {course.category}</p>
          <p>Comments: {course.comments.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
