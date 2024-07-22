import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import './list.css';

const QuizListPage = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [deleteQuizId, setDeleteQuizId] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
            const response = await axios.put(`http://localhost:3000/quiz/${quizId}`, {});
            console.log('Quiz updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating quiz:', error);
        }
    };

    const handleDelete = (quizId) => {
        setDeleteQuizId(quizId);
        setIsDialogOpen(true);
    };

    const confirmDeleteQuiz = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/quiz/${deleteQuizId}`);
            window.alert('Quiz deleted successfully:', response.data);
            setQuizzes(quizzes.filter(quiz => quiz._id !== deleteQuizId));
        } catch (error) {
            console.error('Error deleting quiz:', error);
        } finally {
            setIsDialogOpen(false);
        }
    };

    return (
        <div className="quiz-list-container">
            <a href="/quiz/create" className="create-btn">Create Quiz</a>
            <h1>Quiz List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {quizzes.map(quiz => (
                        <tr key={quiz._id}>
                            <td>{quiz.title}</td>
                            <td>{quiz.course ? quiz.course.title : 'No Course'}</td>
                            <td className='action-buttons'>
                                <a href={`/quiz/pass/${quiz._id}`} className='pass'>Pass</a>
                                <a href={`/edit/${quiz._id}`} className='update' onClick={() => handleUpdateQuiz(quiz._id)}>Edit</a>
                                <a href='#' className='delete' onClick={() => handleDelete(quiz._id)}>Delete</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this quiz?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDeleteQuiz} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default QuizListPage;
