import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './edit.css';
const EditCourse = () => {
  const { id } = useParams(); // This retrieves the course ID from the URL
  const [course, setCourse] = useState({
    title: '',
    category: '',
    description: ''
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
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

    fetchCourse();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/categories');
        if (response.status === 200) {
          setCategories(response.data);
        } else {
          console.error('Failed to fetch categories:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/courses/${id}`, course);
      if (response.status === 200) {
        window.alert('Course updated successfully');
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
      <h2 className='Edit'>Edit Course</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={course.title} onChange={handleInputChange} />
        </div>
        <div>
          <label>Category:</label>
          <select name="category" value={course.category} onChange={handleInputChange}>
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
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
