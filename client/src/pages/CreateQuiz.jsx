import React, { useState } from 'react';
import CreateQuizForm from '../components/Quiz/CreateQuizForm';

const CreateQuizPage = () => {
  const [quizData, setQuizData] = useState({
    question: '',
    choices: ['', '', '', ''],
    correctAnswer: '',
  });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted quiz:', quizData);
    redirectToQuizList(); 
  };

  // Callback function to redirect to another page
  const redirectToQuizList = () => {
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
