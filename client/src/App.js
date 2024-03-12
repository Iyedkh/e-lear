// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import CreateCoursePage from './pages/CreateCoursePage';
import EditCoursePage from './pages/EditCoursePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course/:id" element={<CourseDetailsPage />} />
        <Route path="/create-course" element={<CreateCoursePage />} />
        <Route path="/edit-course/:id" element={<EditCoursePage />} />
      </Routes>
    </Router>
  );
}

export default App;
