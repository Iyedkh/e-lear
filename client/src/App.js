import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import CreateCoursePage from './pages/CreateCoursePage';
import EditCoursePage from './pages/EditCoursePage';
import SearchedCoursesPage from './pages/SearchedCoursesPage'; 
import QuizPage from './pages/quizPage';
import './index.css'
import CourseListPage from './components/CourseList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Render the HeroSection component */}
        <Route path="/course" element={<CourseListPage />} />
        <Route path="/course/:id" element={<CourseDetailsPage />} />
        <Route path="/create-course" element={<CreateCoursePage />} />
        <Route path="/edit-course/:id" element={<EditCoursePage />} />
        <Route path="/search/:query" element={<SearchedCoursesPage />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;
