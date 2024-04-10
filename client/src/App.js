import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import CreateCoursePage from './pages/CreateCoursePage';
import EditCoursePage from './pages/EditCoursePage';
import SearchedCoursesPage from './pages/SearchedCoursesPage'; 
import QuizPage from './pages/PassQuizPage';
import QuizCreate from './pages/CreateQuiz';
import './index.css'
import CourseListPage from './components/CourseList';
import Dash from './pages/DashPage';
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
        <Route path="/quiz/create" element={<QuizCreate />} />
        <Route path="/quiz/pass" element={<QuizPage />} />
        <Route path="/dash" element={<Dash />} />
      </Routes>
    </Router>
  );
}

export default App;
