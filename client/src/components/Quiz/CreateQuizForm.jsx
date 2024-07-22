import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './createQuiz.css';

const CreateQuizForm = () => {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([{ question: '', choices: ['', ''], correctAnswer: '' }]);
    const [newChoice, setNewChoice] = useState('');
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:3000/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: '', choices: ['', ''], correctAnswer: '' }]);
    };

    const handleRemoveQuestion = (index) => {
        setQuestions(questions.filter((question, i) => i !== index));
    };

    const handleAddChoice = (questionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].choices.push(newChoice.trim());
        setQuestions(updatedQuestions);
        setNewChoice('');
    };

    const handleRemoveChoice = (questionIndex, choiceIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].choices = updatedQuestions[questionIndex].choices.filter((choice, i) => i !== choiceIndex);
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const quizData = { title, questions, courseId: selectedCourse }; // Include courseId in quiz data
            const response = await axios.post('http://localhost:3000/quiz/create', quizData);
            window.alert('Quiz created successfully:', response.data);
            
            // Clear form fields after successful creation
            setTitle('');
            setQuestions([{ question: '', choices: ['', ''], correctAnswer: '' }]);
            setSelectedCourse('');
         
        } catch (error) {
            console.error('Error creating quiz:', error);
        }
    };

    return (
        <div>
            <h2>Create Quiz</h2>
            <form onSubmit={handleSubmit}>
                <label>Course:</label>
                <select 
                    value={selectedCourse} 
                    onChange={(e) => setSelectedCourse(e.target.value)} 
                    required
                >
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                        <option key={course._id} value={course._id}>
                            {course.title}
                        </option>
                    ))}
                </select>

                <label>Title:</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />

                {questions.map((question, questionIndex) => (
                    <div key={questionIndex}>
                        <label>Question:</label>
                        <input 
                            type="text" 
                            value={question.question} 
                            onChange={(e) => {
                                const updatedQuestions = [...questions];
                                updatedQuestions[questionIndex].question = e.target.value;
                                setQuestions(updatedQuestions);
                            }} 
                            required 
                        />
                        <label>Choices:</label>
                        <ul>
                            {question.choices.map((choice, choiceIndex) => (
                                <li key={choiceIndex}>
                                    <input 
                                        type="text" 
                                        value={choice} 
                                        onChange={(e) => {
                                            const updatedQuestions = [...questions];
                                            updatedQuestions[questionIndex].choices[choiceIndex] = e.target.value;
                                            setQuestions(updatedQuestions);
                                        }} 
                                    />
                                    <button type="button" onClick={() => handleRemoveChoice(questionIndex, choiceIndex)}>Remove Choice</button>
                                </li>
                            ))}
                        </ul>
                        <button type="button" onClick={() => handleAddChoice(questionIndex)}>Add Choice</button>
                        <div>
                            <label>Correct Answer:</label>
                            <select 
                                value={question.correctAnswer} 
                                onChange={(e) => {
                                    const updatedQuestions = [...questions];
                                    updatedQuestions[questionIndex].correctAnswer = e.target.value;
                                    setQuestions(updatedQuestions);
                                }} 
                                required
                            >
                                <option value="">Select Correct Answer</option>
                                {question.choices.map((choice, index) => (
                                    <option key={index} value={choice}>{choice}</option>
                                ))}
                            </select>
                        </div>
                        <button type="button" onClick={() => handleRemoveQuestion(questionIndex)}>Remove Question</button>
                    </div>
                ))}
            </form>
            <div className="but">
                <button type="button" onClick={handleAddQuestion}>Add Question</button>
                <button type="submit" onClick={handleSubmit}>Create Quiz</button>
            </div>
        </div>
    );
};

export default CreateQuizForm;
