import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './list.css';
import { Link } from 'react-router-dom';

const QuizListPage = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/quiz'); 
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      // Handle error
    }
  };

  return (
    <div className="quiz-list-container">
      <h1>Quiz List</h1>
      <table className="quiz-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map(quiz => (
            <tr key={quiz._id}>
              <td>{quiz.question}</td>
              <td>
              <Link to="/quiz/pass" className="pass-btn">Pass</Link>
             <Link to="/quiz/create" className="create-btn">Create Quiz</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
};

export default QuizListPage;
