import React from 'react';
import NavBar from '../components/Header/Header.jsx';
import Quizs from "../components/Quiz/QuizList.jsx";
const QuizList = () =>{
    return(
        <div>
            <NavBar/>
            <Quizs/>
           
        </div>
    );
};
export default QuizList;