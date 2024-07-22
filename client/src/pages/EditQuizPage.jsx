import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditQuizPage = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    const [courseId, setCourseId] = useState('');
    const [courses, setCourses] = useState([]); // State for storing available courses

    useEffect(() => {
        fetchQuiz();
        fetchCourses(); // Fetch available courses when component mounts
    }, []);

    const fetchQuiz = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/quiz/${quizId}`);
            const { title, questions, course } = response.data;
            setTitle(title);
            setQuestions(questions);
            setCourseId(course._id); // Assuming 'course' is populated with '_id'
        } catch (error) {
            console.error('Error fetching quiz:', error);
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:3000/courses');
            setCourses(response.data); // Assuming response.data is an array of courses
        } catch (error) {
            console.error('Error fetching courses:', error);
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

    const handleCorrectAnswerChange = (e, questionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].correctAnswer = e.target.value;
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
            const updatedQuiz = {
                title,
                questions,
                courseId // Include courseId in the updated quiz object
            };
            const response = await axios.put(`http://localhost:3000/quiz/${quizId}`, updatedQuiz);
            console.log('Quiz updated successfully:', response.data);
            window.alert('Quiz updated successfully');
        } catch (error) {
            console.error('Error updating quiz:', error);
            window.alert('Failed to update quiz');
        }
    };

    return (
        <div>
            <h1>Edit Quiz</h1>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" value={title} onChange={handleTitleChange} required />

                <label>Course:</label>
                <select value={courseId} onChange={(e) => setCourseId(e.target.value)} required>
                    <option value="">Select a course</option>
                    {courses.map(course => (
                        <option key={course._id} value={course._id}>
                            {course.title}
                        </option>
                    ))}
                </select>

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
                        <label>Correct Answer:</label>
                        <select
                            value={question.correctAnswer}
                            onChange={(e) => handleCorrectAnswerChange(e, index)}
                            required
                        >
                            <option value="">Select Correct Answer</option>
                            {question.choices.map((choice, choiceIndex) => (
                                <option key={choiceIndex} value={choice}>
                                    {choice}
                                </option>
                            ))}
                        </select>
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
