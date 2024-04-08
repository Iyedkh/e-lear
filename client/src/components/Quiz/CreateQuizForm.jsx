// components/CreateQuizForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './createQuiz.css';
const CreateQuizForm = () => {
    const [question, setQuestion] = useState('');
    const [choices, setChoices] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');

    const handleAddChoice = () => {
        setChoices([...choices, '']);
    };

    const handleChoiceChange = (index, value) => {
        const newChoices = [...choices];
        newChoices[index] = value;
        setChoices(newChoices);
    };

    const handleRemoveChoice = (index) => {
        const newChoices = [...choices];
        newChoices.splice(index, 1);
        setChoices(newChoices);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/quiz/create', {
                question,
                choices,
                correctAnswer
            });
            console.log('Quiz created:', response.data);
            // Clear form fields
            setQuestion('');
            setChoices([]);
            setCorrectAnswer('');
        } catch (error) {
            console.error('Error creating quiz:', error);
        }
    };

    return (
        <div>
            <h2>Create Quiz</h2>
            <form onSubmit={handleSubmit}>
                <label>Question:</label>
                <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} required />
                {choices.map((choice, index) => (
                    <div key={index}>
                        <label>Choice {index + 1}:</label>
                        <input type="text" value={choice} onChange={(e) => handleChoiceChange(index, e.target.value)} required />
                        <button type="button" onClick={() => handleRemoveChoice(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddChoice}>Add Choice</button>
                <label>Correct Answer:</label>
                <input type="text" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateQuizForm;
