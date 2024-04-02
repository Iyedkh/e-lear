import React from 'react';
import { useParams } from 'react-router-dom';
import CourseForm from '../components/courseForum/CourseForm';

const EditCoursePage = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Edit Course</h2>
      <CourseForm courseId={id} />
    </div>
  );
};

export default EditCoursePage;
