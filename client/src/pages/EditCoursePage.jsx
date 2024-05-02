import React from 'react';
import { useParams } from 'react-router-dom';
import CourseEdit from '../components/editCourse/edit';
import Nav from "../components/Header/Header";
const EditCoursePage = () => {
  const { id } = useParams();

  return (
    <div>
      <Nav/>
      <CourseEdit courseId={id} />
    </div>
  );
};

export default EditCoursePage;
