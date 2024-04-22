import React from 'react';
import { useParams } from 'react-router-dom';
import CourseEdit from '../components/editCourse/edit';
import Footer from "../components/Footer/Footer";
const EditCoursePage = () => {
  const { id } = useParams();

  return (
    <div>
      <CourseEdit courseId={id} />
      <Footer />
    </div>
  );
};

export default EditCoursePage;
