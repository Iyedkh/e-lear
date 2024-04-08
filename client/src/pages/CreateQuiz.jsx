import React, { useState } from 'react';
import CreateQuizForm from '../components/Quiz/CreateQuizForm';

const CreateQuizPage = () => {
  const [quizData, setQuizData] = useState({
    question: '',
    choices: ['', '', '', ''], // Initial choices array with empty strings
    correctAnswer: '',
  });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send quizData to the backend to create the quiz
    console.log('Submitted quiz:', quizData);
    // Redirect to another page after submitting (optional)
    redirectToQuizList(); // Call the callback function to redirect
  };

  // Callback function to redirect to another page
  const redirectToQuizList = () => {
    // Redirect logic here
    console.log('Redirecting to quiz list page...');
  };

  return (
    <div>
      <h1>Create Quiz</h1>
      <CreateQuizForm
        quizData={quizData}
        onChange={(e) => setQuizData({ ...quizData, [e.target.name]: e.target.value })}
        onChoiceChange={(index, value) => {
          const newChoices = [...quizData.choices];
          newChoices[index] = value;
          setQuizData({ ...quizData, choices: newChoices });
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateQuizPage;
