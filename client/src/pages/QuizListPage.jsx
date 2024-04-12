import React from 'react';
import NavBar from '../components/Header/Header.jsx';
import Footer from "../components/Footer/Footer.jsx";
import Quizs from "../components/Quiz/QuizList.jsx";
const QuizList = () =>{
    return(
        <div>
            <NavBar/>
            <Quizs/>
            <Footer/>
        </div>
    );
};
export default QuizList;