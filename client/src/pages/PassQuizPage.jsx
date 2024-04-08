import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PassQuizPage = () => {
  const [quizData, setQuizData] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/quiz/'); // Adjust the URL accordingly
      if (response.status === 200) {
        setQuizData(response.data);
      } else {
        console.error('Failed to fetch quiz data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, selectedAnswer) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: selectedAnswer });
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();

    let correctAnswers = 0;
    const totalQuestions = quizData.length;

    quizData.forEach(question => {
      const selectedAnswer = quizAnswers[question._id];
      if (selectedAnswer === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const incorrectAnswers = totalQuestions - correctAnswers;
    const message = `You got ${correctAnswers} correct answer(s) and ${incorrectAnswers} incorrect answer(s).`;

    alert(message);
  };

  if (loading) {
    return <p>Loading quiz...</p>;
  }

  return (
    <div>
      <h1>Pass Quiz</h1>
      <form onSubmit={handleQuizSubmit}>
        {quizData.map(question => (
          <div key={question._id}>
            <h3>{question.question}</h3>
            <ul>
              {question.choices.map((choice, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="radio"
                      name={question._id}
                      value={choice}
                      onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                    />
                    {choice}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PassQuizPage;
