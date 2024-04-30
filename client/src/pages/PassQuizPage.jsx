import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PassQuizPage = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        fetchQuiz();
    }, []);

    const fetchQuiz = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/quiz/${quizId}`);
            setQuiz(response.data);
            // Initialize answers array with empty strings
            setAnswers(Array(response.data.questions.length).fill(''));
        } catch (error) {
            console.error('Error fetching quiz:', error);
        }
    };

    const handleAnswerChange = (e, index) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = e.target.value;
        setAnswers(updatedAnswers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/quiz/pass/${quizId}`, { answers });
            const { correct, incorrect } = response.data;
            setCorrectCount(correct);
            setIncorrectCount(incorrect);
            setSubmitted(true);
        } catch (error) {
            console.error('Error passing quiz:', error);
        }
    };

    return (
        <div>
            {quiz && (
                <div>
                    <h1>Pass Quiz: {quiz.title}</h1>
                    <form onSubmit={handleSubmit}>
                        {quiz.questions.map((question, index) => (
                            <div key={index}>
                                <p>{question.question}</p>
                                {question.choices.map((choice, choiceIndex) => (
                                    <div key={choiceIndex}>
                                        <input
                                            type="radio"
                                            id={`choice${index}${choiceIndex}`}
                                            name={`question${index}`}
                                            value={choice}
                                            checked={answers[index] === choice}
                                            onChange={(e) => handleAnswerChange(e, index)}
                                        />
                                        <label htmlFor={`choice${index}${choiceIndex}`}>{choice}</label>
                                    </div>
                                ))}
                            </div>
                        ))}
                        <button type="submit">Submit Answers</button>
                    </form>
                    {submitted && (
                        <div>
                            <h2>Quiz Results</h2>
                            <p>Correct Answers: {correctCount}</p>
                            <p>Incorrect Answers: {incorrectCount}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PassQuizPage;
