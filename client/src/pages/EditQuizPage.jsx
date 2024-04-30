import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditQuizPage = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetchQuiz();
    }, []);

    const fetchQuiz = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/quiz/${quizId}`);
            setQuiz(response.data);
            setTitle(response.data.title);
            setQuestions(response.data.questions);
        } catch (error) {
            console.error('Error fetching quiz:', error);
        }
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleQuestionChange = (e, index) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = { ...updatedQuestions[index], question: e.target.value };
        setQuestions(updatedQuestions);
    };

    const handleChoiceChange = (e, questionIndex, choiceIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].choices[choiceIndex] = e.target.value;
        setQuestions(updatedQuestions);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: '', choices: ['', ''], correctAnswer: '' }]);
    };

    const handleRemoveQuestion = (index) => {
        const updatedQuestions = questions.filter((question, i) => i !== index);
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/quiz/${quizId}`, { title, questions });
            window.alert('Quiz updated successfully'); // Alert for successful update
            // Optionally, you can redirect the user or display a success message
        } catch (error) {
            console.error('Error updating quiz:', error);
            window.alert('Failed to update quiz'); // Alert for failed update
            // Handle error
        }
    };

    return (
        <div>
            <h1>Edit Quiz</h1>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" value={title} onChange={handleTitleChange} required />
                {questions.map((question, index) => (
                    <div key={index}>
                        <label>Question:</label>
                        <input
                            type="text"
                            value={question.question}
                            onChange={(e) => handleQuestionChange(e, index)}
                            required
                        />
                        <label>Choices:</label>
                        <ul>
                            {question.choices.map((choice, choiceIndex) => (
                                <li key={choiceIndex}>
                                    <input
                                        type="text"
                                        value={choice}
                                        onChange={(e) => handleChoiceChange(e, index, choiceIndex)}
                                        required
                                    />
                                </li>
                            ))}
                        </ul>
                        <button type="button" onClick={() => handleRemoveQuestion(index)}>Remove Question</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddQuestion}>Add Question</button>
                <button type="submit">Update Quiz</button>
            </form>
        </div>
    );
};

export default EditQuizPage;
