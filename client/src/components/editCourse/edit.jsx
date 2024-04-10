import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditCourse = ({ courseId }) => {
  const [course, setCourse] = useState({
    title: '',
    rating: 0,
    description: ''
  });

  useEffect(() => {
    fetchCourse(courseId);
  }, [courseId]);

  const fetchCourse = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/courses/${id}`);
      if (response.status === 200) {
        setCourse(response.data);
      } else {
        console.error('Failed to fetch course:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/courses/${courseId}`, course);
      if (response.status === 200) {
        console.log('Course updated successfully');
        // Redirect to another page or display a success message
      } else {
        console.error('Failed to update course:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  return (
    <div>
      <h2>Edit Course</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={course.title} onChange={handleInputChange} />
        </div>
        <div>
          <label>Rating:</label>
          <input type="number" name="rating" value={course.rating} onChange={handleInputChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={course.description} onChange={handleInputChange}></textarea>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditCourse;
