import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './list.css';

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
        }
    };

    const handleUpdateQuiz = async (quizId) => {
        try {
            // Make an HTTP PUT request to update the quiz by its ID
            const response = await axios.put(`http://localhost:3000/quiz/${quizId}`, {
                // Provide updated quiz data
            });
            console.log('Quiz updated successfully:', response.data);
            // Handle success response
        } catch (error) {
            console.error('Error updating quiz:', error);
            // Handle error
        }
    };

    const handleDeleteQuiz = async (quizId) => {
        try {
            // Make an HTTP DELETE request to delete the quiz by its ID
            const response = await axios.delete(`http://localhost:3000/quiz/${quizId}`);
            console.log('Quiz deleted successfully:', response.data);
            // Handle success response
        } catch (error) {
            console.error('Error deleting quiz:', error);
            // Handle error
        }
        window.location.reload();
    };

    return (
        <div className="quiz-list-container">
            <a href="/quiz/create" className="create-btn">Create Quiz</a>
            <h1>Quiz List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {quizzes.map(quiz => (
                        <tr key={quiz._id}>
                            <td>{quiz.title}</td>
                            <td>
                                <a href={`/quiz/pass/${quiz._id}`} className='pass'>Pass</a>
                                <a href={`/edit/${quiz._id}`} className='update' onClick={() => handleUpdateQuiz(quiz._id)}>Edit</a>
                                <a href="#" className='delete' onClick={() => handleDeleteQuiz(quiz._id)}>Delete</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default QuizListPage;
