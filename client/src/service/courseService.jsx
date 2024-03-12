// courseService.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;


export const fetchAllCourses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/courses`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching courses');
  }
};

export const fetchCourseById = async (courseId) => {
  try {
    const response = await axios.get(`${BASE_URL}/courses/${courseId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching course by ID');
  }
};

export const fetchTopRatedCourses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/courses/top-rated`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching top rated courses');
  }
};

export const addCourse = async (courseData) => {
  try {
    const response = await axios.post(`${BASE_URL}/courses`, courseData);
    return response.data;
  } catch (error) {
    throw new Error('Error adding course');
  }
};

export const updateCourse = async (courseId, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/courses/${courseId}`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error('Error updating course');
  }
};

export const deleteCourse = async (courseId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/courses/${courseId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error deleting course');
  }
};

// Define and export getCourseById function
export const getCourseById = fetchCourseById;
export const getAllCourses = fetchAllCourses;