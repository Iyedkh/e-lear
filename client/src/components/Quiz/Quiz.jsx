import React, { useState, useEffect } from 'react';
import './quiz.css';
function Quiz() {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // Fetch quiz data from the server
    fetch('http://localhost:3000/quiz/')
      .then(response => response.json())
      .then(data => {
        setQuizData(data);
      })
      .catch(error => console.error('Error fetching quiz data:', error));
  }, []);

  const handleAnswerSubmit = () => {
    const correctAnswer = quizData[currentQuestionIndex].correctAnswer;
    if (selectedAnswer === correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
    }
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
    } else {
      setShowResult(true);
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="quiz-container">
        <div id="result-message">
          <p>You got {correctAnswers} out of {quizData.length} answers correct!</p>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div id="question">{quizData[currentQuestionIndex]?.question}</div>
      <div id="choices">
        {quizData[currentQuestionIndex]?.choices.map((choice, index) => (
          <button key={index} onClick={() => handleAnswerSelect(choice)}>{choice}</button>
        ))}
      </div>
      <button id="submit-btn" onClick={handleAnswerSubmit}>Submit Answer</button>
    </div>
  );
}

export default Quiz;
