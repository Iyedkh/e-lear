import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import CreateCoursePage from './pages/CreateCoursePage';
import EditCoursePage from './pages/EditCoursePage';
import SearchedCoursesPage from './pages/SearchedCoursesPage'; 
import QuizPage from './pages/PassQuizPage';
import QuizCreate from './pages/CreateQuiz';
import CourseListPage from './components/CourseList';
import Dash from './pages/DashPage';
import UserCourse from './pages/UserCourse';
import Save from './pages/SavedPage';
import Quiz from './pages/QuizListPage';
import Enroll from './pages/Enroll';
import About from './pages/AboutPage';
import CreateCategory from './pages/CreateCategory';
import Category from './pages/CategoryPage';
import CoursesByCategoryPage from './pages/CoursesByCategoryPage';
import EditQuizPage from './pages/EditQuizPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<ProtectedRoute element={HomePage} />} /> 
        <Route path="/course" element={<AdminRoute element={CourseListPage} />} />
        <Route path="/course/:id" element={<ProtectedRoute element={CourseDetailsPage} />} />
        <Route path="/create-course" element={<AdminRoute element={CreateCoursePage} />} />
        <Route path="/edit-course/:id" element={<AdminRoute element={EditCoursePage} />} />
        <Route path="/search/:query" element={<ProtectedRoute element={SearchedCoursesPage} />} />
        <Route path="/quiz/create" element={<AdminRoute element={QuizCreate} />} />
        <Route path="/quiz/pass/:quizId" element={<ProtectedRoute element={QuizPage} />} />
        <Route path="/edit/:quizId" element={<AdminRoute element={EditQuizPage} />} />
        <Route path="/dash" element={<AdminRoute element={Dash} />} />
        <Route path="/userC" element={<ProtectedRoute element={UserCourse} />} />
        <Route path="/saved" element={<ProtectedRoute element={Save} />} />
        <Route path="/quiz" element={<ProtectedRoute element={Quiz} />} />
        <Route path="/enroll/:courseId" element={<ProtectedRoute element={Enroll} />} />
        <Route path="/About" element={<ProtectedRoute element={About} />} />
        <Route path="/create-category" element={<AdminRoute element={CreateCategory} />} />
        <Route path="/category" element={<ProtectedRoute element={Category} />} />
        <Route path="/courses/:categoryId" element={<ProtectedRoute element={CoursesByCategoryPage} />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
